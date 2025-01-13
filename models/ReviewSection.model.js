const mongoose=require('mongoose');
const ReviewSectionSchema=mongoose.Schema({
    img:{
     type:String,
     required:true
    },
   name:{
    type:String,
    required:true
   },
    branch:{
    type:String,
    required:true
   },
   passout:{
    type:String,
    required:true,
   },
   review:{
    type:String,
    required:true,
   },
},
{timestamps:true})
const ReviewSection = mongoose.model("ReviewSection",ReviewSectionSchema);
module.exports=ReviewSection;