const mongoose=require('mongoose')
const adminSchema= new mongoose.Schema({
    adminname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const admin=mongoose.model("Admin",adminSchema)
module.exports=admin

