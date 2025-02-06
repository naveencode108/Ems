import { toast } from "react-hot-toast";
import { apiCall } from "../apiCall";

export const addDepartment = async (data,token) => {
  try {
    let headers={
      'Authorization': `Bearer ${token}`
    }
    let result;

    result = await apiCall(
      "POST",
      "/api/v1/department/add_department",
      headers,
      data
    );

    return result;
  } catch (er) {
    return {success:false,message:er.response?.data?.message}
  }
};

export const getDepartment=async(token)=>{
    try {
      let headers={
        'Authorization': `Bearer ${token}`
      }
        let result;
        result=await apiCall('GET','/api/v1/department/get_all_department',headers);
        return result;
        
    } catch (er) {
       return {success:false,message:er.response?.data?.message}
    }
}

export const updateDepartment=async(data,token)=>{
  try {
    let headers={
      'Authorization': `Bearer ${token}`
    }
    let result;

    result=await apiCall('PUT','/api/v1/department/update_department',headers,data);
    return result;

  } catch (er) {
      console.log(er.message);
      toast.error(er.message);
  }
}

export const deleteDepartment=async(departmentId,token)=>{
  try {
    let headers={
      'Authorization': `Bearer ${token}`
    }
    let result;
    result=await apiCall('DELETE','/api/v1/department/delete_department',headers,{departmentId});
    return result;

  } catch (er) {
    return {success:false,message:er.response?.data?.message};
  }
}
