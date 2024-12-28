const express = require('express');
const cors = require('cors');
const {connectDb} = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Job Tracker API!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});