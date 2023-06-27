import express from 'express'
const router=express.Router()
import {GetAllUsers} from '../controllers/User.js'

router.get("/",GetAllUsers)
export default router