const express = require('express');
const jobRouter = express.Router();
const jobController = require('../controller/job.Controller');
const  verify = require('../middleware/verify.Middleware');
const  isRecruiter = require('../middleware/isRecruiter');

// 1. Saare users/candidates jobs dekh  and apply sakte hain
jobRouter.get('/',jobController.getAllJobs);
jobRouter.post('/apply/:id', verify, jobController.applyJob);


// 2. Recruiter job post karega and view candidates

jobRouter.post('/', verify, isRecruiter, jobController.postJob);
jobRouter.get('/applicants/:id', verify, isRecruiter, jobController.getJobApplicants);

module.exports = jobRouter;