const express= require("express")
const router=express.Router();
const upload=require('../upload/HomePageEventSection/HomePageEventSection.multer.js')
const {postHomePageEventSection,getHomePageEventSection}=require('../controler/HomePageEventSection.controler.js')
router.post('/homePageEventSection',upload.single("image"),postHomePageEventSection)
router.get('/homePageEventSection',getHomePageEventSection)
module.exports=router
