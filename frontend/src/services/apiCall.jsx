import axios from 'axios';

export const axiosInstance=axios.create({});
const baseUrl=import.meta.env.VITE_BASE_URL;

export const apiCall=(method,url,headers,data,params)=>{
     return axiosInstance({
        method:method?method:null,
        url:baseUrl+url,
        headers:headers?headers:null,
        data:data?data:null,
        params:params?params:null
     })
}
