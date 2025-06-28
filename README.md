# AI Chatbot App

A React Native chat application built with Expo that integrates with Ollama for local AI model interactions. This project demonstrates real-time chat functionality with AI models running locally or through remote endpoints.

## Features

- Real-time chat interface with AI models
- Support for local Ollama server integration
- Cross-platform compatibility (iOS, Android, Web)
- Clean and intuitive chat UI with message bubbles
- Custom hooks for chat state management
- Platform-specific URL handling for development

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (version 14 or higher)
- Expo CLI
- Ollama server (for local AI model hosting)
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ucp-workshop
```

2. Install dependencies:
```bash
npm install
```

3. Set up Ollama server:
   - Install Ollama on your local machine
   - Pull the required model (default: llama3.2):
   ```bash
   ollama pull llama3.2
   ```
   - Start the Ollama server:
   ```bash
   ollama serve
   ```

## Configuration

### Local Development

The application automatically detects the platform and configures the appropriate Ollama URL:

- **Android Emulator**: `http://10.0.2.2:11434`
- **iOS Simulator/Physical Device**: `http://localhost:11434`

### Remote Server

If you're using a remote Ollama server or ngrok tunnel, update the `ngrokURL` variable in `src/hooks/useChat.js`:

```javascript
const ngrokURL = 'your-remote-server-url';
```

## Running the Application

### Development Server

Start the Expo development server:

```bash
npm start
```

### Platform-Specific Commands

- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Web**: `npm run web`

## Project Structure

```
ucp-workshop/
├── App.js                          # Main application entry point
├── index.js                        # Root component registration
├── package.json                    # Project dependencies and scripts
├── app.json                        # Expo configuration
└── src/
    ├── hooks/
    │   ├── index.js                # Hook exports
    │   └── useChat.js              # Chat functionality hook
    ├── screens/
    │   ├── index.js                # Screen exports
    │   └── ChatScreen/
    │       ├── index.js            # ChatScreen exports
    │       └── chatScreen.js       # Main chat interface component
    └── utils/
        ├── index.js                # Utility exports
        └── utils.js                # Platform-specific utilities
```

## Key Components

### useChat Hook

The `useChat` hook manages the chat state and API communication:

- Handles message sending and receiving
- Manages loading states and error handling
- Integrates with Ollama API endpoints
- Supports different AI models

### ChatScreen Component

The main chat interface featuring:

- Message bubble display with role-based styling
- Text input with send functionality
- Loading indicators and error states
- Responsive design for different screen sizes

## API Integration

The application communicates with Ollama through REST API calls:

- **Endpoint**: `/api/chat`
- **Method**: POST
- **Payload**: Model name, messages array, and configuration options

## Customization

### Changing AI Models

Update the model parameter in the `useChat` hook:

```javascript
const { messages, send, loading, error } = useChat('your-model-name');
```

### Styling

Modify the styles in `chatScreen.js` to customize the appearance:

- Message bubble colors and layout
- Input field styling
- Overall theme and spacing

## Troubleshooting

### Common Issues

1. **Connection Refused Error**
   - Ensure Ollama server is running
   - Verify the correct URL configuration for your platform
   - Check firewall settings

2. **Model Not Found**
   - Confirm the AI model is pulled and available in Ollama
   - Use `ollama list` to see available models

3. **Android Emulator Connectivity**
   - Use `10.0.2.2` instead of `localhost` for Android emulator
   - Ensure the emulator can access the host machine's network

## Development

### Adding New Features

1. Create new components in the appropriate directories
2. Update export files (`index.js`) to include new modules
3. Follow the existing code structure and naming conventions

### Testing

Run the application on different platforms to ensure compatibility:

- Test on physical devices and emulators
- Verify API connectivity across platforms
- Check responsive design on various screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the existing code style
4. Test thoroughly on multiple platforms
5. Submit a pull request with a clear description

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review Ollama documentation for server-related issues
3. Consult Expo documentation for React Native specific problems
4. Open an issue in the project repository
