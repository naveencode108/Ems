import React from "react";
import DashBoardOverview from "../../../comman/DashBoardOverview";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaBuilding } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";

const MyDashBoard = () => {
  return (
    <div className="h-[calc(100vh-100px)] overflow-y-auto">
      <div className="space-y-5">
        <h1 className="text-2xl text-gray-800 font-medium">
          Dashboard Overview
        </h1>
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-2">
          <DashBoardOverview
            icon={<PiUsersThreeFill size={25} />}
            text={"Total Employees"}
          />
          <DashBoardOverview
            icon={<FaBuilding size={25} />}
            text={"Total Departments"}
          />
          <DashBoardOverview
            icon={<FaMoneyBillWave size={25} />}
            text={"Monthly Pay"}
          />
        </div>
      </div>
       
       {/* leave */}
      <div className="mt-8">
        <h1 className="text-center text-2xl text-gray-800 font-medium">
          Leave Deatils
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-2">
          <DashBoardOverview
            icon={<PiUsersThreeFill size={25} />}
            text={"Total Employees"}
          />
          <DashBoardOverview
            icon={<PiUsersThreeFill size={25} />}
            text={"Total Employees"}
          />
          <DashBoardOverview
            icon={<PiUsersThreeFill size={25} />}
            text={"Total Employees"}
          />
          <DashBoardOverview
            icon={<PiUsersThreeFill size={25} />}
            text={"Total Employees"}
          />
        </div>
      </div>
    </div>
  );
};

export default MyDashBoard;
