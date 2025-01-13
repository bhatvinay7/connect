const jwt=require('jsonwebtoken');
require('dotenv').config();
const User = require('./models/Sign.model.js');
const handleRefreshToken=(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.Jwt)return res.sendStatus(401);//unauthorized
   // console.log(cookies.Jwt);
    const refreshToken=cookies.Jwt;
    const foundUser=User.findOne({refreshToken:refreshToken});
    if(!foundUser){
        console.log("user not found")
        return res.sendStatus(403);
    }    
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,
        (err ,decoded)=>{
            if(err ||foundUser.emailId!==decoded.emailId){ 
                return res.sendStatus(403);//Forbidden

            }
            const accessToken=jwt.sign({userId:decoded.userId,roles:decoded.roles},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'120s'});
            res.json({userId:decoded.userId,accessToken:accessToken,roles:decoded.roles})
        });
}
module.exports=handleRefreshToken;