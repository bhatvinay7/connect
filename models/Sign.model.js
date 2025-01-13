const mongoose=require('mongoose');
const SignInSchema=mongoose.Schema({
  emailId:{
  type:String,
  unique: true,
  lowercase:true,
  required:[true,'please enter your email address']

  },
  username:{
    type:String,
  },
  image:{
    type:String,
  },
  password:{
    type:String,

  },
  refreshToken:{
    type:String
  },

  roles:[{type:String}],


},

{timestamps:true}

)
const User=mongoose.model('User',SignInSchema);
module.exports=User;
