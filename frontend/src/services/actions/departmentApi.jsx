import { toast } from "react-hot-toast";
import { apiCall } from "../apiCall";

export const addDepartment = async (data) => {
  try {
    let result;

    result = await apiCall(
      "POST",
      "/api/v1/department/add_department",
      null,
      data
    );

    return result;
  } catch (er) {
    console.log(er);
    toast.error(er.response.data.message);
  }
};

export const getDepartment=async()=>{
    try {
        let result;
        result=await apiCall('GET','/api/v1/department/get_all_department',null);
        return result;
        
    } catch (er) {
       return {success:false,message:er.response?.data?.message}
    }
}

export const updateDepartment=async(data)=>{
  try {
    let result;

    result=await apiCall('PUT','/api/v1/department/update_department',null,data);
    return result;

  } catch (er) {
      console.log(er.message);
      toast.error(er.message);
  }
}

export const deleteDepartment=async(departmentId)=>{
  try {
    let result;
    result=await apiCall('DELETE','/api/v1/department/delete_department',null,{departmentId});
    return result;

  } catch (er) {
    return {success:false,message:er.response?.data?.message};
  }
}
