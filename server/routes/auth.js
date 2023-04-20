import express from 'express';
import {login, logout, register} from "../controllers/auth.js"
import bodyParser from 'body-parser';
import { verify } from 'crypto';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
// router.post("/verify", verify);
// router.post("/forget-password", forget_password);
// router.post("/reset-password/:token", reset_password);
router.post("/logout", logout);







export default router
