const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// ChatGPT API endpoint
app.post('/api/chatgpt', async (req, res) => {
    try {
        const { messages } = req.body;
        
        // Validate request
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }
        
        // Check if API key is configured
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ 
                error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.' 
            });
        }
        
        // Make request to OpenAI API
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 500,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        // Return the response from OpenAI
        res.json(response.data);
        
    } catch (error) {
        console.error('ChatGPT API Error:', error.response?.data || error.message);
        
        if (error.response?.status === 401) {
            res.status(401).json({ error: 'Invalid API key. Please check your OpenAI API key.' });
        } else if (error.response?.status === 429) {
            res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
        } else if (error.response?.status === 500) {
            res.status(500).json({ error: 'OpenAI service error. Please try again later.' });
        } else {
            res.status(500).json({ error: 'Failed to get response from ChatGPT API.' });
        }
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Portfolio website available at http://localhost:${PORT}`);
    console.log(`🤖 ChatGPT API endpoint: http://localhost:${PORT}/api/chatgpt`);
    
    if (!process.env.OPENAI_API_KEY) {
        console.warn('⚠️  Warning: OPENAI_API_KEY not set. ChatGPT API will not work.');
        console.log('💡 To enable ChatGPT API:');
        console.log('   1. Get your API key from https://platform.openai.com/api-keys');
        console.log('   2. Create a .env file with: OPENAI_API_KEY=your_api_key_here');
        console.log('   3. Restart the server');
    } else {
        console.log('✅ OpenAI API key configured successfully');
    }
});

// Error handling
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
