const mongoose= require("mongoose");
const clubGoalSchema= mongoose.Schema({
  clubName:{
    type:String
},
 clubGoals:[{
    goalHeading:{
    type:String,
    },
    information:{
      type:String,
    }
 }],
 clubHeading:{
  type:String,
 }

},
{timeStamps:true}
)
const clubGoalSection=mongoose.model("clubGoalSection",clubGoalSchema);
module.exports=clubGoalSection;