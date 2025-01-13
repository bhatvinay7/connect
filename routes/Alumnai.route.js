const express = require('express');
const router = express.Router();
const {getalumniInfo,updateAlumnai,postalumanaiInfo}=require('../controler/Alumni.controler.js')
const verifyControlerAuth=require('../verifyControlerAuth.js')
const upload=require('../upload/Alumni/Alumni.multer.js')
router.post('/postalumanaiInfo',verifyControlerAuth,upload.single("image"),postalumanaiInfo);
router.patch('/updateAlumnai',verifyControlerAuth,upload.single("image"),updateAlumnai)
router.get('/getalumniInfo',getalumniInfo)
module.exports = router;
