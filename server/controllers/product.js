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
        const CaterogyList = await Product.findById({category});
        res.status(200).json(CaterogyList);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
};

export const ShowRentableProduct=async(req,res)=>{
    try{
        const {isRentable}=req.params;
        const RentableList=await Product.findById(isRentable==true);
        res.status(200).json({RentableList});
    } catch(err){
        res.status(404).json({ message: err.message });
    }
};

export const ShowPurchaseProduct=async(req,res)=>{
    try{
        const {isRentable}=req.params;
        const PurchaseList=await Product.findById(isRentable==false);
        res.status(200).json({PurchaseList});
    } catch(err){
        res.status(404).json({ message: err.message });
    }
};

export const DeleteProduct =async(req,res)=>{
    try{
        let results=await Product.deleteOne({Name:req.params.Name});
        res.status(200).json(results);
    } catch(err){
        res.status(404).json({ message: err.message });
    }
};

export const AddProduct =async(req,res)=>{
    try{
        let product= new Product(req.body);
        let results= await product.save();
        res.status(200).json(results);
    } catch(err){
        res.status(404).json({ message: err.message });
    }
};

export const UpdateProduct =async(req,res)=>{
    try{
        let results=Product.updateOne(
            {Name:req.params.Name},
            {$set: req.body}
        );
        res.status(200).json(results);
    } catch(err){
        res.status(404).json({ message: err.message });
    }
};
// module.exports={
//     GetAllProducts,ShowCategoryProducts
// }