const express = require('express');
const bodyParser = require('body-parser');
const { NlpManager } = require('node-nlp');

// Initialize express app
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());


// Define a simple route for GET requests to '/'
app.get('/', (req, res) => {
// Send a response that says 'Chatbot Service is running.'
 res.send('Chatbot Service is running.');
});

// Define a route for POST requests to '/api/messages'
app.post('/api/messages', async (req, res) => {
// Get the message from the request body
 const { message } = req.body;
 // Here you would process the message and return a response
 // For now, let's just echo the message back
// Send a JSON response that contains the message
 res.json({ message });
});

// Start the server
// Define a port number for the server
const PORT = process.env.PORT || 5000;
// Listen for incoming requests on the port number
app.listen(PORT, () => {
// Log a message when the server starts
 console.log(`Server is running on port ${PORT}`);
});
