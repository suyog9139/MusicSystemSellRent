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

// module.exports={
//     GetAllProducts,ShowCategoryProducts
// }
export const AddProduct = async (req, res) => {
  // console.log(req.body)
   try {
      const newProduct = new Product({
        Title:req.body.Title,
        Category:req.body.Category,
        Description:req.body.Description,
        Price:req.body.Price,
        Stock:req.body.Stock,
        // Image:req.body.fileName
        Image:{
          data:req.file.filename,
          contentType:'image/png'
        }
      }); // Assuming the product data is sent in the request body
      console.log(newProduct);
      const savedProduct = await newProduct.save();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      // res.status(200).json({
      //   success: true,
      //   //savedProduct
      // });
      // res.status(201).json(savedProduct);
      res.status(201).json(savedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
     }
  };

  export const DeleteProduct = async (req, res) => {
    try {
      const { productid } = req.params; // Assuming the product ID is passed as a URL parameter  
      // Find and delete the product with the given ID
      console.log(productid)
      const deletedProduct = await Product.findByIdAndDelete(productid);  
      // If the product does not exist, return a 404 response
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // If the product was successfully deleted, return a success message
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      // Handle any errors that occur during the deletion process
      return res.status(500).json({ message: error.message });
    }
  };

  export const UpdateProduct = async (req, res) => {
    try {
      const { productId } = req.params; // Assuming the product ID is passed as a URL parameter
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({
        success: true,
       updatedProduct
      });
      
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
