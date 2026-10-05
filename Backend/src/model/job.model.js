const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    // Kis recruiter ne job dali hai
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    // Yeh job kis company ke liye hai
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Job description is required']
    },
    skillsRequired: {
      type: [String], // e.g., ['React', 'Node.js']
      required: true
    },
    location: {
      type: String, // e.g., 'Remote', 'Bangalore'
      required: true
    },
    salary: {
      type: String,
      default: 'Not Disclosed'
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
      default: 'Full-time'
    },
    // Complex Tracking: Kin-kin candidates ne is job ke liye apply kiya
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Job Seeker users ki IDs ka array
      }
    ]
  },
  { timestamps: true }
);
const jobModel= new mongoose.model('Job', jobSchema)
module.exports =  jobModel
