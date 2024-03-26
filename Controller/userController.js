const users=require("../Models/userSchema")
var jwt = require('jsonwebtoken');


//register logic
exports.userRegister=async(req,res)=>{
   
 const {username,email,password}=req.body
const existingUser=  await users.findOne({email})
try{
    if(existingUser){
        res.status(401).json("User Already exist")
    }
    else{
    const newUser=await users({
        username,email,password
    })
    await newUser.save()
    res.status(200).json("user reg sucess")
    }
}
catch(err){
    res.status(500).json("server error"+err.message)
}

}

//login logic
exports.userLogin=async(req,res)=>{
    console.log("inside the login function");
    const{username,password}=req.body


    try{
        const validuser=await users.findOne({username,password})
        if(validuser){
            const token =jwt.sign({userId:validuser._id},"superkey");//token generation
           console.log(token);
          
          res.status(200).json({validuser,token})
        }
        else{
            
            res.status(401).json("invalid details")
        }
    }
    catch(err){
        console.log("err");
        res.status(500).json(err.message)
    }
   
}