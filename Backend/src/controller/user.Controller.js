const User = require('../model/user.model');
const { uploadToImageKit } = require('../util/util');


const updateProfile = async (req, res) => {

  try {
    const userId = req.user.userId;
    const { fullName, bio, skills, experienceStatus } = req.body;

    const updateFields = {};

    if (fullName) updateFields.fullName = fullName;
    if (bio) updateFields.bio = bio;
    if (experienceStatus) updateFields.experienceStatus = experienceStatus;

    // Skills handling (comma-separated string ya array)
    if (skills) {
      updateFields.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map((s) => s.trim()).filter(Boolean);
    }


    // ImageKit File Uploads
    if (req.files) {
      if (req.files.profileImage && req.files.profileImage[0]) {
        const file = req.files.profileImage[0];
        
        updateFields.profileImage = await uploadToImageKit(
          file.buffer,
          file.originalname,
          '/job-portal/profiles'
        );
      }

      if (req.files.resume && req.files.resume[0]) {
        const file = req.files.resume[0];
        updateFields.resume = await uploadToImageKit(
          file.buffer,
          file.originalname,
          '/job-portal/resumes'
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
     { returnDocument: "after" }
    )

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: updatedUser
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while updating profile.',
      error: error.message
    });
  }
};

module.exports = { updateProfile };