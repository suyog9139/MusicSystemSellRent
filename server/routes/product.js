const express=require('express')
const router=express.Router()
const {GetAllProducts,ShowCategoryProducts,GetOneOrder}=require('../controllers/product')


router.route('/').get(GetAllProducts)
router.route('/:category').get(ShowCategoryProducts)

module.exports= router