const express=require('express')
const router=express.Router()
const {GetOneOrder}=require('../controllers/orders')

router.route('/:id').get(GetOneOrder)

module.exports=router