const mongoose=require('mongoose');
const ClubRegistrationSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    USNumber:{
        type:String,
        required:true
    },
    MobileNumber:{
        type:String,
        required:true,
    },
    clubName:{
        type:String,
        required:true,
    },
},
{
        timestamps: true
}
)
const ClubRegistration = mongoose.model("ClubRegistration", ClubRegistrationSchema);
module.exports= ClubRegistration;