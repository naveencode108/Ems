import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEmployeebyUserId } from "../../../services/actions/employeeApi";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profileData,setProfileData]=useState(null);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      let result = await getEmployeebyUserId(user.id);
      if(result?.data?.success){
        setProfileData(result.data.data)
        setLoading(false);
      }
      else{
         toast.error(result?.message);
      }
    };
    fetchUser();
  }, [user]);

  if(loading) return <div className="grid place-content-center text-3xl w-full h-screen">Loading..</div>

  return (
    <div className="w-full h-screen   bg-gray-100  p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row w-full">
        {/* Left Side - Profile Image */}
        <div className="flex justify-center md:justify-start w-full md:w-1/3">
          <img
            src=""
            alt="Profile"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-gray-300 object-cover"
          />
        </div>

        {/* Right Side - Profile Details */}
        <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">
            {profileData?.userId?.name}
          </h2>
          <p className="text-gray-600 text-sm mt-1 capitalize">{profileData?.designation}</p>
          <div className="mt-4">
            <p className="text-gray-700">
               <strong>Date Of Birth:</strong>{profileData?.dateOfBirth.split('T')[0]}
            </p>
            <p className="text-gray-700 mt-2">
               <strong>Gender:</strong> {profileData?.gender}
            </p>
            <p className="text-gray-700 mt-2">
               <strong>Department:</strong> {profileData?.departmentId?.name}
            </p>
            <p className="text-gray-700 mt-2">
               <strong>Designation:</strong> {profileData?.designation}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
