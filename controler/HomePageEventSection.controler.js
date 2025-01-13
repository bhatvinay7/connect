const HomePageEventSection=require('../models/HomePageEventSection.model.js');
const uploadOnCloudinary=require('../cloudinary.js')
const postHomePageEventSection=async (req,res)=>{
    try{
        const body=req.body;
        const filePath=req.file;
        console.log(filePath)
        const url=await uploadOnCloudinary(filePath.path);
        const newDocument=new HomePageEventSection({
            shortEventInfo:body.shortEventInfo,
            img:url,
            date:new Date(body.date)
        })
        newDocument.save().then((newDocument)=>{
            res.status(200).json("successfully uploaded");

        }).catch((err)=>{
            res.status(500).json("failed to upload the file")

    })
}
    catch(err){
        res.status(500).json({message:"serveror error"})
    }
}

const getHomePageEventSection=async (req,res)=>{
    try{
    const getResult= await HomePageEventSection.find(); 
    console.log(getResult)
    res.status(200).json(getResult)
    }
    catch(err){
        res.status(500).json({message:"server error"})
    }
}
module.exports={postHomePageEventSection,getHomePageEventSection}
