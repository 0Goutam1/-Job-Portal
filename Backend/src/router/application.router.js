const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify.Middleware");
const applicationController = require("../controller/application.controller");
const isRecruiter = require("../middleware/isRecruiter");



// Seeker → apni applications dekhe
router.get("/my-applications", verify,applicationController.getMyApplications);


// Recruiter → apni job ke applicants dekhe
router.get("/job/:jobId", verify, applicationController.getJobApplications);

router.patch("/status/:applicationId",verify,isRecruiter,applicationController.updateApplicationStatus);


module.exports = router;
