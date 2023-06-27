import express from 'express'
const router=express.Router()

import multer from 'multer';
import {GetAllProducts,ShowCategoryProducts,ShowRentableProduct,ShowPurchaseProduct,AddProduct,DeleteProduct,UpdateProduct} from '../controllers/product.js'

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       const fileName =file.originalname;
//       cb(null, fileName);
//     },
//   });
//   const upload = multer({ storage });
const upload = multer({ dest: 'Uploads/' });
// router.route('/').get(GetAllProducts)
// router.route('/:category').get(ShowCategoryProducts)
router.post('/AddProduct', upload.single('Image'), AddProduct);
router.get("/",GetAllProducts)
router.get("/:category",ShowCategoryProducts)
router.get("/:rent",ShowRentableProduct)
router.get("/:purchase",ShowPurchaseProduct)

// router.post("/AddProduct",AddProduct)
router.delete("/DeleteProduct/:productid",DeleteProduct)
router.put("UpdateProduct/:productid",UpdateProduct)
export default router



