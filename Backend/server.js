require("dotenv").config()

const app = require("./src/app")
const connectToDb = require("./src/config/database")

app.listen(8000,()=>{
    console.log("sever is running on 8000")
})

connectToDb()