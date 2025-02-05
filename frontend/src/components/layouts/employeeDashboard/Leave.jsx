import { useEffect, useState } from "react";
import LeaveAdd from "./LeaveAdd";
import { getEmployeeLeave } from "../../../services/actions/leaveApi";
import { useDispatch, useSelector } from "react-redux";
import { setLeave } from "../../../slices/leaveSlice";
import toast from "react-hot-toast";

const Leave = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();
  const { leaveData } = useSelector((state) => state.leave);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchLeave = async () => {
      let result = await getEmployeeLeave(user?.id);
      if (result?.data?.success) {
        dispatch(setLeave(result.data.data));
      } else {
        toast.error(result?.message);
      }
    };
    fetchLeave();
  }, []);

  return (
    <>
      {openAdd && <LeaveAdd onClose={() => setOpenAdd(false)} />}
      <div className="w-full h-[calc(100vh-100px)] overflow-y-auto ">
        <h1 className="text-3xl text-center my-4 underline">Manage Leaves</h1>

        <div className="flex justify-between items-center px-5">
          <input
            type="text"
            placeholder="Search here"
            className="bg-gray-100 text-gray-700 outline-none ring-1 rounded-md py-2 px-1"
          />
          <button
            onClick={() => setOpenAdd(true)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-md shadow"
          >
            Add Leave
          </button>
        </div>

        <div className="w-full p-3">
          <table className="w-full text-center">
            <thead className="border-b-[1px] border-b-gray-500">
              <tr className="">
                <th className="px-4 py-2">Sno</th>
                <th className="px-4 py-2">StartDate</th>
                <th className="px-4 py-2">EndDate</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">AppliedDate</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            
            <tbody>
              {leaveData?.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 border-b-[1px] border-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 border-b-[1px] border-gray-700">
                    {item.startDate.split("T")[0]}
                  </td>
                  <td className="px-4 py-4 border-b-[1px] border-gray-700">
                    {item.endDate.split("T")[0]}
                  </td>
                  <td className="px-4 py-4 border-b-[1px] border-gray-700">
                    {item.reason}
                  </td>
                  <td className="px-4 py-4 border-b-[1px] border-gray-700">
                    {item.startDate.split("T")[0]}
                  </td>
                  <td className="px-4 py-4 border-b-[1px] border-gray-700">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Leave;
