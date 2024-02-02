const asyncHandler = require('express-async-handler')

// Bring in our model

const Message = require('../models/messageModel')

//Desc Get request

// @route Get/api/messages

const getMessages = asyncHandler(async (req, res) => {
     const messages = await Message.find();
     res.status(200).json(messages);
})

//Desc Post request

// @route Post/api/messages/:id

const setMessages = asyncHandler(async (req, res) => {
     if(!req.body.text){
       res.status(400)
       throw new Error('Invalid response');
     }

const messages = await Message.create(req.body);
     res.status(200).json(messages);

})

// Update request
const updateMessages = asyncHandler(async (req, res) => {
     const message = await Message.findById(req.params.id);
   
     if (!message) {
       res.status(404).json({ error: 'Message not found' });
       return;
     }
   
     const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
     res.json(updatedMessage);
   });
   

//Desc Delete request

// @route Delete/api/messages/:id
const deleteMessages = asyncHandler(async (req, res) => {
     const message = await Message.findById(req.params.id);
   
     if (!message) {
       res.status(404).json({ error: 'Message not found' });
       return;
     }
   
     const deletedMessage = await Message.findByIdAndDelete(req.params.id);
     res.status(200).json(deletedMessage);
   });



module.exports = { getMessages, setMessages, updateMessages, deleteMessages};
