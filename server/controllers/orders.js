import order from "../models/Order.js"
export const GetOneOrder=async(req,res)=>{
    try {
        const { id } = req.params;
        const OrderWithId = await order.findById(id);
        res.status(200).json(OrderWithId);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
};

// module.exports={GetOneOrder}