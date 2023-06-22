import express from 'express'
const router=express.Router()
import {GetAllProducts,ShowCategoryProducts,ShowRentableProduct,ShowPurchaseProduct} from '../controllers/product.js'

router.get("/",GetAllProducts)
router.get("/:category",ShowCategoryProducts)
router.get("/:rent",ShowRentableProduct)
router.get("/:purchase",ShowPurchaseProduct)

export default router