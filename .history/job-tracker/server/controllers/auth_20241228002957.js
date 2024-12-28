const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');  // Assuming you're using Sequelize

// Signup handler
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ email, password: hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send response with user and token
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login handler
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send response with user and token
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login };
