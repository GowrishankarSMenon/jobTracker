const {JobApplication} = require('../models/jobapplication');

//get all job applications
async function getJobApplications(req, res) {
    try {
        const jobApplications = await JobApplication.findAll();
        res.status(200).json(jobApplications);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//get a single job application
async function getJobApplication(req, res) {
    try {
        const {id} = req.params;
        const jobApplication = await JobApplication.findByPk(id);
        if (jobApplication) {
            res.status(200).json(jobApplication);
        } else {
            res.status(404).json({message: 'Job application not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//create a new job application
async function createJobApplication(req, res) {
    try {
        const jobApplication = await JobApplication.create(req.body);
        res.status(201).json(jobApplication);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}