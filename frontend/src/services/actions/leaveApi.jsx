import toast from "react-hot-toast"
import { apiCall } from "../apiCall";

export const getAllLeave=async(token)=>{
  try {
    let headers={
      'Authorization': `Bearer ${token}`
    }
    let result;
    result = await apiCall('GET','/api/v1/leave/get_all_leaves',headers);
    return result;

  } catch (er) {
    return {success:false,message:er.response?.data?.message};
  }
}

export const addLeave=async(data,token)=>{
   try {
    let headers={
      'Authorization': `Bearer ${token}`
    }
    
    let result;
    result=await apiCall('POST','/api/v1/leave/add_leave',headers,data);
    return result;

  } catch (er) {
     return {success:false,message:er.response?.data?.message};
   }
}

export const getEmployeeLeave=async(userId,token)=>{
  try {
    let headers={
      'Authorization': `Bearer ${token}`
    }
    
    let result;
    result = await apiCall('POST','/api/v1/leave/get_employee_leave',headers,{userId});
    return result;

  } catch (er) {
    return {success:false,message:er.response?.data?.message};
  }
}

export const changeLeaveStatus=async(data,token)=>{
   try {
    let headers={
      'Authorization': `Bearer ${token}`
    }
    let result=await apiCall('POST','/api/v1/leave/change_leave_status',headers,data);
    return result;
    
   } catch (er) {
     return {success:false,message:er.response?.data?.message};
   }
}
