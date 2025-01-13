const  express=require('express');
const {postWorkShopSection,getWorkShopSection,getWorkShopDetail} = require('../controler/WorkShopSection.controler.js');
 const upload=require('../upload/WorkShopSection/WorkShopSection.multer.js');
const router=express.Router();
router.post("/WorkShopSection",upload.single("images"),postWorkShopSection);
router.post("/getWorkShopSection",getWorkShopSection);
router.post("/getWorkShopDetail",getWorkShopDetail);
module.exports=router;