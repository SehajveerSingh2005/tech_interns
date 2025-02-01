const express = require('express');
const { registerUser, loginUser, fetchUserFirstName } = require('../controllers/authController');
const User = require('../models/User');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Register a new user
router.post('/signup', protect, registerUser);

// Login a user
router.post('/login', protect, loginUser);

// Fetch user first name
router.get('/firstname', protect, fetchUserFirstName);


module.exports = router;