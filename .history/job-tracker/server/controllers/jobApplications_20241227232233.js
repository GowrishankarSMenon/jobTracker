const {JobApplication} = require('../models');

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

//update a job application
async function updateJobApplication(req, res) {
    try {
        const {id} = req.params;
        const [updated] = await JobApplication.update(req.body, {
            where: {id: id}
        });
        if (updated) {
            const updatedJobApplication = await JobApplication.findByPk(id);
            res.status(200).json(updatedJobApplication);
        } else {
            res.status(404).json({message: 'Job application not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//delete a job application
async function deleteJobApplication(req, res) {
    try {
        const {id} = req.params;
        const deleted = await JobApplication.destroy({
            where: {id: id}
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({message: 'Job application not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {getJobApplications, getJobApplication, createJobApplication, updateJobApplication, deleteJobApplication};