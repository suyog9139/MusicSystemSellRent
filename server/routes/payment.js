import express from "express";
import {
  checkout,
  paymentVerification,
  GetPaymentDetails,
} from "../controllers/payment.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);
router.route("/paymentdetails").post(GetPaymentDetails);




export default router;