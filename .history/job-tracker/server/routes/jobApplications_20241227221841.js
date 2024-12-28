const express = require('express');
const router = express.Router();
const { getJobApplications, getJobApplication, createJobApplication, updateJobApplication, deleteJobApplication } = require('../controllers/jobApplications');

//define routes
router.get('/', getJobApplications); //get all job applications
router.get('/:id', getJobApplication); //get a single job application
router.post('/', createJobApplication); //create a new job application