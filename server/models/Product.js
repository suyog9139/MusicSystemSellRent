import mongoose from 'mongoose';
const ProductSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    isRentable:{
        type:Boolean,
        required:true
    },
    Stock:{
        type:Number,
        required:true
    },
    Rating:{
        type:Number,
        required:true
    },
    Image:{
        type:String
    }
},{timestamp:true});

const Product =mongoose.model("Product",ProductSchema);
export default Product;