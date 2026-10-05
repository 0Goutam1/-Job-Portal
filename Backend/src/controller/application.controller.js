const Application = require("../model/application.model");
const Job = require("../model/job.model");


// Seeker → My Applications
const getMyApplications = async (req, res) => {
    try {

        const applications = await Application.find({
            seekerId: req.user.userId
        })
        .populate("jobId")
        .populate("companyId");

        return res.status(200).json({
          message:"user get successfully",
            data: applications
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Recruiter → Applicants
const getJobApplications = async (req, res) => {
    try {

        const { jobId } = req.params;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // Sirf jis recruiter ki job hai wahi applicants dekh sake
        if (job.recruiterId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not allowed to view these applications"
            });
        }

        const applications = await Application.find({
            jobId: jobId
        })
        .populate("seekerId", "-password")
        .populate("jobId")
        .populate("companyId");

        return res.status(200).json({
            message:"data get successfuly",
            data: applications
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    const job = await Job.findById(application.jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // Sirf job ka recruiter status change kar sakta hai
    if (job.recruiterId.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this application"
      });
    }

    application.status = status;

    await application.save();

    return res.status(200).json({
      message: `Application ${status}`,
      data: application
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
  getMyApplications,
  getJobApplications,
  updateApplicationStatus
};

