import toast from 'react-hot-toast';
import {apiCall} from '../apiCall';

export const login=async(data)=>{
    try {
        let result;
        result=await apiCall('POST','/api/v1/auth/login',null,data);
        return result;
        
    } catch (er) {
        return {success:false,message:er.response?.data?.message||'something went wrong'}
    }
}

export const getOverview=async()=>{
    try {
        let result;
        result=await apiCall('GET','/api/v1/auth/dashboard_overview',null);
        return result;
    } catch (er) {
        return {success:false,message:er.response?.data?.message||'something went wrong'};
    }
}