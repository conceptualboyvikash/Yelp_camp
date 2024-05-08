const express=require('express');
const router=express.Router();
const User=require('../models/user');
const Expasync=require('../utility/Expasync');
const passport = require('passport');
const {storeReturnTo}=require('../middlewarelogin')
const userLogic=require('../controllers/user');


router.route('/register')
    .get(userLogic.registerFrom)
    .post(Expasync(userLogic.createNewUser));

router.route('/login')
    .get(userLogic.renderLogicPage)
    .post(storeReturnTo,passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),userLogic.successfulLogin);

router.get('/logout',userLogic.successfulLogout);


module.exports=router;