
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next) => {


    //get the token form user request
    const token = req.headers['authorization']?.slice(7)
    console.log(token);
    try{
    //token verification 
    const tokenVerification = jwt.verify(token,'superkey')
 
    req.payload = tokenVerification.AdminId
    
    next();
    }
    catch(err){
        res.status(401).json("Authorization failed....please login again...",)
    }
    
}
  
module.exports = jwtMiddleware