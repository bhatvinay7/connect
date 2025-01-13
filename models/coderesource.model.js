const mongoose=require('mongoose');
const codeResourceSchema=mongoose.Schema({

  name:{
    type:String,
    required:true
  },
  img:{
    data:Buffer,
    contentType:String
},
    language:{
        type:String,
        required:true
    },
    vote:{
        type:Number,
        default:0
    },
    resource:{
      type:[String],
      required:true
    }
},{timestamps:true
      
})
const cResource=mongoose.model("cresource",codeResourceSchema);
module.exports=cResource;