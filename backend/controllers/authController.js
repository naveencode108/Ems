import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Department from '../models/Department.js'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: "All field required" });

    let user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    let comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass)
      return res.status(401).json({ success: false, message: "Invalid email or password" });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role:user.role
      },
      token
    });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};


export const dashboardOverview=async(req,res)=>{
  try {
    
    let totalEmployee=await Employee.countDocuments();
    let totalDepartment=await Department.countDocuments();

    let totalSalary=await Employee.aggregate([
      {$group:{_id:null,totalSalary:{$sum:'$salary'}}}
    ])

    return res.status(200).json({success:true,data:{
      totalEmployee,
      totalDepartment,
      totalSalary:totalSalary[0]
    }});

  } catch (er) {
     return res.status(500).json({success:false,message:er.message});
  }
}