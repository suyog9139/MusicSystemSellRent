import mongoose, { Schema } from "mongoose";

const product = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  price: {
    type:Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const paymentSchema = new mongoose.Schema({
  product: [product],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer_id",
    // required: true,
  },
  address:{
    type:String,
    required:true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);
