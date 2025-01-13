const mongoose= require("mongoose");
const TechHubSchema= mongoose.Schema({
clubName:{
    type:String
},    
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
},
venue:{
    type:String,
},
category:{
    type:String
},
},
{timestamps:true}
)
const TechHub=mongoose.model("techHub",TechHubSchema);
module.exports=TechHub;