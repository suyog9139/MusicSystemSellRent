import mongoose, { Schema } from "mongoose";

const product = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product_id",
  },
  price: {
    type:Number,
  },
  quantity: {
    type: Number,
    // required: true,
  },
});

const paymentSchema = new mongoose.Schema({
  product: [[product]],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer_id",
    // required: true,
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
