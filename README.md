# Study Buddy API

A Node.js Express API for the Study Buddy Chrome Extension that summarizes highlighted text using OpenAI's GPT models.

## Features

- 📝 **Text Summarization**: Convert highlighted text into bite-sized study notes
- 🧠 **OpenAI Integration**: Uses GPT models for intelligent summarization
- 🔒 **CORS Support**: Configured for Chrome extensions and local development
- 🛡️ **Security**: Helmet middleware for security headers
- ⚡ **Error Handling**: Comprehensive error handling with specific OpenAI error codes
- 📊 **Usage Tracking**: Token usage monitoring
- 🔧 **Configurable**: Environment-based configuration

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Add your OpenAI API key to the `.env` file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on port 3000 (or the port specified in the `PORT` environment variable).

## API Endpoints

### Health Check
```
GET /api/health
```

Returns the API status and version information.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

### Summarize Text
```
POST /api/summarize
```

Accepts highlighted text and returns summarized bite-sized notes.

**Request Body:**
```json
{
  "text": "Your highlighted text here...",
  "options": {
    "model": "gpt-3.5-turbo",
    "maxTokens": 1000,
    "temperature": 0.3
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "Brief overview of the main topic",
    "keyPoints": [
      "Key point 1",
      "Key point 2",
      "Key point 3"
    ],
    "concepts": ["concept1", "concept2"],
    "wordCount": 150,
    "notesCount": 3,
    "originalLength": 1200,
    "processedAt": "2024-01-01T00:00:00.000Z",
    "model": "gpt-3.5-turbo"
  },
  "usage": {
    "promptTokens": 100,
    "completionTokens": 200,
    "totalTokens": 300
  }
}
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required |
| `PORT` | Server port | 3000 |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | `chrome-extension://*,http://localhost:*` |
| `NODE_ENV` | Environment mode | development |

### Request Options

| Option | Description | Default | Type |
|--------|-------------|---------|------|
| `model` | OpenAI model to use | gpt-3.5-turbo | string |
| `maxTokens` | Maximum tokens in response | 1000 | number |
| `temperature` | Creativity level (0-1) | 0.3 | number |

## Error Handling

The API includes comprehensive error handling for various scenarios:

- **400 Bad Request**: Invalid or missing text
- **401 Unauthorized**: Invalid OpenAI API key
- **429 Too Many Requests**: Rate limit or quota exceeded
- **500 Internal Server Error**: Server or processing errors

## Chrome Extension Integration

To use this API with your Chrome extension, make sure to:

1. Add the API URL to your extension's permissions in `manifest.json`:
   ```json
   {
     "permissions": ["http://localhost:3000/*"]
   }
   ```

2. Make POST requests to the `/api/summarize` endpoint:
   ```javascript
   const response = await fetch('http://localhost:3000/api/summarize', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       text: highlightedText
     })
   });
   
   const result = await response.json();
   ```

## Security Features

- **Helmet**: Security headers
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Text length and type validation
- **Rate Limiting**: Handled by OpenAI API limits
- **Error Sanitization**: No sensitive data in error responses

## License

MIT