const express =require('express')
const router=express.Router()
const {postReview,getAllReviews }=require('../controler/ReviewSection.controler.js');
const upload=require('../upload/ReviewSection/ReviewSection.multer.js')
router.post('/post',upload.single("images"),postReview);
router.get('/getAllDetail',getAllReviews)
module.exports=router