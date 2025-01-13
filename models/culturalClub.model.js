const mongoose= require("mongoose");
const CulturalClubSchema= mongoose.Schema({
eventName:{
    type:String,
    required:true
},
mainImg:{
    type:String,
    required:true
},
img: [{
    type: String
}],
headLine1:{
    type:String,
    default:""
},
headLine2:{
    type:String,
    default:""
},
date:{
    type: Date,
    default:Date.now
}
},
{timeStamps:true}
)
const CulturalClub=mongoose.model("CulturalClub",CulturalClubSchema);
module.exports=CulturalClub;