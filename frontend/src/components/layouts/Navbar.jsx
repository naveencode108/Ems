import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../slices/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {

   const dispatch=useDispatch();
   const navigate=useNavigate();

  const handleLogout=()=>{
     dispatch(setUser(null));
     dispatch(setToken(null));
     localStorage.removeItem('user');
     localStorage.removeItem('token');
     navigate('/login');
     toast.success("Logged out");

  }

  return (
    <div className="w-full py-1 bg-emerald-500 flex justify-between items-center px-6">
      <h1 className="text-3xl text-white font-mono p-2">Employee MS</h1>
       <div className="bg-emerald-800 rounded-lg py-2 px-2 text-white">
        <button onClick={handleLogout}>Logout</button>
       </div>
    </div>
  );
};

export default Navbar;
