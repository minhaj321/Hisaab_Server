const dailySchema = require('./../Modals/Daily')
;
exports.AddDaily = async (req,res) =>{

var {userId,date,name,type,amount} = req.body;

var item = {name,amount,type};
try{
    var findFirst = await dailySchema.findOne({userId,date});
    if(findFirst){
var result = await dailySchema.findOneAndUpdate({userId,date},{$push:{listOfItems:item}},{new:true});


}
    else{

var responseDaily = new dailySchema({userId:userId,date:date});
responseDaily.listOfItems.push(item);
var result =await responseDaily.save();

}
if(result){
    res.json({
        status:200,
        message:result
    })
    }
    else{
        res.json({
            status:206,
            message:'There is an error with this entry'
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

exports.DeleteDaily = async(req,res)=>{

    try{
    var {id,itemId} = req.body;
    var response = await dailySchema.findOneAndUpdate({id},{$pull:{listOfItems:{_id:itemId}}},{new:true})

if(response){
    res.json({
        status:200,
        message:response
    })
    }
    else{
        res.json({
            status:206,
            message:'There is an error with this entry'
        })
        
    }

}
catch(err){
    res.json({
        status:500,
        message:err.message
    })
    console.log('msg=>',err.message)
}


}

exports.EditDaily = async (req,res)=>{

var {id,amount,itemId,name,type} = req.body;
try{
    var item = {name,amount,type};
    var response = await dailySchema.findOneAndUpdate({id},{$pull:{listOfItems:{_id:itemId}}},{new:true})
    var result = await dailySchema.findOneAndUpdate({id},{$push:{listOfItems:item}},{new:true});

    // var response = await dailySchema.findOne({'listOfItems.id':id})
    if(result){
        res.json({
            status:200,
            message:result
        })
    }else{
        res.json({
            status:206,
            message:'There is an error in updating value of this title'
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

exports.readDaily = async(req,res)=>{

var {id} = req.body;

try{

    var response = await dailySchema.findOne({id})
    if(response){
        res.json({
            status:200,
            message:response
        })        
    }else{
        res.json({
            status:206,
            message:'There is an error in fetching'
        })
    }


}catch(err){
    res.json({
        status:500,
        message:err.message
    })
}

}