import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateDepartment } from "../../../../../services/actions/departmentApi";
import { setDepartMent } from "../../../../../slices/departmentSlice";
import toast from "react-hot-toast";

const EditDepartment = ({ onClick, editData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const { departmentData } = useSelector((state) => state.department);
  const {token}=useSelector(state=>state.auth);

  const onSubmit = async (data) => {
    let result = await updateDepartment(data,token);
    if (result.data.success) {
      let filterData = departmentData.map((item) =>
        item._id == data.departmentId ? { ...result.data.data } : item
      );
      toast.success(result.data.message);
      dispatch(setDepartMent(filterData));
    }
    onClick();
  };

  useEffect(() => {
    setValue("department", editData.name);
    setValue("departmentId", editData._id);
  }, []);

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

export default EditDepartment;
