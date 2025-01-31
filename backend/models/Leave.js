import mongoose from "mongoose";

const leaveSchema=mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    reason:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['pending','rejected','approved'],
        default:'pending'
    }
},{timestamps:true});

export default mongoose.model('Leave',leaveSchema);