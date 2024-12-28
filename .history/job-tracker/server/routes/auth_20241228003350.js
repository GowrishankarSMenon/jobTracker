const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth');

// Signup route
router.post('/auth/signup', signup);

// Login route
router.post('/auth/login', login);

module.exports = router;
