import express from 'express'
const router=express.Router()
// const {GetOneOrder}=require('../controllers/orders')
import {GetOneOrder} from '../controllers/orders.js'
// router.route('/:id').get(GetOneOrder)
router.get('/:id',GetOneOrder)
export default router