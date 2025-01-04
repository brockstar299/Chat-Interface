document.addEventListener('DOMContentLoaded', function() {
    // Set up the Ace Editor
    const editor = ace.edit("codeEditor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

    // Default code
    const defaultCode = `
const chat = new ChatInterface({
    container: document.getElementById('chatInterfaceContainer'),
    headerText: "Welcome to CHI",
    subHeaderText: "Your Chat Interface",
    onMessageSend: async (message) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(\`You said: \${message}\`);
            }, 2000); // Simulated delay
        });
    }
});
    `;
    editor.setValue(defaultCode);

    // Run the code when the button is clicked
    document.getElementById('runCode').addEventListener('click', function() {
        const userCode = editor.getValue();

        // Clear previous chat interface
        document.getElementById('chatInterfaceContainer').innerHTML = '';

        // Use eval to run the user code (unsafe for production, only for demo purposes)
        try {
            eval(userCode);
        } catch (error) {
            console.error('Error running the code:', error);
        }
    });
});
