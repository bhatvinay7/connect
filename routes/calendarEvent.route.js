const  express=require('express');
const {postEvent,getEventDates,getEventsInfo} = require('../controler/calendarEvent.controler.js');
const router=express.Router();
router.post("/post",postEvent);
router.get("/getAllDates",getEventDates);
router.get("/getEventInfo",getEventsInfo);
module.exports=router;