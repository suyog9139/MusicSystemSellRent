import mongoose from 'mongoose'
const OrderSchema= new mongoose.Schema({
    Customer_id:{
        type:Number,
        required:true
    },
    Product_id:{
        type:Number,
        required:true
    },
    Rental:{
        type:Boolean,
        required:true
    },
    Purchase:{
        type:Boolean,
        required:true
    },
    Order_date:{
        type:Date,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Review_id:{
        type:Number,
        required:true
    },
    Rental_period:{
        type:Number,

    }
},{timestamp:true})

const Order=mongoose.model("Order",OrderSchema);
export default Order;