const express=require('express');
const router=express.Router();
const logoutcontroler=require('./controler/Logout.controler.js');
router.get('/logout',logoutcontroler);
module.exports=router;