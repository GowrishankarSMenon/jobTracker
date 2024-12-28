const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Assuming Sequelize setup

// Signup handler
const signup = async (req, res) => {
  try {
    console.log('Incoming request body:', req.body); // Log request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    console.log('Existing user:', existingUser); // Log result of user lookup
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ email, password: hashedPassword });
    console.log('New user created:', newUser); // Log the new user details

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'your_jwt_secret', // Use env variable
      { expiresIn: '1h' }
    );

    res.status(201).json({ user: { email: newUser.email, id: newUser.id }, token });
  } catch (error) {
    console.error('Signup error:', error.message); // Log detailed error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login handler remains unchanged
module.exports = { signup, login };
