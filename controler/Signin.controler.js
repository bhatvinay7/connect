const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const validator = require("email-validator");
const cookieParser=require('cookie-parser');
require('dotenv').config();
const bcrypt= require('bcrypt');
const User = require('../models/Sign.model.js');
function handleError(err){
  let error={emailId:"",password:""}
  // duplicate error code
  if(err.code==11000){
    error.emailId='Email already exists '
    return error
  }
  if(err.message.includes('emailId is not correct')){
    error.emailId="EmailId is not correct"
  }
  else if (err.message.includes('User validation failed')){

  error.password="Enter the password with minimum 6 characters"
}
else if(err.message.includes('User not found, please sign in')){
  error.emailId='User not found, please sign in';
}
else if(err.message.includes('Incorrect password')){
  error.password='Incorrect password';
}
return error
}

const getSignin = async (req, res) => {

  const useremailid = req.body.email;
  const userpassword = req.body.password;
 // const email =validator.validate(req.body.email);
  // const isGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  try {
    if(!useremailid.includes("@gmail.com")){
      throw new Error("emailId is not correct");
    }
    if(userpassword.length<6){
      throw new Error('User validation failed');
    }
   // const existingUser = await User.findOne({ emailId: useremailid });
    bcrypt.hash(userpassword,10, async function(err, hashedPassword) {
      const newUser = new User({ emailId: useremailid, password:hashedPassword});
      const savedUser =await newUser.save();
      res.status(201).json({userId:savedUser.emailId,message:"Sign in Successful"}) 
    });

    
  } 
  catch (err) {
    const error=handleError(err)
    if(!error.emailId && !error.password){
      res.status(500).json({message:'server error'});

    }
    else{
      console.log(error)
      res.status(409).json(error);
    }
  }
};

const login = async (req, res) => {
  const userpassword = req.body?.password;
  const useremailid = req.body?.email;
  
  
  //const email =validator.validate(useremailid);
  try {
    if( !useremailid.includes("@gmail.com")){
      throw new Error("emailId is not correct");
    }
    if(!userpassword){
      throw new Error('Incorrect password');
    }
    const user = await User.findOne({ emailId: useremailid });
    console.log(user)
    if (!user){
      throw new Error('User not found, please sign in' );
    } else {
     bcrypt.compare(userpassword,user.password, async (err, result) => {
        if (err) {
          throw new Error('Incorrect password');
        }
        if (result) {
          const accessToken=jwt.sign({userId:user.emailId,roles:user.roles},process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'120s'});
         // res.status(200).json(user);
          const refreshToken=jwt.sign({userId:user.emailId,roles:user.roles},process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'});
            newUser=await User.findByIdAndUpdate(user._id,{refreshToken:refreshToken});
            res.cookie('Jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:2*24*60*60*1000});
          //  res.cookie('AccessToken',accessToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:60*60*60*1000});
          res.status(200).json({accessToken:accessToken,userId:user.emailId,roles:user.roles,message:"Login Successful"});
        } 
        else {
          const error=handleError(new Error('Incorrect password'))
          res.status(409).json(error);
          
        }
      });
    }
  } 
  catch (err) {  
    const error=handleError(err)
    if(!error.emailId && !error.password){
      res.status(500).json({message:'server error'});
    }
    else{
      console.log(error)
      res.status(409).json(error);
    }
  }
};

const upDateUser=async(req,res)=>{
  try{
  const useremailid = req.body.email;
  const Role = req.body.role;
  const user = await User.findOne({ emailId: useremailid });
 
  if (!user){
    throw new Error('User not found' );
  } else {
    const roles=process.env.USER_ROLES
    if(roles.some(role=>Role.includes(role))){
    const updatedUser= await User.findByIdAndUpdate(user._id,{roles:Role})
    res.status(200).json({accessToken:"",userId:updatedUser.emailId,message:"Access Granted"});
    }
  }
  res.sendStatus(401)
}
catch(err){
  
  res.status(500).json(err.message)

}    
}
module.exports = { getSignin, login,upDateUser };
