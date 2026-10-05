const Redis= require("ioredis")

const redis = new Redis(
    {
        host : process.env.Redis_host,
    port : process.env.Redis_port,
    password : process.env.Redis_password
    }
)

  redis.on("connect",()=>{
    console.log("Redis  is connected")
})
  
redis.on("error",(error)=>{
    console.log(error)
})


module.exports= redis