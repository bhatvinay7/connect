const HomePageClubIntro =require('../models/HomePageClubIntroSection.model.js')
const uploadOnCloudinary=require('../cloudinary.js')
const postHomePageClubInfo=async (req,res)=>{
    try{
    const body=req.body
    const filePath=req.files
    const pathArray = await Promise.all(
        filePath.map(async (file) => {
          const result = await uploadOnCloudinary(file.path);
          return result;
        })
      );
    
    const newDocument = new  HomePageClubIntro({
        clubName:body.clubName,
        clubInformation:body.clubInformation,
        clubImg:pathArray
    })
    newDocument.save()
    .then((document)=>{
        res.status(200).json('uploaded successfully')
    }).catch((err)=>{
        res.status(500).json("failed to upload data")
    }) 
}
   catch(err){
       res.status(500).json('serveror error')
   }    
}    

const getHomePageClubInfo=async (req,res)=>{
          try{
           const currentType=decodeURIComponent(req.query.currentType)
           const result=await HomePageClubIntro.find({clubName:currentType})
           const clubTypes=await HomePageClubIntro.aggregate([
           {
              $group: { _id: "$clubName" }
           },
           {
            $project: {
              _id: 1, 
            }
           }

          ])
           res.status(200).json([result,clubTypes])
          }
          catch(err){
            res.status(500).json("Sever error")
          }

}    

module.exports={postHomePageClubInfo,getHomePageClubInfo}