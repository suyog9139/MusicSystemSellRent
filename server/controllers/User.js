import User from "../models/User.js"
export const GetAllUsers=async(req,res)=>{
    try{
        const UserList= await User.find({});
        res.status(200).json(UserList);
    } catch(err){
        res.status(404).json({ message: err.message });
    }
};