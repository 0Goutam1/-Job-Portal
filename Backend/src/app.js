const express = require("express")
const cors= require("cors")
const app= express()
app.use(express.json())

const cookie = require("cookie-parser")
app.use(cookie())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

const authRouter= require("./router/auth.router")
const userRouter= require('./router/user.router')
const jobRouter= require('./router/job.router')
const companyRouter= require('./router/company.router')
const applicationRouter=require('./router/application.router')

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/job',jobRouter)
app.use('/api/company',companyRouter)
app.use("/api/application", applicationRouter);

const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});


module.exports= app


