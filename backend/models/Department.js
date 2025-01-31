import mongoose from "mongoose";

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  { timestamps: true }
);


export default mongoose.model('Department',departmentSchema);