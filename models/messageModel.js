const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming you have a User model
  },
  // Add other fields as needed
});

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

// Export the Message model
module.exports = Message;
