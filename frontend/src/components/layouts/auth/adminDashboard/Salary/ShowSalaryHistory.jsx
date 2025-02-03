import React, { useEffect } from "react";
import { getSalary } from "../../../../../services/actions/salaryApi";
import { useDispatch } from "react-redux";
import { setSalary } from "../../../../../slices/salarySlice";
import { useSelector } from "react-redux";

const ShowSalaryHistory = ({ onClose, data }) => {
  const dispatch = useDispatch();

  const { salaryData } = useSelector((state) => state.salary);

  useEffect(() => {
    if (data) {
      const fetchSalaryHistory = async () => {
        let result = await getSalary({ employeeId: data._id });
        if (result.data.success) {
          dispatch(setSalary(result.data.data));
        }
      };
      fetchSalaryHistory();
    }

    return () => {
      dispatch(setSalary(null));
    };
  }, [data]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center transition-all ease-linear">
      <div className="p-4 w-[50rem] bg-white shadow-lg rounded-lg">
        <h1 className="flex p-3 justify-between items-center text-2xl mb-2  border-b border-gray-700 ">
          Salary History
          <button
            onClick={onClose}
            className="text-sm px-2 py-1 bg-red-500 rounded-xl text-white"
          >
            close
          </button>
        </h1>
        <div className="w-full p-3 max-h-[calc(100vh-20rem)] overflow-y-auto">
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
              {salaryData && salaryData.length > 0 ? (
                salaryData.map((item, index) => (
                  <tr key={index} className="border-b-[1px] border-b-gray-500">
                    <td className="px-2 py-4 ">{index + 1}</td>
                    <td className="px-2 py-4 ">
                      {item.employeeId.userId.name}
                    </td>
                    <td className="px-2 py-4 ">{item.basicSalary}</td>
                    <td className="px-2 py-4 ">{item.allowance}</td>
                    <td className="px-2 py-4 ">{item.deduction}</td>
                    <td className="px-2 py-4 ">{item.netSalary}</td>
                    <td className="px-2 py-4 ">{item.payDate}</td>
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

export default ShowSalaryHistory;
