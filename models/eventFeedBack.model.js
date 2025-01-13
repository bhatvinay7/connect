const mongoose=require('mongoose');
const eventFeedBackSchema=mongoose.Schema({
          eventName:{
            type:String,
            required:true,
          },
          userEmailId:{
            type:String,
            required:true,
          },
          textContent:{
            type:String,
            required:true,
          }
},{
    timestamps:true,
})

const eventFeedBack=mongoose.model('eventFeedBackInformation',eventFeedBackSchema)
module.exports=eventFeedBack