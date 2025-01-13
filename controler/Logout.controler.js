const User = require('../models/Sign.model.js');
const handleLogout=async(req,res)=>{
    const cookies=req.cookies;
    console.log(cookies.Jwt);
    console.log(JSON.stringify(req.cookies.Jwt));
    if(!cookies?.Jwt){
        return res.sendStatus(204);//no content 
    }    
    const refreshToken=req.cookies.Jwt;
    console.log(refreshToken);
    const foundUser=User.findOne({refreshToken:refreshToken});
    console.log(foundUser);
    if(!foundUser){
        console.log(true);
        res.clearCookie('Jwt',{httpOnly:true,sameSite:'None',secure:true});
        return res.sendStatus(204);}
    const id=foundUser.emailId;    
    const user={emailId:id,refreshToken:""}
     console.log(JSON.stringify(user));
    const updatedUser=User.findByIdAndUpdate(id,user);
    res.clearCookie('Jwt',{httpOnly:true,sameSite:'None',secure:true});
    res.sendStatus(204);
}
module.exports=handleLogout;