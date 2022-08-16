const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
    gender:{
        type:String,
        required:true
    },
    startingOfMonth:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    dateOfSalary:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    userId:{
        type:String
    }

})

module.exports = mongoose.model('Profile',Profile)
