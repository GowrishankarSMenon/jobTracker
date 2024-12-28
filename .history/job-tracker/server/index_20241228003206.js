const express = require('express');
const cors = require('cors');
const {connectDB} = require('./config/db');
require('dotenv').config();
const { sequelize } = require('./models'); // Import sequelize here
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 5000;

//connect to databse
connectDB();

//imnport routes
const jobApplicationRoutes = require('./routes/jobApplications');

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

//sync database
sequelize.sync({ force: false })  // Set 'force: true' only in dev environments for resetting the DB
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });
