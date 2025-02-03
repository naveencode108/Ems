import Department from "../models/Department.js";

export const addDepartment = async (req, res) => {
  try {
    let { department } = req.body;

    if (!department)
      return res.status(400).json({
        success: false,
        message: "Department name is not provided",
      });

      department=department.toUpperCase();

    let departmentExist = await Department.findOne({ name: department });

    if (departmentExist)
      return res
        .status(400)
        .json({ success: false, message: "Department is already exist" });

    let newDepartment = await Department.create({
      name: department,
    });

    return res.status(200).json({
      success: true,
      message: "Department created",
      data: newDepartment,
    });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

export const getAllDepartment = async (req, res) => {
  try {
    let allDepartment = await Department.find({});
    return res.status(200).json({ success: true, data: allDepartment });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    let { departmentId } = req.body;

    if (!departmentId)
      return res
        .status(400)
        .json({ success: false, message: "DepartmentId is not found" });

    let department = await Department.findById(departmentId);

    if (!department)
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });

    let deletedDepartment = await department.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Department Deleted",
    });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    let { departmentId, department } = req.body;

    if (!departmentId || !department)
      return res
        .status(404)
        .json({ success: false, message: "All field are required" });

    let findDepartment = await Department.findById(departmentId);

    if (!findDepartment)
      return res
        .status(404)
        .json({ success: false, message: "Deprtment not found" });

    findDepartment.name = department.toUpperCase();
    let updatedDepartment = await findDepartment.save();

    return res.status(200).json({
      success: true,
      message: "Department Updated",
      data: updatedDepartment,
    });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};
