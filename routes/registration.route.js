const express = require('express');
const router = express.Router();
const { postParticipantsDetails, getParticipantsDetails } = require('../controler/Registration.controler.js');
const verifyControlerAuth=require('../verifyControlerAuth.js')
const sendMail =require('../controler/sendMail.controler.js')
router.post('/register', postParticipantsDetails);
router.get('/sendMail', sendMail);
router.get('/registrationinfo',verifyControlerAuth,getParticipantsDetails);
module.exports = router;
