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