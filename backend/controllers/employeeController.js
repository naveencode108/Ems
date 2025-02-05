import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getEmployeeByUserId = async (req, res) => {
  try {
    let { userId } = req.body;

    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "Id is not provided" });

    let employee = await Employee.findOne({ userId })
      .populate("userId")
      .populate("departmentId");

    return res.status(200).json({ success: true, data: employee });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

// for admin
export const addEmployee = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      department,
      dob,
      gender,
      designation,
      salary,
      role,
    } = req.body;

    if (
      !email ||
      !name ||
      !password ||
      !department ||
      !dob ||
      !gender ||
      !designation ||
      !salary||
      !role
    )
      return res
        .status(400)
        .json({ success: false, message: "All field are required" });

    let isExist = await User.findOne({ email });
    if (isExist)
      return res
        .status(200)
        .json({ success: false, message: "This email is occupied" });

    let hashPass = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      name,
      email,
      password: hashPass,
      role,
    });

    let newEmployee = await Employee.create({
      userId: newUser._id,
      departmentId:department,
      dateOfBirth: dob,
      gender,
      designation,
      salary,
    });

    let updateDepartment = await Department.findByIdAndUpdate(department, {
      $push: { employees: newEmployee._id },
    });

    let employeeData = await Employee.findById(newEmployee._id)
      .populate("userId")
      .populate("departmentId");

    return res.status(200).json({
      success: true,
      message: "Employee created",
      data: employeeData,
    });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    let { employeeId } = req.body;

    if (!employeeId)
      return res
        .status(401)
        .json({ success: false, message: "Please provide id" });

    let isExistEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!isExistEmployee)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });

    await User.findByIdAndDelete(isExistEmployee.userId);

    await Department.findByIdAndUpdate(isExistEmployee.departmentId, {
      $pull: { employees: employeeId },
    });

    return res.status(200).json({
      success: true,
      message: "Employee deleted",
      data: isExistEmployee,
    });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    let Employees = await Employee.find()
      .populate("userId")
      .populate("departmentId");

    return res.status(200).json({ success: true, data: Employees });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    let {
      employeeId,
      name,
      email,
      password,
      department,
      dob,
      gender,
      designation,
      salary,
      role,
    } = req.body;

    let employee = await Employee.findById(employeeId);

    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });

    // update user details
    let user = await User.findById(employee.userId);

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if (password) {
      let hashPass = await bcrypt.hash(password, 10);
      user.password = hashPass;
    }

    if (role) {
      user.role = role;
    }

    await user.save();
    // ----------------

    // update employee details
    if (department) {
      employee.departmentId = department;
    }
    if (dob) {
      employee.dateOfBirth = dob;
    }
    if (gender) {
      employee.gender = gender;
    }
    if (designation) {
      employee.designation = designation;
    }
    if (salary) {
      employee.salary = salary;
    }
    await employee.save();
    // ------------------

    let updateData = await Employee.findById(employeeId)
      .populate("userId")
      .populate("departmentId");
    return res.status(200).json({
      success: true,
      message: "Employee Updated",
      data: updateData,
    });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};
