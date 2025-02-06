import toast from "react-hot-toast";
import { apiCall } from "../apiCall";

export const getAllEmployee = async (token) => {
  try {
    let headers={
      'Authorization': `Bearer ${token}`
    }
    let result;
    // todo send header
    result = await apiCall("GET", "/api/v1/employee/get_all_employees", headers);

    return result;
  } catch (er) {
    toast.error(er.message);
  }
};

export const addEmployee = async (data,token) => {
  try {
    let headers={
      'Authorization': `Bearer ${token}`
    }
    let result;
    result = await apiCall("POST", "/api/v1/employee/add_employee", headers, data);
    return result;
  } catch (er) {
    return {success:false,message:er.response?.data?.message};
  }
};

export const updateEmploye=async(data,token)=>{
  try {
    let headers={
      'Authorization': `Bearer ${token}`
    }
    let result;
    result=await apiCall('PUT','/api/v1/employee/update_employee',headers,data);
    return result;

  } catch (er) {
    return {success:false,message:er.response?.data?.message};
  }
}

export const getEmployeebyUserId=async(userId,token)=>{
   try {
    
    let headers={
      'Authorization': `Bearer ${token}`
    }

    let result;
    result=await apiCall('POST','/api/v1/employee/get_employee_by_id',headers,{userId});
    return result;
    
   } catch (er) {
      console.log(er);
      return {success:false,message:er.response?.data?.message};
   }
}
