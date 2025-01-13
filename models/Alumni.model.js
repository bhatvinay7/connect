const mongoose=require('mongoose');
const AlumniSchema=mongoose.Schema({  
  name:{
    type:String,
  },
  image:{
    type:String,
  },
  jobrole:{
    type:String,

  },
   batch:{
    type:String
  },
  branch:{
    type:String,
  },
  link:{
    type:String
  }

  },
{timestamps:true}

)
const Alumni=mongoose.model('Alumni',AlumniSchema);
module.exports=Alumni;
