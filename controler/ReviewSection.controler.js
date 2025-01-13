const ReviewSection=require('../models/ReviewSection.model')
const uploadOnCloudinary=require('../cloudinary.js')
const postReview=async (req,res)=>{
    try{
    const body=req.body;
    const filepath=req.file;
   const url=await uploadOnCloudinary(filepath.path)
    const document= new ReviewSection({
         img:url,
         name:body.name,
         branch:body.branch,
         passout:body.passout,
         review:body.review,
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

const getAllReviews=async (req,res)=>{
    try{
    const result= await ReviewSection.find()
    res.status(200).json(result);
    }
    catch(err){
        res.status(500).json("Internal server error")
    }
}
module.exports={getAllReviews,postReview}