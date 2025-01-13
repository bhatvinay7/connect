const express =require('express')
const router=express.Router()
const {postHomePageClubInfo,getHomePageClubInfo }=require('../controler/HomePageClubIntroSection.controler.js');
const upload=require('../upload/ClubIntroSection/ClubIntroSection.multer.js')
router.post('/HomePageClubInfoSection',upload.array("images"),postHomePageClubInfo);
router.get('/HomePageClubInfoSection',getHomePageClubInfo)
module.exports=router