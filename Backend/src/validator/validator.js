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


 const registerValidator= ()=>
    [
    body("userName")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Enter a valid email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
      
      validation
]
  


 const loginValidator = ()=>
     [
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
  registerValidator
}
  