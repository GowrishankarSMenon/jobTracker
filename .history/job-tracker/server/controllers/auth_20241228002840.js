const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Signup handler
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ email, password: hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup };
