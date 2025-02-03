import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaBuilding } from "react-icons/fa";
import { MdWorkOff } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";


const Sidebar = () => {
  const SideData = [
    { title: "Dashboard", path: "/", icon: <MdDashboard /> },
    { title: "Employees", path: "/employees", icon: <PiUsersThreeFill /> },
    { title: "Departments", path: "/departments", icon: <FaBuilding /> },
    { title: "Leaves", path: "/leaves", icon: <MdWorkOff /> },
    { title: "Salary", path: "/salary", icon: <RiMoneyRupeeCircleFill /> },
  ];

  return (
    <div className="w-60 h-full bg-gray-900 text-white p-2 px-5 flex flex-col items-center">
      <h1 className="text-3xl p-5">Admin</h1>

      <div className="flex flex-col gap-4 mt-5 items-center w-full">
        {SideData.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="p-3 focus:bg-emerald-600 ring-1 transition-all ease-in rounded-lg hover:bg-emerald-600 capitalize w-full font-bold flex gap-3 items-center "
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
