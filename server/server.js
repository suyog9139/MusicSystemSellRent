import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";

import authRoutes from "./routes/auth.js";
import product from './routes/product.js'
import orders from './routes/orders.js'
import payment from './routes/payment.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
/* FOR IMAGE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


const upload = multer({ storage });
/* Routes */
app.use("/auth", authRoutes);


/*Mongoose setup*/
const PORT = process.env.PORT || 3005;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: `Music_System`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

//routes

app.get('/hello',(req,res)=>{
    res.send("Products")
})
app.use('/api/v1/product',product)
app.use('/api/v1/orders',orders)
app.use('/api/v1/auth',authRoutes)
// app.use('/api/v1/payment',payment)
app.use("/api", payment);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);



import crypto from 'crypto';
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log(jwtSecret)


// Razorpay
import Razorpay from 'razorpay';
// import payments from "razorpay/dist/types/payments.js";

export const instance =new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET
});
