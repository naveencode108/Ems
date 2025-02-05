import React, { useEffect, useState } from "react";
import { getAllLeave } from "../../../../services/actions/leaveApi";
import { useDispatch, useSelector } from "react-redux";
import { setLeave } from "../../../../slices/leaveSlice";
import toast from "react-hot-toast";
import LeaveStatus from "./LeaveStatus";

const LeaveList = () => {
  const { leaveData } = useSelector((state) => state.leave);
  const [open,setOpen]=useState(false);
  const [leaveDetails,setLeaveDetails]=useState(null);


  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLeave = async () => {
      let result = await getAllLeave();
      if (result?.data?.success) {
        dispatch(setLeave(result?.data?.data));
      } else {
        toast.error(result?.message);
      }
    };
    fetchLeave();
  }, []);

  return (
    <>
     {open&&<LeaveStatus onClose={()=>setOpen(false)} data={leaveDetails} />}
    <div className="w-full h-[calc(100vh-100px)] overflow-y-auto ">
      <h1 className="text-3xl text-center my-4">Manage Leaves</h1>

      <div className="flex justify-between items-center px-5">
        <input
          type="text"
          placeholder="Search here"
          className="bg-gray-100 text-gray-700 outline-none ring-1 rounded-md py-2 px-1"
        />
      </div>

      <div className="w-full p-3">
        <table className="w-full text-center">
          <thead className="border-b-[1px] border-b-gray-500">
            <tr className="">
              <th className="px-4 py-2 text-sm">Sno</th>
              <th className="px-4 py-2 text-sm">Name</th>
              <th className="px-4 py-2 text-sm">Department</th>
              <th className="px-4 py-2 text-sm">Days</th>
              <th className="px-4 py-2 text-sm">Status</th>
              <th className="px-4 py-2 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveData && leaveData.length > 0 ? (
              leaveData.map((item, index) => (
                <tr key={index} className="border-b-[1px] border-b-gray-500">
                  <td className="px-4 py-4 text-sm">{index + 1}</td>
                  <td className="px-4 py-4 text-sm">
                    {item.employeeId?.userId?.name}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {item.employeeId?.departmentId?.name}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {Math.ceil(
                      (new Date(item.endDate) - new Date(item.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm">{item.status}</td>
                  <td className="px-4 py-4 text-sm space-x-2">
                    <button onClick={()=>{
                       setOpen(true); 
                       setLeaveDetails(item)
                    }} className="px-3 py-2 rounded-full bg-green-500">
                      View
                    </button>
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
    </>
  );
};

export default LeaveList;
