import mongoose from 'mongoose';

const salarySchema=mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    basicSalary:{
        type:Number,
        required:true,
    },
    allowance:{
         type:Number
    },
    deduction:{
        type:Number
    },
    netSalary:{
        type:Number
    },
    payDate:{
        type:Date
    }
},{timestamps:true});

export default mongoose.model('Salary',salarySchema);