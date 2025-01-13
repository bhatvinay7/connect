const  express=require('express');
const postFeedBack = require('../controler/eventFeedBack.controler.js');
const router=express.Router();
router.post("/postEventFeedBack",postFeedBack );
module.exports=router;