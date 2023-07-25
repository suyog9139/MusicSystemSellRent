import express from 'express'
const router=express.Router()

import multer from 'multer';
import {GetAllProducts,ShowCategoryProducts,ShowRentableProduct,ShowPurchaseProduct,AddProduct,DeleteProduct,UpdateProduct} from '../controllers/product.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname;
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage });
  
router.post('/AddProduct', upload.single('Image'), AddProduct);
// router.post('/AddProduct', upload.single('Image'), function(req, res) {
//     // Set the headers
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('Access-Control-Allow-Origin', '*');
  
//     // Send the response
//     res.json({
//       success: true,
//     });
//   });
router.get("/",GetAllProducts)
router.get("/:category",ShowCategoryProducts)
router.get("/:rent",ShowRentableProduct)
router.get("/:purchase",ShowPurchaseProduct)

// router.post("/AddProduct",AddProduct)
router.delete("/DeleteProduct/:productid",DeleteProduct)
router.put("UpdateProduct/:productid",UpdateProduct)
export default router



