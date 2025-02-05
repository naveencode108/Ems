import toast from "react-hot-toast"
import { apiCall } from "../apiCall";

export const getAllLeave=async()=>{
  try {
    
    let result;
    result = await apiCall('GET','/api/v1/leave/get_all_leaves');
    return result;

  } catch (er) {
    return {success:false,message:er.response?.data?.message};
  }
}

export const addLeave=async(data)=>{
   try {
    
    let result;
    result=await apiCall('POST','/api/v1/leave/add_leave',null,data);
    return result;

  } catch (er) {
     return {success:false,message:er.response?.data?.message};
   }
}

export const getEmployeeLeave=async(userId)=>{
  try {
    
    let result;
    result = await apiCall('POST','/api/v1/leave/get_employee_leave',null,{userId});
    return result;

  } catch (er) {
    return {success:false,message:er.response?.data?.message};
  }
}

export const changeLeaveStatus=async(data)=>{
   try {
    let result=await apiCall('POST','/api/v1/leave/change_leave_status',null,data);
    return result;
    
   } catch (er) {
     return {success:false,message:er.response?.data?.message};
   }
}
