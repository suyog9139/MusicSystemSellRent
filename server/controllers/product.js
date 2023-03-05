const GetAllProducts=(req,res)=>{
    res.send("all items")
}

const ShowCategoryProducts=(req,res)=>{
    res.json({category:req.params.category})
}




module.exports={
    GetAllProducts,ShowCategoryProducts
}