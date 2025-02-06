import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getEmployeeSalary,
  getSalary,
} from "../../../services/actions/salaryApi";
import toast from "react-hot-toast";

const Salary = () => {
  const { user,token } = useSelector((state) => state.auth);
  const [salaryHistory, setSalaryHistory] = useState(null);

  useEffect(() => {
    const fetchSalaryHistory = async () => {
      let result = await getEmployeeSalary({ userId: user.id },token);
      if (result?.data?.success) {
        setSalaryHistory(result.data.data);
      } else {
        toast.error(result?.message);
      }
    };
    fetchSalaryHistory();
  }, []);

  return (
    <div className="w-full flex h-screen justify-center items-center transition-all ease-linear">
      <div className=" w-full p-3 h-full overflow-y-auto bg-white shadow-lg rounded-lg">
        <h1 className="flex p-3 justify-between items-center text-2xl mb-2  border-b border-gray-700 ">
          Salary History
        </h1>
          <div className="w-full overflow-y-auto">
            <table className="w-full text-center">
              <thead className="border-b-[1px] border-b-gray-500">
                <tr className="">
                  <th className="px-4 py-2 text-sm capitalize">Sno</th>
                  <th className="px-4 py-2 text-sm capitalize">Name</th>
                  <th className="px-4 py-2 text-sm capitalize">salary</th>
                  <th className="px-4 py-2 text-sm capitalize">allowance</th>
                  <th className="px-4 py-2 text-sm capitalize">deduction</th>
                  <th className="px-4 py-2 text-sm capitalize">total</th>
                  <th className="px-4 py-2 text-sm capitalize">paydate</th>
                </tr>
              </thead>
              <tbody>
                {salaryHistory && salaryHistory.length > 0 ? (
                  salaryHistory.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b-[1px] border-b-gray-500"
                    >
                      <td className="px-2 py-4 ">{index + 1}</td>
                      <td className="px-2 py-4 ">
                        {item.employeeId.userId.name}
                      </td>
                      <td className="px-2 py-4 ">{item.basicSalary}</td>
                      <td className="px-2 py-4 ">{item.allowance}</td>
                      <td className="px-2 py-4 ">{item.deduction}</td>
                      <td className="px-2 py-4 ">{item.netSalary}</td>
                      <td className="px-2 py-4 ">
                        {item.payDate.split("T")[0]}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No data yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default Salary;
