import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { SideData } from "../../../utils/SidebarData";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-60 h-full bg-gray-900 text-white p-2 px-5 flex flex-col items-center">
      <h1 className="text-2xl p-5 capitalize "><span className="text-emerald-500">welcome!</span>{user?.role=='admin'?'admin':user?.name}</h1>

      <div className="flex flex-col gap-4 mt-5 items-center w-full">
        {SideData.map(
          (item, index) =>
            item.role == user?.role && (
              <Link
                key={index}
                to={item.path}
                className="p-3 focus:bg-emerald-600 ring-1 transition-all ease-in rounded-lg hover:bg-emerald-600 capitalize w-full font-bold flex gap-3 items-center "
              >
                {item.icon}
                {item.title}
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
