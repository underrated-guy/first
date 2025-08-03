# Study Buddy API

A Node.js Express API for the Study Buddy Chrome Extension that integrates with OpenAI to summarize highlighted text into bite-sized study notes.

## Features

- 🚀 Express.js REST API
- 🤖 OpenAI GPT-3.5-turbo integration for text summarization
- 🌐 CORS support for Chrome extension integration
- 🛡️ Security headers with Helmet
- ⚙️ Environment-based configuration
- 📝 Comprehensive error handling
- 🔍 Input validation and sanitization
- 📊 Multiple summary formats (bullet points, numbered lists, paragraphs)

## Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager
- OpenAI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd study-buddy-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000
   NODE_ENV=development
   ALLOWED_ORIGINS=http://localhost:3000,chrome-extension://your-extension-id
   ```

4. **Start the server**
   
   Development mode (with auto-restart):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## API Endpoints

### Health Check
- **GET** `/` - Basic API information
- **GET** `/health` - Health status with uptime

### Text Summarization
- **POST** `/api/summarize` - Summarize highlighted text

#### Request Format
```json
{
  "text": "Your highlighted text here...",
  "options": {
    "maxWords": 100,
    "format": "bullet-points"
  }
}
```

#### Request Parameters
- `text` (required): The text to summarize (max 10,000 characters)
- `options` (optional): Summarization options
  - `maxWords` (optional): Maximum words in summary (default: 100)
  - `format` (optional): Format type - "bullet-points", "numbered-list", or "paragraph" (default: "bullet-points")

#### Response Format
```json
{
  "success": true,
  "data": {
    "originalText": "First 200 characters of original text...",
    "summary": "• Key concept 1\n• Key concept 2\n• Important fact",
    "wordCount": 15,
    "format": "bullet-points",
    "timestamp": "2024-01-01T12:00:00.000Z"
  },
  "metadata": {
    "model": "gpt-3.5-turbo",
    "maxWords": 100,
    "originalLength": 1500
  }
}
```

#### Error Response Format
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Usage Examples

### cURL Examples

**Basic summarization:**
```bash
curl -X POST http://localhost:3000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text": "Photosynthesis is the process by which plants convert sunlight into energy..."}'
```

**With options:**
```bash
curl -X POST http://localhost:3000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your text here...",
    "options": {
      "maxWords": 50,
      "format": "numbered-list"
    }
  }'
```

### JavaScript (Chrome Extension)

```javascript
async function summarizeText(highlightedText) {
  try {
    const response = await fetch('http://localhost:3000/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: highlightedText,
        options: {
          maxWords: 75,
          format: 'bullet-points'
        }
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Summary:', result.data.summary);
      return result.data;
    } else {
      console.error('Error:', result.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | Yes | - | Your OpenAI API key |
| `PORT` | No | 3000 | Server port |
| `NODE_ENV` | No | development | Environment (development/production) |
| `ALLOWED_ORIGINS` | No | * (in dev) | Comma-separated list of allowed CORS origins |

## Security Features

- **Helmet**: Adds security headers
- **CORS**: Configurable cross-origin resource sharing
- **Input validation**: Text length and type validation
- **Rate limiting**: Handled by OpenAI API
- **Error sanitization**: Prevents sensitive data leakage

## Error Handling

The API provides comprehensive error handling for:

- Missing or invalid input data
- OpenAI API errors (authentication, rate limits, etc.)
- Network connectivity issues
- Server configuration problems
- Invalid JSON format

## Development

### Project Structure
```
study-buddy-api/
├── server.js           # Main application file
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure `ALLOWED_ORIGINS` with your Chrome extension ID
3. Ensure OpenAI API key is properly set
4. Use a process manager like PM2 for production

### Example PM2 Configuration
```bash
pm2 start server.js --name "study-buddy-api" --env production
```

## Troubleshooting

### Common Issues

1. **OpenAI API Key Missing**
   - Verify `.env` file exists and contains valid `OPENAI_API_KEY`
   - Check API key has sufficient credits

2. **CORS Errors**
   - Add your Chrome extension ID to `ALLOWED_ORIGINS`
   - Verify extension is making requests to correct URL

3. **Port Already in Use**
   - Change `PORT` in `.env` file
   - Check for other processes using the port

4. **Rate Limiting**
   - OpenAI API has rate limits based on your plan
   - Implement client-side throttling if needed

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions:
- Check the troubleshooting section
- Review OpenAI API documentation
- Create an issue in the repository