const express=require('express')
require('dotenv').config()//Loads .env file contents into process.env by default. 
const cors=require('cors')
const router=require('../Back-end/Routers/route')
const db=require("../Back-end/DB/connection")


const app=express()//create backend application using express
//use
app.use(cors())
app.use(express.json())
app.use(router)


app.use('/uploads',express.static(`./uploads`)) //image exporting to frontend 




const PORT=4000||process.env.PORT//port number
app.listen(PORT,console.log(`server started at ${PORT}`))
