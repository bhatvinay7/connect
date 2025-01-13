const mongoose=require('mongoose');
const RegistrationSchema=mongoose.Schema({
    eventType:{
      type:String,
      required:true
    },
    groupName:{
        type:String,
        required:false
    },
       
    participantDetails:[{emailId:{
        type:String,
        lowercase:true,
        required:true
       },
       participantName:{
        type:String,
        required:true
    },
       mobileNumber:{
        type:Number,
        required:true
      },
      usnNum:{
        type:String,
        required:true
      },
      passingYear:{
        type:String,
        trim:true,
      }
    }
      
    ]
    
},
{
  timestamps:true
}
)

const Reg=mongoose.model("registration",RegistrationSchema);
module.exports=Reg;