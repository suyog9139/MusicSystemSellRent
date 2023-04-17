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
import product from "./routes/product.js";
import orders from "./routes/orders.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());

/* FOR IMAGE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

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
app.get("/hello", (req, res) => {
  res.send("Products");
});

app.use("/api/v1/product", product);
app.use("/api/v1/orders", orders);
