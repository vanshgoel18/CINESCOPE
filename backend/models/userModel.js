import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true, 
    },
    
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;