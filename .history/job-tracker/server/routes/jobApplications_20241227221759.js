const express = require('express');
const router = express.Router();
const { getJobApplications, getJobApplication, createJobApplication, updateJobApplication, deleteJobApplication } = require('../controllers/jobApplications');
