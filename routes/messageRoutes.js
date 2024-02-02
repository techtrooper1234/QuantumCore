const express = require('express');
const { setMessages, updateMessages, deleteMessages } = require('../controllers/messageController');
const { getGoals, setGoal, deleteGoal, updateGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Message routes
router.get('/', protect, (req, res, next) => {
  getMessages.find({}, 'action')
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/', protect, (req, res, next) => {
  if (req.body.action) {
    setMessages.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  }
});

router.post('/:id', protect, (req, res, next) => {
  // Assuming setMessages is a model, you need to import it and use it properly
  setMessages.create({
    action: req.body.action,
    user: req.user.id, // Assuming you have user information in the request
    _id: req.params.id, // Use the provided ID from the URL
  })
    .then((data) => res.json(data))
    .catch(next);
});

router.put('/:id', protect, (req, res, next) => {
  updateMessages.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => res.json(data))
    .catch(next);
});

router.delete('/:id', protect, (req, res, next) => {
  deleteMessages.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch(next);
});

// Goal routes
router.route('/goals')
  .get(protect, getGoals)
  .post(protect, setGoal);

router.route('/goals/:id')
  .delete(protect, deleteGoal)
  .put(protect, updateGoal);

module.exports = router;



