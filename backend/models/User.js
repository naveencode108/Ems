import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    role:{
        type:String,
        enum:['admin','employee'],
    }
},{timestamps:true});

export default mongoose.model('User',userSchema)