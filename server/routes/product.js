import express from 'express'
const router=express.Router()
import {GetAllProducts,ShowCategoryProducts} from '../controllers/product.js'


// router.route('/').get(GetAllProducts)
// router.route('/:category').get(ShowCategoryProducts)

router.get("/",GetAllProducts)
router.get("/:category",ShowCategoryProducts)
export default router
// module.exports= router