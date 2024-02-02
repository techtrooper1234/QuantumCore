const mongoose = require('mongoose');
require('dotenv').config(); // Use require for dotenv

// Get environment variables
const { NODE_ENV, PORT, MONGO_URI } = process.env;

// Set MongoDB connection options (optional, adjust as needed)
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

// Connect to MongoDB
mongoose.connect(MONGO_URI, mongooseOptions);

// Event listeners for MongoDB connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB (${NODE_ENV} environment)`);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Create an Express app instance for future use (optional)
const express = require('express');
const app = express();

// Listen on the specified port
const port = PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export the mongoose connection
module.exports = mongoose;