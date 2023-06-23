import express from 'express'
const router=express.Router()
import {GetAllProducts,ShowCategoryProducts,ShowRentableProduct,ShowPurchaseProduct,AddProduct,DeleteProduct,UpdateProduct} from '../controllers/product.js'


// router.route('/').get(GetAllProducts)
// router.route('/:category').get(ShowCategoryProducts)

router.get("/",GetAllProducts)
router.get("/:category",ShowCategoryProducts)
router.get("/:rent",ShowRentableProduct)
router.get("/:purchase",ShowPurchaseProduct)
router.post("/AddProduct",AddProduct)
router.delete("/DeleteProduct/:productid",DeleteProduct)
router.put("UpdateProduct/:productid",UpdateProduct)
export default router
// module.exports= router