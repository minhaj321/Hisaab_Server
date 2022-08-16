const mongoose = require('mongoose');

const Forget = new  mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    code:{
        type:Number,
        required:true
    }


})

module.exports = mongoose.model('Forget',Forget)