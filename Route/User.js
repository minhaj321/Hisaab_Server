const express = require('express')

const {Login,BuildProfile,Register,VerifyAccount,ForgetPassword,CheckCode,ResetPassword,EditProfile} = require('./../Controllers/User.js')

    let route = express.Router();

    route.post('/login',Login); //done 1
    route.post('/register',Register); //done 5
    route.post('/buildProfile',BuildProfile); //done 7
    route.post('/verifyAccount',VerifyAccount); //done 6
    route.post('/forgetPassword',ForgetPassword); //done 2
    route.post('/checkCode',CheckCode); //done 3
    route.post('/resetPassword',ResetPassword); //done 4
    route.post('/editProfile',EditProfile); //done
    
    module.exports = route; 