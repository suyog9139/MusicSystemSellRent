import Product from "../models/Product.js"


export const GetAllProducts=async(req,res)=>{
    try{
        const ProductList= await Product.find({});
        res.status(200).json(ProductList);
    } catch(err){
        res.status(404).json({ message: err.message });
    }
};

export const ShowCategoryProducts=async(req,res)=>{
    try {
        const { category } = req.params;
        const CaterogyList = await Product.findById(category);
        res.status(200).json(CaterogyList);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
};




// module.exports={
//     GetAllProducts,ShowCategoryProducts
// }