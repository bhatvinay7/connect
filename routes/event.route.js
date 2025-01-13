const express = require('express');
const { getEvents, getEvent, postEvent, updateEvent, deleteEvent ,getType,getFilterEventInformation,getSearchResults,getMetaEventDetail,updateEventStatus,getNextEvents } = require('../controler/event.controler.js');
const  upload  = require('../upload/eventImage/eventImage.multer.js');
const router = express.Router();
const verifyControlerAuth=require('../verifyControlerAuth.js')
router.get('/', getEvents);
router.get('/:id', getEvent);
router.get('/getNextEvents',getNextEvents)
router.post('/card',getMetaEventDetail);
router.post('/filterslidebar',getFilterEventInformation);
router.post('/filter', getType);
router.post('/search',getSearchResults);
router.post('/', upload.single("Image"),verifyControlerAuth, postEvent);
router.patch('/updateEventStatus',verifyControlerAuth,updateEventStatus)
router.patch('/updateEvent',verifyControlerAuth,upload.single("Image"),updateEvent)
router.delete('/:id',verifyControlerAuth, deleteEvent);
// router.post('/post',upload.single("Image"),verifyControlerAuth,testApi)
//router.get('/', getEvents);

module.exports = router;
