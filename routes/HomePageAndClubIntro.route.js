const express =require('express')
const router=express.Router()
const {postHomePageAndClubIntro,getHomePageAndClubIntro }=require('../controler/HomePageAndClubIntro.controler.js');
const upload=require('../upload/HomePageAndClubIntroSection/HomePageAndClubIntroSection.multer.js')
router.post('/HomePageAndClubIntro',upload.array("images"),postHomePageAndClubIntro);
router.get('/HomePageAndClubIntro',getHomePageAndClubIntro)
module.exports=router