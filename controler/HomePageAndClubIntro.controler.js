const HomePageAndClubIntro=require('../models/HomePageAndClub.Intro.model.js')
const uploadOnCloudinary = require('../cloudinary.js');
const postHomePageAndClubIntro=async(req,res)=>{
    try{
    let body=req.body;
    let arr = req.files;
// Use Promise.all to wait for all uploads to complete
const pathArray = await Promise.all(
  arr.map(async (file) => {
    const result = await uploadOnCloudinary(file.path);
    return result;
  })
);
    const newDocument = new HomePageAndClubIntro ({
       
       headLine:body.headLine, 
       webPageInfo:body.webPageInfo,
       tagLine:body.tagLine,
       img:pathArray
    });
    newDocument.save()
        .then((document) => {
            res.status(200).json("sucessfully uploaded");
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
} catch (err) {
    res.status(500).json({ message: err.message });
}
}

const getHomePageAndClubIntro=async (req,res)=>{
    try{
    const getResult= await HomePageAndClubIntro.find(); 
    
    res.status(200).json(getResult)
    }
    catch(err){
        res.status(500).json({message:"server error"})
    }
}
module.exports={postHomePageAndClubIntro,getHomePageAndClubIntro}

