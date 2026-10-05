const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Company description is required']
    },
    logo: {
      type: String,
      default: 'default-company-logo.png'
    },
    location: {
      type: String,
      required: [true, 'Company location is required'],
      trim: true
    },
    // Tracking: Kis recruiter ne is company ko banaya hai
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // User model ki ID aayegi yahan
      required: true
    }
  },
  { timestamps: true }
);
const compayModel = new mongoose.model('Company', companySchema)
module.exports = compayModel