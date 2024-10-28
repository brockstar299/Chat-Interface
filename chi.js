class ChatInterface {
    constructor(options) {
        this.container = options.container || document.body;
        this.headerText = options.headerText || "CHI";
        this.subHeaderText = options.subHeaderText || "Your Chat Interface";
        this.onMessageSend = options.onMessageSend; // Custom callback function
        this.init();
    }

    init() {
        this.createChatContainer();
        this.setupEvents();
    }

    createChatContainer() {
        this.chatContainer = document.createElement('div');
        this.chatContainer.className = 'chat-container';

        this.header = document.createElement('div');
        this.header.className = 'header';
        this.header.innerHTML = `<h1>${this.headerText}</h1><p>${this.subHeaderText}</p>`;
        this.chatContainer.appendChild(this.header);

        this.messages = document.createElement('div');
        this.messages.className = 'messages';
        this.messages.id = 'messages';
        this.chatContainer.appendChild(this.messages);

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Type a message...';
        this.chatContainer.appendChild(this.input);

        this.button = document.createElement('button');
        this.button.textContent = 'Send';
        this.chatContainer.appendChild(this.button);

        this.container.appendChild(this.chatContainer);
    }

    setupEvents() {
        this.button.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    sendMessage() {
        const messageText = this.input.value.trim();
        if (messageText) {
            this.displayMessage(messageText, 'user');
            this.input.value = '';

            // Show loading spinner
            const loadingSpinner = document.createElement('div');
            loadingSpinner.className = 'spinner';
            this.displayMessage(loadingSpinner.outerHTML, 'bot');

            if (this.onMessageSend) {
                this.onMessageSend(messageText).then(responseText => {
                    // Remove loading message
                    this.removeLastBotMessage();
                    this.displayMessage(responseText, 'bot');
                }).catch(error => {
                    console.error('Error in onMessageSend:', error);
                    this.removeLastBotMessage();
                    this.displayMessage("There was an error processing your request.", 'bot');
                });
            } else {
                this.removeLastBotMessage();
                this.displayMessage("This is a default response.", 'bot');
            }
        }
    }

    displayMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = text; // Use innerHTML to allow HTML content
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight; // Auto scroll
    }

    removeLastBotMessage() {
        const botMessages = this.messages.getElementsByClassName('bot');
        if (botMessages.length > 0) {
            this.messages.removeChild(botMessages[botMessages.length - 1]);
        }
    }
}

// Expose the ChatInterface class to the global scope
window.ChatInterface = ChatInterface;
