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

// Login handler
const login = async (req, res) => {
  try {
    console.log('Incoming request body:', req.body); // Log request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found for email:', email); // Log failed lookup
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email); // Log failed password check
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret', // Use env variable
      { expiresIn: '1h' }
    );

    console.log('User logged in successfully:', user.email); // Log successful login

    // Respond with user and token
    res.status(200).json({ 
      user: { id: user.id, email: user.email }, 
      token 
    });
  } catch (error) {
    console.error('Login error:', error.message); // Log detailed error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signup, login };
