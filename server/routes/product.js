import express from 'express'
const router=express.Router()
import {UpdateProduct,AddProduct,GetAllProducts,ShowCategoryProducts,ShowRentableProduct,ShowPurchaseProduct,DeleteProduct} from '../controllers/product.js'


// router.route('/').get(GetAllProducts)
// router.route('/:category').get(ShowCategoryProducts)

router.get("/",GetAllProducts)
router.delete("/:Name",DeleteProduct)
router.post("/add-product",AddProduct)
router.put("/:Name",UpdateProduct)
// router.get("/:category",ShowCategoryProducts)
// router.get("/:rent",ShowRentableProduct)
// router.get("/:purchase",ShowPurchaseProduct)

export default router
// module.exports= router