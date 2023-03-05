const GetOneOrder=(req,res)=>{
    res.json({id:req.params.id})
}

module.exports={GetOneOrder}