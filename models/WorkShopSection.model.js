const mongoose=require('mongoose');
const WorkShopSectionSchema=mongoose.Schema({
    workShopName:{
        type:String
    },
    workShopType:{
        type:String
    },
    imgUrl:{
        type:String
    },
    duration:{
        type:String,
        degault:0
    },
    detail:{
        type:String
    },
    mode:{
        type:String
    },
    learners:{
        type:Number,
        default:0
    }

},{
    timestamps:true
})
const WorkShop=mongoose.model('workShop',WorkShopSectionSchema)
module.exports=WorkShop