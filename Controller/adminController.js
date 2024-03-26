const admin=require('../Models/adminSchema')
const jwt=require('jsonwebtoken')
 exports.adminReg=async (req,res)=>{
    console.log("inside the adminReg Function");
    const {adminname,email,password}=req.body
  const validAdmin= await admin.findOne({email})
  try{
    if(validAdmin){
        res.status(401).json("admin exist")
      }
      else{
        const newAdmin= await admin({
            adminname,email,password
        })
    
    await newAdmin.save()
    res.status(200).json("admin reg sucess")
      }
  }
  catch(error){
    res.status(500).json(error.message)
  }

}
exports.Adminlogin= async(req,res)=>{
const{adminname,password}=req.body

const valid = await admin.findOne({adminname,password})
const token=jwt.sign({AdminId:valid._id},"superkey")
try {
  if(valid){
    res.status(200).json({valid,token})
  }
  else{
    res.status(401).json("invalid admin")
  }
} catch (error) {
  res.status(500).json(error.message)
}
}
