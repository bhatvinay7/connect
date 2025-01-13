const express = require('express');
const router = express.Router();
const { getSignin, login,upDateUser } = require('../controler/Signin.controler.js');
const googleLogin=require('../controler/googleLogin.controler.js')
router.post('/signin', getSignin);
router.post('/login', login);
router.patch('/updateUser',upDateUser)
router.get('/googleLogin',googleLogin)
module.exports = router;
