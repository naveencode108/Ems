import Salary from "../models/Salary.js";

export const addSalary = async (req, res) => {
  try {
    let { employeeId, basicSalary, allowance, deduction, payDate } = req.body;

    if (!employeeId || !basicSalary || !allowance || !deduction || !payDate)
      return res
        .status(401)
        .json({ success: false, message: "All field are required" });

    let totalSalary =
      parseInt(basicSalary) + parseInt(allowance) - parseInt(deduction);

    const salary = await Salary.create({
      employeeId,
      basicSalary,
      allowance,
      deduction,
      netSalary: totalSalary,
      payDate,
    });

    return res
      .status(200)
      .json({ success: true, message: "salary added", data: salary });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};

export const getSalaryHistory = async (req, res) => {
  try {
    let { employeeId } = req.body;

    if (!employeeId)
      return res
        .status(401)
        .json({ success: false, message: "employee Id is not provided" });

    let employeeSalary = await Salary.find({ employeeId }).populate({
      path: "employeeId",
      populate: [{ path: "userId" }, { path: "departmentId" }],
    });

    return res.status(200).json({ success: true, data: employeeSalary });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};
