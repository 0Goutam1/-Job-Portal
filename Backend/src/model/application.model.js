const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    seekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);
const applicationModel= new mongoose.model("Application", applicationSchema)
module.exports = applicationModel;
