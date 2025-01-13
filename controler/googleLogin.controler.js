const User=require('../models/Sign.model.js')
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
require('dotenv').config();
const axios=require('axios');
const oauth2client=require('../googleConfig.js')
const googleLogin= async (req,res)=>{
    try{
         const code=decodeURIComponent(req.query.code);
         const googleResponse = await oauth2client.getToken(code);
        // console.log(googleResponse )
         oauth2client.setCredentials(googleResponse.tokens)
        //  console.log(oauth2client)
            const tokenInfo = await oauth2client.getTokenInfo(googleResponse.tokens.access_token);
        // console.log('Token Scopes:', tokenInfo.scopes);
    
        // Fetch user info
        const user= await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${googleResponse.tokens.access_token}`,
            },
        });
        const {email,name, picture}=user.data
        let newUser=null
         newUser = await User.findOne({ emailId:email });
        
        if (!newUser ){
                res.status(401).json("Please sign in")
        }
        if(newUser){
        const accessToken=jwt.sign({userId:newUser.emailId,roles:newUser.roles},process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'120s'});
         // res.status(200).json(user);
          const refreshToken=jwt.sign({userId:newUser.emailId,roles:newUser.roles},process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'});
            newUser=await User.findByIdAndUpdate(newUser._id,{refreshToken:refreshToken});
            res.cookie('Jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:2*24*60*60*1000});
          //  res.cookie('AccessToken',accessToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:60*60*60*1000});
          res.status(200).json({accessToken:accessToken,userId:newUser.emailId,roles:newUser.roles,message:"Login Successful"});
        }
       }         
    catch(err){
        res.status(500).json(err.message)
    }
}
module.exports=googleLogin