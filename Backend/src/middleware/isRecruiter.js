const userModel = require('../model/user.model')
const isRecruiter =async (req, res, next) => {
  const userId=req.user.userId
  const user =  await userModel.findById(userId)
  if (user.role === 'recruiter') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Only recruiters allowed.' });
};

module.exports = isRecruiter ;