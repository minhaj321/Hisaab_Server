const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const Connection = async ()=>{
    try{

        var conn = await mongoose.connect(`${process.env.LOCAL_DATABASE}`,{
            useNewUrlParser : true,
            useUnifiedTopology:true
        })
        console.log('connection done.')
    }catch(err){
        console.log('connection error=>',err.message)
    }
    
}

module.exports =Connection;