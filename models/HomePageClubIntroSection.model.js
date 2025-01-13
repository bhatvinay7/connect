const mongoose=require('mongoose');
const HomePageClubSchema=mongoose.Schema({
    clubName:{
        type:String,
        required:true
    },
    clubInformation:{
        type:String
    },
    clubImg:[ {type:String,required:true}
    ]
},{timestamps:true})

const HomePageClubInto=mongoose.model('homePageClubInto',HomePageClubSchema);
module.exports=HomePageClubInto