const mongoose = require('mongoose');

const Daily = new  mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    listOfItems:{
        type:[
            {
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
            }
            }
        ]
    }

})

module.exports = mongoose.model('Daily',Daily)