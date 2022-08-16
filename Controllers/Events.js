const eventSchema  =require('./../Modals/UpcomingEvents')

exports.addEvent  =async(req,res)=>{

    var {userId,name,amount,type,date} = req.body;
try{
    var response = new eventSchema({userId,name,amount,type,date});
    var result  =await response.save();
    if(result){
        res.json({
            status:200,
            message:result
        })
    }else{
        res.json({
            status:206,
            message:'There is an issue in creating this event'
        })
    }

}
catch(err){
    res.json({
        status:500,
        message:err.message
    })

}
}

exports.deleteEvent = async(req,res)=>{

var {eventId} = req.body;
try{

var response = await eventSchema.findByIdAndDelete(eventId);
if(response){

    res.json({
        status:200,
        message:response
    })
}else{
    res.json({
        status:206,
        message:"there is on such event"
    })
}
}
catch(err){
    res.json({
        status:500,
        message:err.message
    })
}
}

exports.readEvent = async(req,res)=>{

    var {userId} = req.body;
try{
    var response = await eventSchema.find({userId});
    res.json({
        status:200,
        message:response
    })
    }
    catch(err){
        res.json({
            status:500,
            message:err.message
        })
    }
    }

exports.editEvent = async(req,res)=>{

    var {id,name,amount,type,date,userId} = req.body;
try{
    var response = await eventSchema.findByIdAndUpdate({id},{userId,name,amount,type,date},{new:true});
    var result  =await eventSchema.find({userId});
    if(result){
        res.json({
            status:200,
            message:result
        })
    }else{
        res.json({
            status:206,
            message:'There is an issue in creating this event'
        })
    }

}
catch(err){
    res.json({
        status:500,
        message:err.message
    })

}
}
    