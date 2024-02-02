const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middleware/middleware');
const { protect } = require('./middleware/authMiddleware');
const userRouter = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes'); 

const app = express();

app.use(bodyParser.json());
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Chatbot Service is running.');
});

app.post('/api/messages', async (req, res) => {
  const { message } = req.body;
  res.json({ message });
});

// Define a route for PUT requests to '/api/messages/:id'
app.put('/api/messages/:id', async (req, res) => {
  const message = await req.params.id;
  const updatedMessage = req.body;
  res.json(updatedMessage);
});

// Define a route for Delete requests to '/api/messages/:id'
app.delete('/api/messages/:id', async (req, res) => {
  const message = await req.params.id;
  res.json({ message: 'Item deleted successfully' });
});

// Delete request
app.delete('/:id', (req, res, next) => {
  // Assuming deleteMessages is a model, you need to import it and use it properly
  deleteMessages.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

// Put request
app.put('/:id', (req, res, next) => {
  // Assuming updateMessages is a model, you need to import it and use it properly
  updateMessages.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((data) => res.json(data))
    .catch(next);
});

// Post request
app.post('/', (req, res, next) => {
  if (req.body.action) {
    // Assuming setMessages is a model, you need to import it and use it properly
    setMessages.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

// Use the router middleware for the '/api/messages' path
app.use('/api/messages', messageRoutes); // Use the correct messageRoutes module

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

