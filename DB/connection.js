const mongoose=require('mongoose')//imported mongoose to our project through require
const connectionString=process.env.DATABASE //connection string from .env file

// establish connection with mongodb database
mongoose.connect(connectionString)
.then(()=>{                                     
    console.log("Database connection established");
}).catch((error)=>{
    console.log(error);
})