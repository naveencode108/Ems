import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../services/actions/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToken, setUser } from "../slices/authSlice";
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {loading}=useSelector(state=>state.auth);
  

  const onSubmit = async (data) => {
     dispatch(setLoading(true));
     let result = await login(data);
     if (result?.data?.success) {
      dispatch(setLoading(false));
      dispatch(setToken(result.data.token));
      dispatch(setUser(result.data.data));
      localStorage.setItem("user", JSON.stringify(result.data.data));
      localStorage.setItem("token", result.data.token);
      
      if(result.data.data.role=='admin'){
        navigate('/');
        toast.success('Welcome Admin');
      }
      
      if(result.data.data.role=='employee'){
        navigate('/employee-dashboard');
        toast.success('Welcome!');
      }
    }
    else{ 
      dispatch(setLoading(false));
      toast.error(result.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-200 grid place-content-center">
      <div className="w-[20rem] p-4 bg-white shadow-md rounded-md">
        <h1 className="text-center text-2xl py-3">Login Here</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="py-2 px-2 outline-none ring-1 ring-emerald-400 rounded-lg"
              {...register("email", { required: "Email is required" })}
            />
            <span className="text-sm text-red-500">
              {errors.email && errors.email.message}
            </span>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="py-2 px-2 outline-none ring-1 ring-emerald-400 rounded-lg"
              {...register("password", { required: "Password is required" })}
            />
            <span className="text-sm text-red-500">
              {errors.password && errors.password.message}
            </span>
          </div>

          <div className="w-full">
            <button className=" bg-emerald-400 px-4 py-2 rounded-md w-full">
              {loading?'Loading..':'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
