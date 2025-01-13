const User = require('../DB/models/Sign.model.js');
const verifyControlerAuth=async(req,res,next)=>{
    const emailId=req.userId;
    const user=await User.findOne({emailId:emailId})
    if(!user){
        res.sendStatus(401)
    }
    const roles=req.roles
    if(emailId==user?.emailId && roles?.some((role)=> user?.roles?.includes(role)) ){
        next()
    }
    else{
    res.sendStatus(401)
    }
}
module.exports=verifyControlerAuth