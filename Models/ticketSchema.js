const mongoose=require('mongoose')
const ticketSchema= new mongoose.Schema({
eventName:{
type:String,
required:true
},
personName:{
    type:String,
required:true

},
number:{
    type:String,
required:true

},
userId:{
    type:String,
    required:true
}

})
const ticket=mongoose.model("tickets",ticketSchema)
module.exports=ticket
