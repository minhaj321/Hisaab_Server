const mongoose = require('mongoose');

const Event = new  mongoose.Schema({
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
    type:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }

})

module.exports = mongoose.model('Event',Event)