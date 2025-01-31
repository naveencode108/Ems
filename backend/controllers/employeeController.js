import Department from "../models/Department";
import Employee from "../models/Employee";
import User from "../models/User";
import bcrypt from "bcrypt";

export const getEmployeeByUserId = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) return res.status(400).json({ success: false, message: "Id is not provided" });

    let employee = await Employee.findOne({ userId: id })
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
      departmentId,
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
      !departmentId ||
      !dob ||
      !gender ||
      !designation ||
      !salary
    )
      return res.status(400).json({ success: false, message: "All field are required" });

    let isExist = await User.findOne({ email });
    if (isExist)
      return res.status(200).json({ success: false, message: "This email is occupied" });

    let hashPass = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      name,
      email,
      password: hashPass,
      role,
    });

    let newEmployee = await Employee.create({
      userId: newUser._id,
      departmentId,
      dateOfBirth: dob,
      gender,
      designation,
      salary,
    });

    let updateDepartment = await Department.findByIdAndUpdate(departmentId, {
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
      return res.status(401).json({ success: false, message: "Please provide id" });

    let isExistEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!isExistEmployee)
      return res.status(404).json({ success: false, message: "Employee not found" });

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
      departmentId,
      dob,
      gender,
      designation,
      salary,
      role,
    } = req.body;

    if (
      !employeeId ||
      !name ||
      !email ||
      !password ||
      !departmentId ||
      !dob ||
      !gender ||
      !designation ||
      !salary ||
      !role
    )
      return res.status(401).json({ success: false, message: "All field are required" });

    let employee = await Employee.findById(employeeId);

    if (!employee)
      return res.status(404).json({ success: false, message: "Employee not found" });

    // update user details
    let user = await User.findById(employee.userId);

    user.name = name;
    user.email = email;

    let hashPass = await bcrypt.hash(password, 10);
    user.password = hashPass;
    user.role = role;

    await user.save();
    // ----------------

    // update employee details
    employee.departmentId = departmentId;
    employee.dateOfBirth = dob;
    employee.gender = gender;
    employee.designation = designation;
    employee.salary = salary;
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
