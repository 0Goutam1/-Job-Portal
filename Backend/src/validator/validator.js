const {body, validationResult} = require('express-validator')

 const validation =(req, res,next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
       return next()
    }
     else {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    
}


 const registerValidator = () => [
     body("userName")
       .trim()
       .notEmpty()
       .withMessage("Name is required"),

     body("email")
       .trim()
       .isEmail()
       .withMessage("Enter a valid email"),

     body("password")
       .isLength({ min: 6 })
       .withMessage("Password must be at least 6 characters"),

     body("otp")
       .trim()
       .notEmpty()
       .withMessage("Please enter the OTP sent to your email")
       .bail()
       .matches(/^\d{6}$/)
       .withMessage("OTP must be 6 digits"),

     validation
 ]

 const sendOTPValidator = () => [
   body("email")
     .trim()
     .isEmail()
     .withMessage("Enter a valid email"),
   validation
 ]

 const loginValidator = () => [
     body("userName")
       .trim()
       .notEmpty()
      .withMessage("Name is required"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    validation
]

module.exports={
  loginValidator,
  registerValidator,
  sendOTPValidator
}