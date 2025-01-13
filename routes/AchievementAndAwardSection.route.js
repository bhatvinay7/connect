const  express=require('express');
const {postAchievement,getAllDocuments} = require('../controler/AchievementAndAwardSection.controler.js');
const upload=require('../upload/AchievementAndAwardSection/AchievementAndAwardSection.multer.js');
const router=express.Router();
router.post("/post",upload.single("images"),postAchievement);
router.get("/getAlldetail",getAllDocuments);
module.exports=router;
