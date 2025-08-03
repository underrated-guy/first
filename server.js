const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // In production, check allowed origins
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',')
      : [];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Error handling middleware for JSON parsing
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ 
      error: 'Invalid JSON format',
      message: 'Please check your request body format'
    });
  }
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Study Buddy API is running!',
    version: '1.0.0',
    endpoints: {
      health: 'GET /',
      summarize: 'POST /api/summarize'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Main summarization endpoint
app.post('/api/summarize', async (req, res) => {
  try {
    // Validate request body
    const { text, options = {} } = req.body;
    
    if (!text) {
      return res.status(400).json({
        error: 'Missing required field',
        message: 'Text field is required for summarization'
      });
    }

    if (typeof text !== 'string') {
      return res.status(400).json({
        error: 'Invalid data type',
        message: 'Text must be a string'
      });
    }

    if (text.trim().length === 0) {
      return res.status(400).json({
        error: 'Empty text',
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

    // Prepare OpenAI prompt
    const maxWords = options.maxWords || 100;
    const format = options.format || 'bullet-points';
    
    let prompt = `Please summarize the following text into bite-sized study notes. `;
    
    if (format === 'bullet-points') {
      prompt += `Format as clear bullet points, maximum ${maxWords} words total. Focus on key concepts, important facts, and main ideas that would be useful for studying:`;
    } else if (format === 'numbered-list') {
      prompt += `Format as a numbered list, maximum ${maxWords} words total. Focus on key concepts, important facts, and main ideas that would be useful for studying:`;
    } else {
      prompt += `Format as a concise paragraph, maximum ${maxWords} words total. Focus on key concepts, important facts, and main ideas that would be useful for studying:`;
    }

    prompt += `\n\nText to summarize:\n${text}`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful study assistant that creates concise, clear study notes from highlighted text. Focus on extracting the most important information for learning and retention."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: Math.min(Math.floor(maxWords * 1.5), 500),
      temperature: 0.3,
    });

    const summary = completion.choices[0]?.message?.content?.trim();

    if (!summary) {
      return res.status(500).json({
        error: 'Summarization failed',
        message: 'Failed to generate summary from OpenAI'
      });
    }

    // Return structured response
    res.json({
      success: true,
      data: {
        originalText: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
        summary: summary,
        wordCount: summary.split(/\s+/).length,
        format: format,
        timestamp: new Date().toISOString()
      },
      metadata: {
        model: "gpt-3.5-turbo",
        maxWords: maxWords,
        originalLength: text.length
      }
    });

  } catch (error) {
    console.error('Summarization error:', error);

    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(500).json({
        error: 'Authentication failed',
        message: 'Invalid OpenAI API key'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.'
      });
    }

    if (error.status === 400) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'The text provided may contain invalid content'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing your request'
    });
  }
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Study Buddy API running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Configured ✅' : 'Missing ❌'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 Summarize endpoint: POST http://localhost:${PORT}/api/summarize`);
});

module.exports = app;