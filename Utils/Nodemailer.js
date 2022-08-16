const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const smtpTransport = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    auth:{
        user:`${process.env.GMAIL_USER}`,
        pass:`${process.env.GMAIL_PASSWORD}`
    }
})

exports.sendMail = async (mail) =>{

    try {
        let response = await smtpTransport.sendMail(mail)
        return response
    } catch (error) {
        // return error
        console.log(error.message)
    }
   
}


