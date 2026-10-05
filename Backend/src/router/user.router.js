const express = require('express');
const userRouter = express.Router();
const { updateProfile } = require('../controller/user.Controller');
const verify= require("../middleware/verify.Middleware")
const upload = require('../middleware/upload.Middleware');

userRouter.put('/profile',verify, upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]),
  updateProfile
);

module.exports = userRouter;