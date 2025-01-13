const WorkShop=require('../models/WorkShopSection.model.js')
const { ObjectId } = require('mongodb'); // Import ObjectId
const uploadOnCloudinary =require('../cloudinary.js')
const postWorkShopSection=async (req,res)=>{
    try{
    const body=req.body
    const filePath=req.file
    const pathUrl=await uploadOnCloudinary(filePath.path)
    const document=new  WorkShop({
        workShopName:body.workShopName,
        workShopType:body.workShopType,
        imgUrl:pathUrl,
        duration:body.duration,
        detail:body.detail,
        mode:body.mode,
        learners:body.learners,
    
    })    
    document.save().then((newDocument)=>{
          res.status(200).json("uploaded Successfully")
    }).catch((err)=>{
        res.status(500).json("server error, try again")
    })
    }
    catch(err){
        res.status(500).json("server error, pleasentry again")
    }
}
const getWorkShopSection=async (req,res)=>{
    try{
    const workShopType=decodeURIComponent(req.query.workShopType)
    console.log(workShopType)
    const result = await WorkShop.find({ workShopType:workShopType})
    const workShopTypes= await  WorkShop.aggregate([
        {
        $group:{ _id:"$workShopType"}, 
        },
        {
        $project:{
            _id:1,
            }
        },
    ]) 

    res.status(200).json([result,workShopTypes])   
    }
    catch(err){
        res.status(500).json("server error")
    }
}

const getWorkShopDetail=async (req,res)=>{
    try{
    const workShopId=decodeURIComponent(req.query.workShopId)
    console.log(workShopId)
    // Decode and convert the id to ObjectId
   
    const objectId = new ObjectId(workShopId);
    const result = await WorkShop.aggregate([
        {
          $match:{ _id:objectId},
        },
        { $project:{
            detail:1,
        }     
        },
    ])
    console.log(result)
    res.status(200).json(result);
}
catch(err){
    res.status(500).json("server error");
}   
}

module.exports={postWorkShopSection,getWorkShopSection,getWorkShopDetail}