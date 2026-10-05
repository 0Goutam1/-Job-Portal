const jwt= require("jsonwebtoken")
const userModel= require("../model/user.model")
const bcrypt = require("bcrypt")
const redis= require("../config/cache")
const OTP = require('../model/OTP.model')
const nodemailer= require('nodemailer')

const sendOTP = async (req,res)=>{
    const {email} = req.body
    const generatedOtp = `${Math.floor(100000 + Math.random()*900000)}`
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })
    const mailOptions={
        from: process.env.EMAIL_USER,
        to:email,
        subject:'Hire Plus - Email Verification OTP',
        html:`<p> For account verifaction OTP :<b>${generatedOtp}</b> </p>
        <p>Yeh Opt sirf 5 minute ke liye valid hasHimportCoordinator.</p>`
    }
    await OTP.deleteMany({ email });

    await OTP.create({
    email,
    otp: generatedOtp
     });

    await transporter.sendMail(mailOptions);
    res.status(200).json({
        message :"OTP aapke email par bhej diya gaya hai"
    })
}

async function registerController(req,res){
    const {userName,email,password,role,otp}= req.body

    const isuser= await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    })

    if(isuser){
        return res.status(409).json({
            message:"user already existed"
        })
    }


    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
    return res.status(400).json({
        message: "OTP expired or OTP not found"
    });
    }

    if (otpRecord.otp !== otp) {
    return res.status(400).json({
        message: "Invalid OTP"
    });
    }


    const hash = await bcrypt.hash(password,10)
    const user= await userModel.create({
        userName,
        email,
        password:hash,
        role
    })

    const token = await jwt.sign({
        userId:user._id
    },process.env.jwt_Secrty,{expiresIn:'7d'})

    res.cookie("token",token)

    await OTP.deleteOne({ email });


    res.status(201).json({
        message:"user created sucessesfully",
        user
    })
}

 async function loginController(req,res) {
    const {userName,email,password}= req.body
    const user= await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message:"Invadil credential"
        })
    }
    const ispassword = await bcrypt.compare(password,user.password)

    if(!ispassword){

        return res.status(401).json({
            message:"Invadil credential"
        })
    }
    const token = await jwt.sign({
        userId: user._id
    },process.env.jwt_Secrty,{expiresIn:'7d'})

    res.cookie("token",token)

    res.status(200).json({
        message:"login sucessesfully",
        user

    })
    
 }

 async function logOutController(req,res) {
    const token = req.cookies.token

 redis.set(token,Date.now().toString(),"EX",60*60)

 
    res.clearCookie("token")
    res.status(200).json({
        message:"logout succesesfully"
    })
 }

 async function getMe(req,res) {
const userId= req.user.userId
const user= await userModel.findById(userId)
res.status(200).json({
    message:"user detail get successfully",
     user 
})
    
 }

 
module.exports={
    registerController,
    loginController,
    logOutController,
    getMe,
    sendOTP
}