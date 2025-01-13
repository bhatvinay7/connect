const mongoose =require('mongoose')
const calendarEventSchema=mongoose.Schema({
      clubName:{
        type:String,
        required:true,
      },
      eventTitle:{
        type:String,
        required:true,

      },
      venue:{
        type:String,
        required:true,

      },
      time:{
        type:String,
        required:true,

      },
      date:{
        type:Date,
        required:true
      },
      description:{
        type:String,
        required:true,
      }
      

},{
    timestamps:{
        required:true
    }

})
const calendarEvent=mongoose.model("calendarEvent",calendarEventSchema);
module.exports=calendarEvent;