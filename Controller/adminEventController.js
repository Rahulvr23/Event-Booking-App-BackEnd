const event=require("../Models/eventSchema")
exports.addEvents=async(req,res)=>{
  
  
    const AdminId=req.payload
    const{eventName, eventCategory,date,eventLocation,eventDiscription,limit,amount}=req.body
    //get image
eventImage=req.file.filename



  
    try {
        const listedEvent=await event.findOne({eventName})
        if(listedEvent){
       
       res.status(400).json("already exist")
        }
        else{
       
            const newEvent = new event({eventName,eventCategory,date,eventLocation,eventDiscription,eventImage,limit,amount,AdminId})
            await newEvent.save()
            console.log(newEvent);
            res.status(200).json(newEvent)

        }
        
    } catch (error) {
        res.status(500).json("server error"+error.message)
    }

}

exports.GetArt=async(req,res)=>{
    const artsEvent=await event.find({ eventCategory:"Arts"})
    try {
        if(artsEvent.length>0){
            res.status(200).json(artsEvent)
        }
        else{
            res.status(400).json("No data found")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
    }
    //get music
    exports.GetMusic=async(req,res)=>{
       
        const musicEvent=await event.find({ eventCategory:"Music"})
        try {
            if(musicEvent.length>0){
                res.status(200).json(musicEvent)
            }
            else{
                res.status(400).json("No data found")
             
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
        }

        //get all project


exports.GetallEvent= async(req,res)=>{
const allEvent = await event.find() 
console.log(allEvent);
try {
    if(allEvent){
        res.status(200).json(allEvent)
    }
    else{
        res.status(400).json("No data found")
    }
} catch (error) {
    res.status(500).json(error.message)
}
        }

        exports.UpdateEvent=async(req,res)=>{
console.log("inside the update function");
const{eventName,eventCategory,date,eventLocation,eventDiscription,limit,amount,eventImage}=req.body

const UploadImage=req.file?req.file.filename:eventImage
console.log(`${eventName}gg`);
const AdminId=req.payload
const {eid}=req.params

try {
    const UpdateEvent=await event.findByIdAndUpdate({_id:eid},{eventName,eventCategory,date,eventLocation,eventDiscription,eventImage:UploadImage,limit,amount,AdminId },{new:true})
    console.log(UpdateEvent);
    await UpdateEvent.save()

    res.status(200).json(UpdateEvent)
    
} catch (error) {
    res.status(401).json("Internal server Error"+error.message);  
}

        }


 exports.delete=async(req,res)=>{
    const{eid}=req.params
    try {
        const deleteEvent = await event.findOneAndDelete({_id:eid})
        res.status(200).json(deleteEvent)
        
    } catch (error) {
        res.status(401).json("Internal server Error"+error.message);
        
    }
 }