const express=require('express');
const router=express.Router();
const refreshTokenControler=require('./refreshTokenGen');
router.get('/',refreshTokenControler);
module.exports=router;