import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setDepartMent } from "../../../../../slices/departmentSlice";
import { getDepartment } from "../../../../../services/actions/departmentApi";
import {
  addEmployee,
  updateEmploye,
} from "../../../../../services/actions/employeeApi";
import { setEmployee } from "../../../../../slices/employeeSlice";
import toast from "react-hot-toast";

const EmployeeForm = ({ type, data, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const { departmentData } = useSelector((state) => state.department);
  const { employeeData } = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const onSubmit = async (val) => {
    let formData = {};

    if (type == "EDIT") {
      if (val.name !== data.userId.name) {
        formData.name = val.name;
      }
      if (val.email !== data.userId.email) {
        formData.email = val.email;
      }
      if (val.password !== data.userId.password) {
        formData.password = val.password;
      }
      if (val.gender !== data.gender) {
        formData.gender = val.gender;
      }
      if (val.role !== data.userId.role) {
        formData.role = val.role;
      }
      if (val.department !== data.departmentId._id) {
        formData.department = val.department;
      }
      if (val.designation !== data.designation) {
        formData.designation = val.designation;
      }
      if (val.salary !== data.salary) {
        formData.salary = val.salary;
      }
      if (val.dob !== data.dateOfBirth.split("T")[0]) {
        formData.dob = val.dob;
      }

      formData.employeeId = data._id;
      let result = await updateEmploye(formData);
      if (result.data.success) {
        let newData = employeeData.map((item) =>
          item._id == val.employeeId ? { ...result.data.data } : item
        );
        dispatch(setEmployee(newData));
        onClose();
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
        onClose();
      }
    } else {
      let result = await addEmployee(val);
      if (result.data.success) {
        dispatch(setEmployee([...employeeData, result.data.data]));
      }
      onClose();
    }
  };

  useEffect(() => {
    if (!departmentData) {
      const fetchDepartment = async () => {
        let result = await getDepartment();
        if (result.data.success) {
          dispatch(setDepartMent(result.data.data));
        }
      };
      fetchDepartment();
    }

    if (type == "EDIT") {
      if (departmentData) {
        setValue("employeeId", data._id);
        setValue("name", data.userId.name);
        setValue("email", data.userId.email);
        setValue("password", data.userId.password);
        setValue("dob", data.dateOfBirth.split("T")[0]);
        setValue("gender", data.gender);
        setValue("designation", data.designation);
        setValue("role", data.userId.role);
        setValue("salary", data.salary);
        setValue("department", data.departmentId._id);
      }
    }
  }, [data, departmentData]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-2 grid grid-cols-1 place-items-center place-content-center gap-3"
    >
      {/* name */}
      <div className="flex flex-col m-3 w-full">
        <label className="text-gray-700 text-sm">Name</label>
        <input
          type="text"
          className="ring-1 text-sm ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
          placeholder="Name of employee"
          {...register("name", { required: "Name is required" })}
        />
        <span className="text-red-500 text-sm">
          {errors.name && errors.name.message}
        </span>
      </div>
      {/* email */}
      <div className="flex flex-col m-3 w-full ">
        <label className="text-gray-700 text-sm">Email</label>
        <input
          type="email"
          className="ring-1 text-sm ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
          placeholder="Email of employee"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        <span className="text-red-500 text-sm">
          {errors.email && errors.email.message}
        </span>
      </div>
      {/* password */}
      <div className="flex flex-col m-3 w-full ">
        <label className="text-gray-700 text-sm">Password</label>
        <input
          type="password"
          className="ring-1 text-sm ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
          placeholder="Password of employee"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be 4 characters long",
            },
          })}
        />
        <span className="text-red-500 text-sm">
          {errors.password && errors.password.message}
        </span>
      </div>
      {/* dob */}
      <div className="flex flex-col m-3  w-full">
        <label className="text-gray-700 text-sm">DateOfBirth</label>
        <input
          type="Date"
          className="ring-1 text-sm ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
          {...register("dob", { required: "DateOfBirth is required" })}
        />
        <span className="text-red-500 text-sm">
          {errors.dob && errors.dob.message}
        </span>
      </div>
      {/* gender */}
      <div className="flex flex-col m-3  w-full">
        <label className="text-gray-700 text-sm">Select Gender</label>
        <select
          {...register("gender", { required: "Gender is required" })}
          className="px-2 py-2 outline-none ring-1 ring-emerald-400 rounded-md text-sm"
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <span className="text-red-500 text-sm">
          {errors.gender && errors.gender.message}
        </span>
      </div>
      {/* department */}
      <div className="flex flex-col m-3  w-full">
        <label className="text-gray-700 text-sm">Select Department</label>
        <select
          {...register("department", {
            required: "Department is required",
          })}
          className="px-2 py-2 outline-none ring-1 ring-emerald-400 rounded-md text-sm"
        >
          <option value="">Select Department</option>
          {departmentData &&
            departmentData.map((item, index) => (
              <option value={item._id} key={index}>
                {item.name}
              </option>
            ))}
        </select>
        <span className="text-red-500 text-sm">
          {errors.department && errors.department.message}
        </span>
      </div>
      {/* designation */}
      <div className="flex flex-col m-3 w-full ">
        <label htmlFor="" className="text-gray-700 text-sm">
          Designation
        </label>
        <input
          type="text"
          className="ring-1 text-sm ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
          placeholder="Designation"
          {...register("designation", {
            required: "Designation is required",
          })}
        />
        <span className="text-red-500 text-sm">
          {errors.designation && errors.designation.message}
        </span>
      </div>
      {/* role */}
      <div className="flex flex-col m-3  w-full">
        <label className="text-gray-700 text-sm">Select Role</label>
        <select
          {...register("role", { required: "Role is required" })}
          className="px-2 py-2 outline-none ring-1 ring-emerald-400 rounded-md text-sm"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <span className="text-red-500 text-sm">
          {errors.role && errors.role.message}
        </span>
      </div>
      {/* salary */}
      <div className="flex flex-col m-3 w-full ">
        <label htmlFor="" className="text-gray-700 text-sm">
          Salary
        </label>
        <input
          type="number"
          className="ring-1 text-sm appearance-none ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
          placeholder="Salary"
          {...register("salary", { required: "Salary is required" })}
        />
        <span className="text-red-500 text-sm">
          {errors.salary && errors.salary.message}
        </span>
      </div>

      {/* buttons */}
      <div className="w-full flex text-gray-800 justify-between col-span-3">
        <button
          onClick={() => onClose()}
          className="px-4 rounded-full py-2 bg-emerald-300 "
        >
          Close
        </button>
        <button className="px-4 rounded-full py-2 bg-emerald-300 ">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
