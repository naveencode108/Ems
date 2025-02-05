import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLeaveStatus } from "../../../../services/actions/leaveApi";
import toast from "react-hot-toast";
import { setLeave } from "../../../../slices/leaveSlice";

const LeaveStatus = ({ onClose, data }) => {
  const { leaveData } = useSelector((state) => state.leave);

  const dispatch = useDispatch();

  const handleChange = async (status, id) => {
    let result = await changeLeaveStatus({ leaveId: id, leaveStatus: status });
    if (result?.data?.success) {
      let newData = leaveData.map(item=>
        item._id === result?.data?.data?._id ? { ...result?.data?.data } : item
      );
      dispatch(setLeave(newData));
      toast.success(result?.data?.message);
      onClose();
    } else {
      toast.error(result?.message);
    }
  };
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center transition-all ease-linear">
      <div className="p-4 w-[50rem] bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl mb-2  border-b border-gray-700 flex justify-between items-center ">
          Leave Detail
          <button
            onClick={onClose}
            className="bg-red-500 px-2 text-sm py-1 rounded-lg text-white"
          >
            close
          </button>
        </h1>
        <div className=" p-8 flex flex-col md:flex-row w-full">
          <div className="flex justify-center md:justify-start w-full md:w-1/3">
            <img
              src=""
              alt="Profile"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-gray-300 object-cover"
            />
          </div>

          <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-2/3">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {data?.employeeId?.userId?.name}
            </h2>
            <p className="text-gray-600 text-sm mt-1 capitalize">
              {data?.employeeId?.departmentId?.name}
            </p>
            <div className="mt-4">
              <p className="text-gray-700">
                <strong>Date Of Birth:</strong>
                {new Date(data?.employeeId?.dateOfBirth).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Gender:</strong> {data?.employeeId?.gender}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>StartDate</strong>{" "}
                {new Date(data?.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>EndDate</strong>{" "}
                {new Date(data?.endDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Designation:</strong> {data?.employeeId?.designation}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Reason:</strong> {data?.reason}
              </p>
              {data.status == "pending" && (
                <p className="text-gray-700 mt-2 space-x-2">
                  <strong>Action:</strong>
                  <button
                    onClick={() => handleChange("approved", data._id)}
                    className="px-2 py-1 rounded-lg bg-green-500 text-white"
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => handleChange("rejected", data._id)}
                    className="px-2 py-1 rounded-lg bg-red-500 text-white"
                  >
                    Reject
                  </button>
                </p>
              )}
              {data.status !== "pending" && (
                <p className="text-gray-700 mt-2 space-x-2">
                  <strong>Status:</strong> {data.status}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveStatus;
