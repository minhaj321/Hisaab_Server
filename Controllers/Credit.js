const creditSchema  =require('./../Modals/ExtraCredit')

exports.addCredit  =async(req,res)=>{

    var {userId,name,amount,date} = req.body;
try{
    var response = new creditSchema({userId,name,amount,date});
    var result  = await response.save();

    res.json({
        status:200,
        message:result
    })
}
catch(err){
    res.json({
        status:500,
        message:err.message
    })

}
}

exports.deleteCredit = async(req,res)=>{

var {eventId} = req.body;
try{

var response = await creditSchema.findByIdAndDelete(eventId);
if(response){
    res.json({
        status:200,
        message:response
    })
}
else{
    res.json({
        status:206,
        message:'There is no such credit'
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

exports.readCredit = async(req,res)=>{

    var {userId} = req.body;
try{
    var response = await creditSchema.find({userId});
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
    
exports.editCredit = async(req,res)=>{
    
    var {userId,name,amount,date,id} = req.body;
    try{
        var response = await creditSchema.findByIdAndUpdate({id},{userId,name,amount,date});
        var result  = await creditSchema.find({userId});
    if(result){
        res.json({
            status:200,
            message:result
        })
    }else{
        res.json({
            status:206,
            message:'There is no credit entry.'
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