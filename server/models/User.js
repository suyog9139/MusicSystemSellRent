import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:2,
        max:20,
    },
    phone:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min:5,
    },
    isSuperuser:{
        type: Boolean,
        default: false
    },
    
    

    
},{timestamp:true});


const User = mongoose.model("User", UserSchema);

export default User;