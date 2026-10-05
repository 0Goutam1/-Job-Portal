// controllers/jobController.js
const Job = require('../model/job.model');
const Company= require('../model/company.model')
const Application = require("../model/application.model");

// 1. Recruiter Job Post karega

const postJob = async (req, res) => {

  const company = await Company.findOne({
    createdBy: req.user.userId
});

if (!company) {
    return res.status(404).json({
        success: false,
        message: "Please create a company first."
    });
}


  const { title, description, skillsRequired, location, salary, jobType } = req.body;

  const job = await Job.create({
    title,
    description,
    skillsRequired,
    location,
    salary,
    jobType,
    companyId: company._id,
    recruiterId: req.user.userId
  });

  res.status(201).json({ success: true, data: job });
};

// 2. Candidate/User ko saare Jobs dikhenge (Role ya Company Name dono se search support)
const getAllJobs = async (req, res) => {
  const { search } = req.query;

  const filter = search ? { title: { $regex: search, $options: 'i' } } : {};

  const jobs = await Job.find(filter).populate('companyId');
  res.status(200).json(jobs);
};

// 3. Candidate Job apply karega
const applyJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found.' });
  }

  const alreadyApplied = await Application.findOne({
    seekerId: req.user.userId,
    jobId: job._id
});

if (alreadyApplied) {
    return res.status(400).json({
        success: false,
        message: "Already applied for this job"
    });
}
const application = await Application.create({
    seekerId: req.user.userId,
    jobId: job._id,
    companyId: job.companyId
});


  job.applicants.push(req.user.userId);
  await job.save();

  res.status(200).json({ success: true, message: 'Applied successfully.' });
};

// 4. Recruiter dekhega kis-kisne job me apply kiya
const getJobApplicants = async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate('applicants', 'fullName email resume skills');

  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found.' });
  }

  res.status(200).json({ success: true, applicants: job.applicants });
};

module.exports = {
  postJob,
  getAllJobs,
  applyJob,
  getJobApplicants
};