const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController'); // Adjust the path accordingly
const { protect } = require('../middleware/authMiddleware'); // Adjust the path accordingly

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;

