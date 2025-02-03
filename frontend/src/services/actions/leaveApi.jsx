import toast from "react-hot-toast"
import { apiCall } from "../apiCall";

export const getAllLeave=async()=>{
  try {
    
    let result;
    result = await apiCall('GET','/api/v1/leave/get_all_leaves');
    return result;


  } catch (er) {
     toast.error(er.message);
     console.log(er.message);
  }
}