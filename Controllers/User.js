const userSchema = require('./../Modals/User');
const profileSchema = require('./../Modals/Profile');
const verifySchema = require('./../Modals/Verify');
const bcrypt = require('bcrypt');
const {sendMail} = require('./../Utils/Nodemailer.js');
const ForgetPassword = require('./../Modals/ForgetPassword');

exports.Login = async(req,res)=>{
    const {email,password} = req.body;

    // check for user existance
    try{

    var emailCheck = await userSchema.findOne({email:email})
    if(!emailCheck){
        res.json({
            status: 404,
            message: "User not found"
        })
    }else{
        //check for correct password
        const result = await bcrypt.compare(password, emailCheck.password)
        // if password correct
        if(result){
            // check for verification
            if(emailCheck.verified){

                var profile = await profileSchema.findOne({userId:emailCheck._id});
                if(profile){
                    res.json({
                        status:200,
                        message:{
                            profile:profile,
                            fName:emailCheck.fname,
                            lName:emailCheck.lname,
                            email:emailCheck.email,
                        }
                    })
                }else{
                    res.json({
                        status: 403,
                        message: "There is no profile with this email"
                    }) 
                }}else{
                    res.json({
                        status: 401,
                        message: "Email is not verified"
                    })                
                }

            }else{
                res.json({
                    status: 402,
                    message: "Incorrect password"
                })
            }

        }
    }
    catch(err){
        res.json({
            status:500,
            message:err.message
        })
    }
}


exports.Register = async(req,res)=>{
    
    var {lname,fname,password,email} = req.body;

    var checkEmail = await userSchema.findOne({email:email})
    if(checkEmail){
        res.json({
            status:201,
            message:'This email address is already in use'
        })
    }else{
        var salt =  await bcrypt.genSalt(10)
        bcrypt.hash(password,salt,async function(err,hash){
            password=hash;


            try{
                var createUser = new userSchema({fname,lname,password,email})
                var response = createUser.save()

                const emailCode = Math.floor(Math.random() * 9000);
                var saveEmailCode = new verifySchema({email:email,code:emailCode})
                var response =await saveEmailCode.save();            
                const mail = {
                    to: email,
                    from: `${process.env.GMAIL_USER}`,
                    text: `Your account verification code for shipIt account is ${response.code}`
                }
                let resMail = await sendMail(mail);
                console.log('yes==',resMail)
                if(resMail){
                    res.json({
                        status:200,
                        message:response
                    })
                }
                else{
                    res.json({
                        status:206,
                        message:'There is an issue with email sending'
                    })    
                }
            }catch(err){
                res.json({
                    status:500,
                    message:err.message
                })  
            }
        });

    }
}


exports.BuildProfile = async(req,res)=>{
    
    var  { gender,salary,startingOfMonth,dateOfSalary,profilePic,dob,userId }= req.body;

    try{
        var profile = new profileSchema({gender,salary,startingOfMonth,dateOfSalary,profilePic,dob,userId});
        var response =await profile.save()
        if(response){
            res.json({
                status:200,
                message:profile
            })
        }else{
            res.json({
                status:204,
                message:'Please fill complete form'
            })
    
        }
    }catch(err){
        res.json({
            status:500,
            message:err.message
        })
    }

}


exports.VerifyAccount = async(req,res)=>{
    
    var {code,email} = req.body;
    try{
        var check  = await verifySchema.findOne({email:email,code:code});
        if(check){
            var updateUser = await userSchema.findOneAndUpdate({email:email},{verified:true},{new:true})
            res.json({
                status:200,
                message:updateUser
            })
        }else{
            res.json({
                status:201,
                message:'Code is not correct'
            })
        }
    }catch(err){
        res.json({
            status:500,
            message:err.message
        })
    }

}


exports.ForgetPassword = async(req,res)=>{

    var {email} = req.body;
    try{
        
    const emailCode = Math.floor(Math.random() * 9000);

    var saveEmailCode = new ForgetPassword({email:email,code:emailCode})
    var response =await saveEmailCode.save();
    const mail = {
        to: email,
        from: `${process.env.GMAIL_USER}`,
        text: `Your forget password code for shipIt account is ${response.code}`
    }
    let resMail = await sendMail(mail);
    console.log('yes==',resMail)
    if(resMail){
        res.json({
            status:200,
            message:response
        })
    }
    else{
        res.json({
            status:206,
            message:'There is an issue with email sending'
        })    
    }
    }catch(err){
        res.json({
            status:500,
            message:err.message
        })
    }
    
}


exports.CheckCode = async(req,res)=>{
    var {code,email} = req.body;
    try{
        var check  = await ForgetPassword.findOne({email:email,code:code});
        if(check){
            res.json({
                status:200,
                message:check
            })
        }else{
            res.json({
                status:201,
                message:'Code is not correct'
            })
        }
    }catch(err){
        res.json({
            status:500,
            message:err.message
        })
    }    
}

exports.ResetPassword = async(req,res)=>{
    
    var {email,password} = req.body;
try{

    var salt = await bcrypt.genSalt(10)
    bcrypt.hash(password,salt,async function(err,hash){
        var response = await userSchema.findOneAndUpdate({email:email},{password:hash},{new:true})
        res.json({
            status:200,
            message:'Password is changed'
        })
    })
}
catch(err){
    res.json({
        status:500,
        message:err.message
    })

}

}

exports.EditProfile = async(req,res)=>{
    
    try{
    var {fname,lname,gender,salary,startingOfMonth,dateOfSalary,profilePic,dob,userId} = req.body;

    var responseUser = await userSchema.findByIdAndUpdate(userId,{lname,fname},{new:true});

    var responseProfile = await profileSchema.findOneAndUpdate({userId,userId},{gender,salary,startingOfMonth,dateOfSalary,profilePic,dob},{new:true})
    if(responseProfile && responseUser){
        res.json({
            status:200,
            message:{
                responseUser,
                responseProfile
            }
        })
    }else{
        res.json({
            status:206,
            message:
                'There is an issue in editting your profile'
        })
    }

}catch(err){
    res.json({
        status:500,
        message:err.message
    })
}
}