const monthSchema = require('./../Modals/Monthly');

exports.readMonthly = async(req,res)=>{

    var {userId,firstDate} = req.body;

    try{
    var response = await monthSchema.find({userId,firstDate});
    if(response){
        res.json({
            stauts:200,
            message:response
        })
    }else{
        res.json({
            stauts:206,
            message:'There is an error in fetching data.'
        })
    }

    }catch(err){
        res.json({
            stauts:500,
            message:err.message
        })
    }

}

exports.addItem = async (req,res)=>{

    try{
        var {userId,lastDate,name,type,amount,firstDate} = req.body;
        var endOfMonth = 2
        var item = {name,type,amount}
        // find of exist
        var findFirst = await monthSchema.findOne({userId,firstDate})
if(findFirst){
    var result = await monthSchema.findOneAndUpdate({userId,firstDate},
        {$push:{listOfItems:item}},{new:true} );
}else{
    var response = new monthSchema({userId,firstDate,lastDate});
    response.listOfItems.push({name,type,amount});
    var result = await response.save();
}
if(result){

        res.json({
            status:200,
            message:result
        })
    }else{
        res.json({
            status:206,
            message:'There is an error in this entry'
        })
    }

    }catch(err){
        res.json({
            status:500,
            message:err.message
        })
    }

}

exports.deleteItem = async(req,res)=>{

 try{
    var {itemId,id} = req.body;

    var response = await monthSchema.findOneAndUpdate({id}
        ,{$pull:{listOfItems:{_id:itemId}}}
        ,{new:true})
        if(response){
            res.json({
                status:200,
                message:response
            })
        }else{
            res.json({
                status:206,
                message:'There is no such entry to delete.'
            })
        }

}catch(err){
        res.json({
            status:500,
            message:err.message
        })
    }
}

exports.editItem = async(req,res)=>{
    
var {id,amount,itemId,name,type} = req.body;
try{
    var item = {name,amount,type};
    var response = await monthSchema.findOneAndUpdate({id},{$pull:{listOfItems:{_id:itemId}}},{new:true})
    var result = await monthSchema.findOneAndUpdate({id},{$push:{listOfItems:item}},{new:true});

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