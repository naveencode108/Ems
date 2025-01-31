import Employee from "../models/Employee";
import Leave from "../models/Leave";

export const addLeave = async (req, res) => {
  try {
    let userId = req.userId;

    let { reason, startDate, endDate } = req.body;

    if (!userId || !reason || !startDate || !endDate)
      return res.status(400).json({ success: false, message: "All field are required" });

    let employee = await Employee.findOne({ userId });

    if (!employee)
      return res.status(404).json({ success: false, message: "Employee not found" });

    let newLeave = await Leave.create({
      employeeId: employee._id,
      reason,
      startDate,
      endDate,
    });

    return res.status(200).json({
      success: false,
      message: "Leave created successfully",
      data: newLeave,
    });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

export const getEmployeeLeaves = async (req, res) => {
  try {
    let userId = req.userId;

    if (!userId)
      return res.status(400).json({ success: false, message: "User Id is required" });

    let employee = await Employee.findOne({ userId });

    if (!employee) return res.status(404).json({ success: false, message: "not found" });

    let employeeLeave = await Leave.find({ employeeId: employee._id });

    return res.status(200).json({ success: true, data: employeeLeave });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    let leaves = await Leave.find({}).populate({
      path: "employeeId",
      populate: [{ path: "userId" }, { path: "departmentId" }],
    });
    return res.status(200).json({ success: true, message: leaves });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

export const changeLeaveStatus = async (req, res) => {
  try {
    let { leaveId, leaveStatus } = req.body;

    if (!leaveId || !leaveStatus)
      return res.status(400).json({ success: false, message: "Leave id is required" });

    let findLeave = await Leave.findByIdAndUpdate(
      leaveId,
      {
        status: leaveStatus,
      },
      { new: true }
    );

    if (!findLeave)
      return res.status(404).json({ success: false, message: "Leave not found" });

    let updateLeave = await findLeave.populate({
      path: "employeeId",
      populate: [{ path: "userId" }, { path: "departmentId" }],
    });

    return res.status(200).json({
      success: true,
      message: "Leave status changed",
      data: updateLeave,
    });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};
