const mongoose=require('mongoose');
const AchievementAndAwardSchema=mongoose.Schema({
    img:{
     type:String
    },
   headLine1:{
    type:String,
   },
   mainContent:{
    type:String
   },
},{timestamps:true})

const AchievementAndAwardSection = mongoose.model("AchievementAndAwardSection",AchievementAndAwardSchema);
module.exports=AchievementAndAwardSection;