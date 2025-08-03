const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['chrome-extension://*', 'http://localhost:*'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies with size limit
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Main summarization endpoint
app.post('/api/summarize', async (req, res) => {
  try {
    // Validate request body
    const { text, options = {} } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Text field is required and must be a string'
      });
    }

    if (text.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Text cannot be empty'
      });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        error: 'Text too long',
        message: 'Text must be less than 10,000 characters'
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'Configuration error',
        message: 'OpenAI API key not configured'
      });
    }

    // Prepare the prompt for OpenAI
    const systemPrompt = `You are a study assistant that creates concise, bite-sized notes from academic text. 
Your task is to:
1. Extract the key concepts and main ideas
2. Create bullet points that are easy to understand and remember
3. Include important details, definitions, and examples
4. Keep each point concise but informative
5. Organize the information logically

Format your response as a JSON object with the following structure:
{
  "summary": "A brief 1-2 sentence overview of the main topic",
  "keyPoints": ["Array of key bullet points"],
  "concepts": ["Array of important concepts/terms mentioned"],
  "wordCount": "Original text word count",
  "notesCount": "Number of key points generated"
}`;

    const userPrompt = `Please summarize the following text into bite-sized study notes:\n\n${text}`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: options.model || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.3,
    });

    const responseText = completion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    // Try to parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      parsedResponse = {
        summary: "Summary generated successfully",
        keyPoints: [responseText],
        concepts: [],
        wordCount: text.trim().split(/\s+/).length,
        notesCount: 1
      };
    }

    // Add metadata
    const response = {
      success: true,
      data: {
        ...parsedResponse,
        originalLength: text.length,
        processedAt: new Date().toISOString(),
        model: options.model || 'gpt-3.5-turbo'
      },
      usage: {
        promptTokens: completion.usage?.prompt_tokens || 0,
        completionTokens: completion.usage?.completion_tokens || 0,
        totalTokens: completion.usage?.total_tokens || 0
      }
    };

    res.json(response);

  } catch (error) {
    console.error('Error in summarization endpoint:', error);

    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        error: 'Quota exceeded',
        message: 'OpenAI API quota has been exceeded'
      });
    }

    if (error.code === 'invalid_api_key') {
      return res.status(401).json({
        error: 'Authentication error',
        message: 'Invalid OpenAI API key'
      });
    }

    if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process the summarization request',
      timestamp: new Date().toISOString()
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Study Buddy API server running on port ${PORT}`);
  console.log(`📝 Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`🧠 Summarization endpoint: http://localhost:${PORT}/api/summarize`);
});

module.exports = app;