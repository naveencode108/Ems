import React from "react";

const Navbar = () => {
  return (
    <div className="w-full py-1 bg-emerald-500 flex justify-between items-center px-6">
      <h1 className="text-3xl text-white font-mono p-2">Employee MS</h1>
       <div className="bg-emerald-800 rounded-lg py-2 px-2 text-white">
        <button>Logout</button>
       </div>
    </div>
  );
};

export default Navbar;
