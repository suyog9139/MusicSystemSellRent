import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:2,
        max:20,
    },
    email:{
        type: String,
        max:50,
        unique: true,
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    password:{
        type: String,
        required: true,
        min:5,
    },
    isSuperuser:{
        type: Boolean,
        default: true
    },
    verificationCode: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    
},{timestamp:true});


const User = mongoose.model("User", UserSchema);

export default User;