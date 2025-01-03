const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const authMiddleware = require('../Middleware/authMiddleware');

// Define routes
router.post('/register', userController.registerUser); // Public route for user registration
router.post('/login', userController.loginUser);       // Public route for user login
router.get('/profile/:id', userController.getUserProfile); // Protected route for user profile

module.exports = router;
