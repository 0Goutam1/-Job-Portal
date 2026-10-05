const mongoose= require("mongoose")

async function connectToDb() {

     await mongoose.connect(process.env.MODUL_URI)
    .then(()=>{
        console.log("database is connected")
    })
    
}

module.exports= connectToDb