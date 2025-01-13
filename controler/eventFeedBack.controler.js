const eventFeedBack=require('../models/eventFeedBack.model.js')
const postFeedBack= async(req,res)=>{
    try{
        const textContent=req.body?.data?.text
        const eventName=req.body?.data?.eventName
        const userEmailId=req.body?.data?.userEmailId
         if(textContent.length==0){
            res.status(400).json('please Enter the all the fields Properly')
            return
        }
        else if(textContent.length<120){
            console.log(textContent.length)
            res.status(400).json('Feedback should be of minimum 120 characters')
            return
        }
         const document=new eventFeedBack(
            {  eventName:eventName,
                userEmailId:userEmailId,
                textContent:textContent,
            }
         )
         document.save().then((document)=>{
              res.status(200).json("Your respone has been recorded,Thank you for your response ")
         }).catch((err)=>{
            res.status(500).json(`${err.message} Your response is not recorded,Please try again`)
         })
    }
    catch(err){
        res.status(500).json(err.message)
    }
}
module.exports=postFeedBack