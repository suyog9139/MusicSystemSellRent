import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/payment.js";
import dotenv from "dotenv";
dotenv.config();

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res) => {
  // console.log(req.body);
  // res.status(200).json({success:true});
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  // console.log(process.env.RAZORPAY_API_SECRET)
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  // console.log(body)

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};