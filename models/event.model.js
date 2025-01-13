const mongoose=require('mongoose');
const EventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required:true
    },
    headLine1:{
        type: String,
        default:""
    },
    headLine2:{
        type: String, 
        default:""
    },
    coordinators:[
        {type:String}
    ],
    eventType: {
        type: String,
        required:true,
        default:""
    },
    organiser: {
        type: String,
        default:""
    },
    place:{
        type: String,
        default:""
    },

    date:{
        type:Date,
        default:Date.now
    },
    upCommingEvent:{
        type:String,
        default:false,
    },
    isVisible:{
        type:String,
        default:true,
    }

},
    {
        timestamps: true

    }
)
EventSchema.index({ date: 1 });
const Events = mongoose.model("event", EventSchema);
module.exports= Events;