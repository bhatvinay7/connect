const mongoose =require('mongoose')
const HomePageAndClubIntroSchema=mongoose.Schema({
      headLine:{
        type:String,

      },
      webPageInfo:{
        type:String
      },
      tagLine:{
        type:String
      },
      img: [{
        type: String
    }],

},{
    timeStamps:{
        required:true
    }

})
const HomePageAndClubIntro=mongoose.model("homePageAndClubIntro",HomePageAndClubIntroSchema);
module.exports=HomePageAndClubIntro;