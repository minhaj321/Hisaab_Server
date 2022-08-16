const mongoose = require('mongoose');

const Monthly = new  mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    firstDate:{
        type:String,
        required:true
    },
    lastDate:{
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

module.exports = mongoose.model('Monthly',Monthly)