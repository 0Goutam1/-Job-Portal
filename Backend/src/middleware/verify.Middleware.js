const jwt = require("jsonwebtoken")
const redis = require("../config/cache")


async function verify(req,res,next) {

    const Token = req.cookies.token
    if(!Token){
        return res.status(401).json({
            message:"unauthorize user"
        })
    }

const isTokenBlacklisted= await redis.get(Token)

if(isTokenBlacklisted)
{
    return res.status(401).json({
        message:"invalid token"
    })
}

    const decoded= await jwt.verify(Token,process.env.jwt_Secrty)
    if(!decoded){
        return res.status(401).json({
            message:"unauthorize user"
        })
    }
    req.user= decoded
    next()
}

module.exports= verify