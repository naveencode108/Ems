import {apiCall} from '../apiCall';

export const login=async(data,token)=>{
    try {
        let headers={
            'Authorization': `Bearer ${token}`
        }
        let result;
        result=await apiCall('POST','/api/v1/auth/login',headers,data);
        return result;
        
    } catch (er) {
        return {success:false,message:er.response?.data?.message||'something went wrong'}
    }
}

export const getOverview=async(token)=>{
    try {
        let headers={
            'Authorization': `Bearer ${token}`
        }
        let result;
        result=await apiCall('GET','/api/v1/auth/dashboard_overview',headers);
        return result;
    } catch (er) {
        return {success:false,message:er.response?.data?.message||'something went wrong'};
    }
}