import React from "react";
import { useForm } from "react-hook-form";
import { addDepartment } from "../../../../../services/actions/departmentApi";
import { useDispatch, useSelector } from "react-redux";
import { setDepartMent } from "../../../../../slices/departmentSlice";

const AddDepartMent = ({ onClick }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch=useDispatch();
  let {departmentData}=useSelector(state=>state.department);

  const onSubmit = async (data) => {
    let result = await addDepartment(data);

    if(result.data.success){
        dispatch(setDepartMent([...departmentData,result.data.data]));
    }
    onClick();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center transition-all ease-linear">
      <div className="p-4 w-[20rem] bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl mb-2  border-b border-gray-700 ">
          Add Department
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col my-4 w-full px-2">
            <label className="text-gray-700 text-sm">Name</label>
            <input
              type="text"
              className="ring-1 text-sm ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
              placeholder="Name of Department"
              {...register("department", {
                required: "Department is required",
              })}
            />
            <span className="text-red-500 text-sm">
              {errors.department && errors.department.message}
            </span>
          </div>
          <div className="w-full flex text-gray-800 justify-between col-span-3">
            <button
              type="button"
              onClick={() => onClick()}
              className="px-4 rounded-full py-2 bg-emerald-300 "
            >
              Close
            </button>
            <button className="px-4 rounded-full py-2 bg-emerald-300 ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartMent;
