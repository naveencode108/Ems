import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeLeave } from "../../../../../services/actions/leaveApi";
import { setLeave } from "../../../../../slices/leaveSlice";
import toast from "react-hot-toast";

const LeaveHistory = ({ onClose, data }) => {
  const [leave, setLeave] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeave = async () => {
      setLoading(true);
      let result = await getEmployeeLeave(data?.userId?._id);
      if (result?.data?.success) {
        setLoading(false);
        setLeave(result.data.data);
      } else {
        toast.error(result?.message);
      }
    };
    fetchLeave();
  }, [data]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center transition-all ease-linear">
      <div className="p-4 w-[50rem] bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl mb-2   border-b border-gray-700 flex justify-between items-center ">
          Leave History
          <button
            onClick={onClose}
            className="text-white text-sm bg-red-500 px-2 py-1 rounded-lg"
          >
            Close
          </button>
        </h1>
        <div className="w-full p-3">
          {loading ? (
            <div className="text-2xl grid place-content-center ">Loading..</div>
          ) : (
            <table className="w-full text-center">
              <thead className="border-b-[1px] border-b-gray-500">
                <tr className="">
                  <th className="px-4 py-2 text-sm">Sno</th>
                  <th className="px-4 py-2 text-sm">Name</th>
                  <th className="px-4 py-2 text-sm">Department</th>
                  <th className="px-4 py-2 text-sm">Days</th>
                  <th className="px-4 py-2 text-sm">Status</th>
                  <th className="px-4 py-2 text-sm">Reason</th>
                </tr>
              </thead>
              <tbody>
                {leave && leave.length > 0 ? (
                  leave.map((item, index) => (
                    <tr key={index}>
                      <td className="capitalize px-2 py-3 border-gray-700 border-b-[1px] text-sm">
                        {index + 1}
                      </td>
                      <td className="capitalize px-2 py-3 border-gray-700 border-b-[1px] text-sm">
                        {item?.employeeId?.userId?.name}
                      </td>
                      <td className="capitalize px-2 py-3 border-gray-700 border-b-[1px] text-sm">
                        {item?.employeeId?.departmentId?.name}
                      </td>
                      <td className="capitalize px-2 py-3 border-gray-700 border-b-[1px] text-sm">
                        {Math.ceil(
                          (new Date(item.endDate) - new Date(item.startDate)) /
                            (1000 * 60 * 60 * 24)
                        )}
                      </td>
                      <td className={`capitalize px-2 py-3 ${item.status=='approved'?'text-green-500':'text-red-500'} border-gray-700 border-b-[1px] text-sm`}>
                        {item.status}
                      </td>
                      <td className="capitalize px-2 py-3 border-gray-700 border-b-[1px] text-sm">
                        {item.reason}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No data yet..</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;
