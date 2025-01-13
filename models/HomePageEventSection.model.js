const mongoose=require('mongoose')
const HomePageEventSectionSchema=mongoose.Schema({
    shortEventInfo:{
        type:String,
        required:true

    },
    img:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
},
{timestamps:true}

)
const HomePageEventSection= mongoose.model("homePageEventSection",HomePageEventSectionSchema)
module.exports=HomePageEventSection