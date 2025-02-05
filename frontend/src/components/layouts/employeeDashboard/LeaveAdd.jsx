import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addLeave } from "../../../services/actions/leaveApi";
import { setLeave } from "../../../slices/leaveSlice";
import toast from "react-hot-toast";

const LeaveAdd = ({onClose}) => {
  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useSelector((state) => state.auth);
  const { leaveData } = useSelector((state) => state.leave);
  const dispatch=useDispatch();


  const onSubmit = async(data) => {
      
    let result=await addLeave(data);

      if(result?.data?.success){
         dispatch(setLeave([...leaveData,result.data.data]))
         toast.success(result.data.message);
         onClose();
      }
      else{
         toast.error(result?.message);
      }

  };

  useEffect(() => {
    setValue("userId", user?.id);
  }, [setValue, user]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex justify-center items-center">
      <div className="p-6 w-full max-w-xl bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
          Request for Leave
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Reason Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Reason
            </label>
            <textarea
              {...register("reason", { required: "Reason is required" })}
              className="w-full h-24 border resize-none border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Give reason for leave"
            />
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Start Date
            </label>
            <input
              type="date"
              {...register("startDate", { required: "Start date is required" })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              End Date
            </label>
            <input
              type="date"
              {...register("endDate", { required: "End date is required" })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-between space-x-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition"
            >
              Submit
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default LeaveAdd;
