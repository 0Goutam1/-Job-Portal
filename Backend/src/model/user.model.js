const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:[true,'userName is required'],
    },
    email:{
        type:String,
        require:[true,'email is required']
    },
    password:{
        type: String,
        require:[true,'password is required'],
        select: false
    },
    
    role:{
        type:String,
        require:true,
        enum:['seeker','recruiter'],  
        default:'seeker',
    },

    fullName:{
        type:String,
        default:''

    },
    profileImage:{
        type:String,
        default: 'https://ik.imagekit.io/goutam10/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.avif?updatedAt=1789227523950'

    },

    bio:{
        type:String,
        default:''

    },
    resume:{
        type:String,
        default:''

    },
    skills:{
        type:[]

    },
    experienceStatus:{
        type:String,
        default:'',
        enum:['Fresher','Exprienced','']

    }
},{timestamps:true})

const userModel = new mongoose.model("user",userSchema)

module.exports=  userModel