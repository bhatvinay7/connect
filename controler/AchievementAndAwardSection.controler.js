const AchievementAndAwardSection=require('../models/AchievementAndAwardSection.model.js')
const uploadOnCloudinary=require('../cloudinary.js')
const postAchievement=async (req,res)=>{
    try{
    const body=req.body;
    const filepath=req.file;
   const url=await uploadOnCloudinary(filepath.path)
    const document= new AchievementAndAwardSection({
          img:url,
          headLine1:body.headLine1,
          mainContent:body.mainContent,
})
document.save().then((document)=>{
        res.status(200).json("uploaded successfully")
}).catch((err)=>{
    res.status(500).json("failed to upload the file,try again")
})
}
catch(err){
    res.status(500).json("Internal server error");
}
}

const getAllDocuments=async (req,res)=>{
    try{
    const result= await AchievementAndAwardSection.find()
    res.status(200).json(result);
    }
    catch(err){
        res.status(500).json("Internal server error")
    }
}
module.exports={postAchievement,getAllDocuments}