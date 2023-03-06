export const GetAllProducts=(req,res)=>{
    res.send("all items")
}

export const ShowCategoryProducts=(req,res)=>{
    res.json({category:req.params.category})
}




// module.exports={
//     GetAllProducts,ShowCategoryProducts
// }