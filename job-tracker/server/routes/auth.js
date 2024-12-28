const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth');
const { authenticateJWT } = require('../middleware/authenticateJWT');

// Signup route
router.post('/auth/signup', signup);

// Login route
router.post('/auth/login', login);


//Protected user route
router.get('/auth/user', authenticateJWT, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
