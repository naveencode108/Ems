import React from 'react'
import { IoClose } from "react-icons/io5";

const ViewEmployeeDetails = ({onClose,data}) => {
  return (
    <div className="fixed inset-0 w-full h-screen backdrop-blur-sm bg-black/30 flex justify-center items-center px-5">
    <div className="w-[32rem] bg-white p-6 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Employee Details</h1>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500">
          <IoClose size={24} />
        </button>
      </div>

      {/* Employee Info */}
      <div className="flex items-center gap-5">
        {/* Employee Image */}
        <div className="size-40 rounded-full overflow-hidden border bg-gray-100">
          <img
            src=''
            alt="Employee"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Employee Details */}
        <div className="w-full space-y-2">
          <p className="text-gray-700"><strong>Name:</strong> {data?.userId?.name || "N/A"}</p>
          <p className="text-gray-700"><strong>Date of Birth:</strong> {data?.dateOfBirth ? data.dateOfBirth.split("T")[0] : "N/A"}</p>
          <p className="text-gray-700"><strong>Gender:</strong> {data?.gender || "N/A"}</p>
          <p className="text-gray-700"><strong>Department:</strong> {data?.departmentId?.name || "N/A"}</p>
          <p className="text-gray-700"><strong>Designation:</strong> {data?.designation || "N/A"}</p>
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-end mt-5">
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all">
          Close
        </button>
      </div>
    </div>
  </div>
  )
}

export default ViewEmployeeDetails
