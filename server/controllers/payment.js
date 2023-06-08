import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/payment.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
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
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    customer_id,
    product,
  } = req.body;
  // console.log(process.env.RAZORPAY_API_SECRET)
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  // // console.log(body)

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here
    try {
      const productDocuments = product.map((product) => ({
        description:product[0],
        price: product[1],
        quantity:product[2],
      }));
      // console.log(customer_id)
      // Create a payment document with the product array and customer ID
      // for(let i=0; i<product.length;i++){
      //   console.log(product[i][0]+" "+product[i][1]+" "+product[i][2]);
      // }
      

      const payment = await Payment.create({
        product: productDocuments,
        customer: customer_id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.status(200).json({
        success: true,
        payment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Error creating payment",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "Invalid signature",
    });
  }
};

// export const GetAllProducts=async(req,res)=>{
//   const razorpay_payment_id = req.body
//   try{
//       const PaymentList= await Payment.find();
//       res.status(200).json(PaymentList);
//   } catch(err){
//       res.status(404).json({ message: err.message });
//   }
// };


// import { Payment } from "../models/payment.js";
import { User } from "../models/User.js";
// import { Product } from "../models/product.js";
import { Product } from "../models/Product.js";


export const GetPaymentDetails = async (req, res) => {
  const { razorpay_payment_id } = req.body;

  console.log(razorpay_payment_id)
  try {
    const payment = await Payment.findOne({razorpay_payment_id:razorpay_payment_id});

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const customerId = payment.customer;
    console.log(customerId)
    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // const productIds = payment.product.map((item) => item.product_id);
    // const products = await Product.find({ _id: { $in: productIds } });

    // const productDetails = products.map((product) => {
    //   const paymentProduct = payment.product.find(
    //     (item) => item.product_id.toString() === product._id.toString()
    //   );
    //   return {
    //     name: product.name,
    //     price: product.price,
    //     quantity: paymentProduct.quantity,
    //   };
    // });

    // const totalAmount = productDetails.reduce(
    //   (acc, product) => acc + product.price * product.quantity,
    //   0
    // );

    const paymentDetails = {
      customer: {
        name: customer.name,
        phone: customer.phone,
      },
      payment:{
        products:payment.product,
        order_id:payment.razorpay_order_id
      }
    };

    res.status(200).json(paymentDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

