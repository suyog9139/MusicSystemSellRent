import mongoose from 'mongoose';
const ProductSchema= new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:false
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Stock:{
        type:Number,
        required:true
    },
    Image:{
        data:Buffer,
        contentType: String
        
    }
},{timestamp:true});

export const Product =mongoose.model("Product",ProductSchema);
export default Product;