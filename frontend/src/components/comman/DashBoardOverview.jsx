import React from "react";

const DashBoardOverview = ({ icon, text }) => {
  return (
    <div className="py-1 flex gap-3 items-center px-3 shadow bg-gray-200 rounded-md m-1">
      <div className="bg-emerald-500 p-4 text-white rounded-sm">{icon}</div>
      <div className="text-gray-800 text-lg">
        <p>{text}</p>
        <p>4</p>
      </div>
    </div>
  );
};

export default DashBoardOverview;
