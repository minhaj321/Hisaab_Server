const mongoose = require('mongoose');

const Verify = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    code:{
        type:Number,
        required:true
    }


})

module.exports = mongoose.model('Verify',Verify)
