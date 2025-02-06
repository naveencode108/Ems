import React from "react";

const DashBoardOverview = ({ icon, text,value,color }) => {
  return (
    <div className="py-1 flex gap-3 items-center px-3 shadow bg-gray-200 rounded-md m-1">
      <div className={`${color} p-4 text-white rounded-lg`}>{icon}</div>
      <div className="text-gray-800 text-lg">
        <p>{text}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default DashBoardOverview;
