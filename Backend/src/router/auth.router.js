const express = require("express")
const authRouter = express.Router()
const authController= require("../controller/auth.Controller")
const  verify  = require ('../middleware/verify.Middleware')
const {registerValidator , loginValidator}= require('../validator/validator')


authRouter.post('/send-otp', authController.sendOTP)

authRouter.post('/register',registerValidator(),authController.registerController)
authRouter.post('/login',loginValidator(),authController.loginController)
authRouter.post('/logout',authController.logOutController)
authRouter.get('/getMe',verify,authController.getMe)


module.exports=  authRouter
