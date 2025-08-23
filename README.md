# Abhishek Kumar - Data Engineer Portfolio

A modern, responsive portfolio website showcasing Abhishek Kumar's skills, experience, and projects as a Data Engineer.
Try this site : https://avieric.github.io/My-DE-Portfolio/
## ✨ Features

- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **Interactive Elements** - Smooth animations and hover effects
- **AI Chat Bot** - Powered by ChatGPT API for intelligent conversations
- **Scroll to Top** - Smooth navigation back to the top
- **Contact Form** - Integrated with Google Apps Script
- **JDoodle AI Animations** - Floating cartoon characters throughout sections

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- OpenAI API key (for ChatGPT integration)

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up OpenAI API key**
   
   Create a `.env` file in the root directory:
   ```bash
   # .env file
   OPENAI_API_KEY=your_actual_openai_api_key_here
   PORT=3000
   ```
   
   **To get your OpenAI API key:**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign up or log in
   - Create a new API key
   - Copy the key and paste it in your `.env` file

4. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Your portfolio website is now running with ChatGPT AI integration!

## 🤖 ChatGPT AI Integration

The AI chat bot is now powered by ChatGPT API and includes:

- **Portfolio Context** - AI knows all about Abhishek's skills, experience, and background
- **Intelligent Responses** - Context-aware conversations about your expertise
- **Conversation History** - Maintains context across multiple messages
- **Fallback System** - Local responses if API is unavailable
- **Typing Indicators** - Professional chat experience

### How it works:
1. User types a message
2. Message is sent to your Node.js server
3. Server forwards request to OpenAI's ChatGPT API
4. AI responds with context from your portfolio data
5. Response is displayed in the chat interface

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # Frontend JavaScript functionality
├── server.js           # Node.js server with ChatGPT API
├── package.json        # Node.js dependencies
├── .env               # Environment variables (create this)
└── README.md          # This file
```

## 🔧 Configuration

### Environment Variables
- `OPENAI_API_KEY` - Your OpenAI API key (required for ChatGPT)
- `PORT` - Server port (default: 3000)

### Customization
- **Portfolio Data**: Update the `portfolioContext` in `script.js` to modify what the AI knows
- **AI Behavior**: Adjust `temperature` and `max_tokens` in `server.js` for different response styles
- **Styling**: Modify `styles.css` to change the appearance

## 🌐 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Hosting Options
- **Vercel** - Easy deployment with Node.js support
- **Heroku** - Free tier available
- **DigitalOcean** - VPS hosting
- **AWS/GCP** - Cloud hosting solutions

## 🛠️ Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**
   - Make sure you have a `.env` file with `OPENAI_API_KEY`
   - Restart the server after adding the key

2. **"Failed to get response from ChatGPT API"**
   - Check your internet connection
   - Verify your API key is valid
   - Check OpenAI service status

3. **Port already in use**
   - Change the PORT in `.env` file
   - Or kill the process using the current port

### API Limits
- OpenAI has rate limits and usage quotas
- Monitor your usage at [OpenAI Usage Dashboard](https://platform.openai.com/usage)
- Consider upgrading your plan for higher limits

## 📱 Features in Detail

### Dark Mode
- Automatic system preference detection
- Manual toggle button
- Smooth transitions between themes
- Persistent user preference

### AI Chat Bot
- Fixed position at bottom-left
- Expandable chat interface
- Professional typing indicators
- Context-aware responses
- Mobile responsive design

### Animations
- Floating emoji characters in each section
- Smooth scroll animations
- Hover effects on interactive elements
- Staggered loading animations

### Contact Form
- Google Apps Script integration
- Form validation
- Success/error notifications
- Static message responses

## 🔒 Security Notes

- **Never commit your `.env` file** to version control
- **Keep your API key private** and secure
- **Monitor API usage** to prevent unexpected charges
- **Use environment variables** for all sensitive data

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your API key is correct
3. Ensure all dependencies are installed
4. Check the troubleshooting section above

## 🎯 Future Enhancements

- [ ] Add more AI models (Claude, Gemini)
- [ ] Implement chat history persistence
- [ ] Add file upload capabilities
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

**Built with ❤️ by Abhishek Kumar**

*Data Engineer | AWS Certified | Cloud Migration Expert* 