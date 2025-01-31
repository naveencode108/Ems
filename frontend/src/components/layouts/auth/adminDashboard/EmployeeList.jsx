import React from "react";

const EmployeeList = () => {
  return (
    <div className="w-full h-[calc(100vh-100px)] overflow-y-auto">
      <h1 className="text-3xl text-center my-4">Manage Employee</h1>

    <div className="flex justify-between items-center px-5">
       <input type="text" placeholder="Search here" className="bg-gray-100 text-gray-700 outline-none ring-1 rounded-md py-2 px-1"/>
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-md shadow">Add Employee</button>
    </div>

      <div className="w-full p-3">
        <table className="w-full text-center">
          <thead className="border-b-[1px] border-b-gray-500">
            <tr className="">
              <th className="px-4 py-2">Sno</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">DOB</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-[1px] border-b-gray-500">
              <td className="px-4 py-4">1</td>
              <td className="px-4 py-4">sam</td>
              <td className="px-4 py-4">sam</td>
              <td className="px-4 py-4">123</td>
              <td className="px-4 py-4">developer</td>
              <td className="px-4 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
