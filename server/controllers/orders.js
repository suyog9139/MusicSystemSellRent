import Payment from '../models/payment.js'
export const GetAllOrders=async(req,res)=>{
    try{

                
    } catch(err){
        res.status(404).json({ message: err.message });
    }
};