import React, { useEffect, useState } from "react";
import { getDepartment } from "../../../../../services/actions/departmentApi";
import { setDepartMent } from "../../../../../slices/departmentSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getAllEmployee } from "../../../../../services/actions/employeeApi";
import { setEmployee } from "../../../../../slices/employeeSlice";
import { addSalary } from "../../../../../services/actions/salaryApi";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';

const SalaryForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const [employee, setemployee] = useState(null);

  const { departmentData } = useSelector((state) => state.department);
  const { employeeData } = useSelector((state) => state.employee);
  const {token}=useSelector(state=>state.auth);

  const navigate=useNavigate();
  const handleDepartmentChange = (e) => {
    setemployee(
      employeeData.filter((item) => item.departmentId._id == e.target.value)
    );
  };

  const onSubmit = async(data) => {
    let result=await addSalary(data,token);
    console.log(result);

    if(result.data.success){
        toast.success(result.data.message);
        navigate('/employees');
    }
  };

  useEffect(() => {
    const fetchDepartment = async () => {
      let result = await getDepartment(token);
      if (result.data.success) {
        dispatch(setDepartMent(result.data.data));
      }
    };

    const fetchAllEmployee = async () => {
      let result = await getAllEmployee(token);
      if (result.data.success) {
        dispatch(setEmployee(result.data.data));
      }
    };
    fetchAllEmployee();
    fetchDepartment();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-2 grid grid-cols-1  md:grid-cols-3 gap-3"
    >
      {/* department */}
      <div className="flex flex-col m-3 w-full">
        <label className="text-gray-700 text-sm">Select Department</label>
        <select
          onChange={handleDepartmentChange}
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
      </div>

      {/* employee */}
      <div className="flex flex-col m-3  w-full">
        <label className="text-gray-700 text-sm">Select Employee</label>
        <select
          {...register("employeeId", { required: "Select Employee" })}
          className="px-2 py-2 outline-none ring-1 ring-emerald-400 rounded-md text-sm"
        >
          <option value="">Select Employee</option>
          {employee &&
            employee.map((item, index) => (
              <option value={item._id} key={index}>
                {item.userId.name}
              </option>
            ))}
        </select>
        <span className="text-red-500 text-sm">
          {errors.employeeId && errors.employeeId.message}
        </span>
      </div>

      {/* basicsalary */}
      <div className="flex flex-col m-3 w-full ">
        <label htmlFor="" className="text-gray-700 text-sm">
         Basic Salary
        </label>
        <input
          type="number"
          className="ring-1 text-sm appearance-none ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
          placeholder="Salary"
          {...register("basicSalary", { required: "Salary is required" })}
        />
        <span className="text-red-500 text-sm">
          {errors.basicSalary && errors.basicSalary.message}
        </span>
      </div>
        
        {/* allowance */}
        <div className="flex flex-col m-3 w-full ">
        <label htmlFor="" className="text-gray-700 text-sm">
         Allowance
        </label>
        <input
          type="number"
          className="ring-1 text-sm appearance-none ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
          placeholder="Salary"
          {...register("allowance", { required: "Allowance is required" })}
        />
        <span className="text-red-500 text-sm">
          {errors.allowance && errors.allowance.message}
        </span>
      </div>

      {/* deductions */}
      <div className="flex flex-col m-3 w-full ">
        <label htmlFor="" className="text-gray-700 text-sm">
         Deduction
        </label>
        <input
          type="number"
          className="ring-1 text-sm appearance-none ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
          placeholder="Salary"
          {...register("deduction", { required: "Deduction is required" })}
        />
        <span className="text-red-500 text-sm">
          {errors.deduction && errors.deduction.message}
        </span>
      </div>

      {/* paydate */}
      <div className="flex flex-col m-3  w-full">
        <label className="text-gray-700 text-sm">Pay Date</label>
        <input
          type="Date"
          className="ring-1 text-sm ring-emerald-400 px-2 w-full py-2 outline-none rounded-md"
          {...register("payDate", { required: "DateOfBirth is required" })}
        />
        <span className="text-red-500 text-sm">
          {errors.paydate && errors.paydate.message}
        </span>
      </div>

      {/* buttons */}
      <div className="w-full text-gray-800">
        
        <button className="px-4 rounded-full py-2 w-full bg-emerald-300 ">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SalaryForm;
