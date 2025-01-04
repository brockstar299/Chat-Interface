// Initialize the Code Editor (using Ace Editor)
const editor = ace.edit("codeEditor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

// When the "Run Code" button is clicked, execute the code from the editor
document.getElementById('runCode').addEventListener('click', () => {
    const userCode = editor.getValue();

    // Clear any previous chat interface
    document.getElementById('chatInterfaceContainer').innerHTML = '';

    try {
        // Create a new script element to run the user code
        const script = document.createElement('script');
        script.innerHTML = userCode;
        document.body.appendChild(script);

        // Optionally, you could return some success feedback here
        console.log("Code executed successfully!");
    } catch (error) {
        // Display error in console if the code has an issue
        console.error("Error executing code:", error);
        alert("Error in the code! Check the console for details.");
    }
});
