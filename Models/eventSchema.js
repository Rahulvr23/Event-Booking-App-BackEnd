const mongoose=require("mongoose")
const projectSchema=new mongoose.Schema({
    eventName:{
        type:String,
        require:true
    },
    eventCategory:{
        type:String,
        require:true
    },
    date:{
        type:String,
        required:true
    },
   
    eventLocation:{
        type:String,
        required:true
    },
    eventDiscription:{
        type:String,
        required:true
    },
    eventImage:{
        type:String,
        required:true
    },
    limit:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    AdminId:{
        type:String,
        required:true
    },
})
const event=mongoose.model("event",projectSchema)
module.exports=event