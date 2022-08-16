const mongoose = require('mongoose');

const Credit = new  mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Credit',Credit)