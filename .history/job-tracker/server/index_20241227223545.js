const express = require('express');
const cors = require('cors');
const {connectDB} = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//connect to databse
connectDb();

//imnport routes
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/job-applications', jobApplicationRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Job Tracker API!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});