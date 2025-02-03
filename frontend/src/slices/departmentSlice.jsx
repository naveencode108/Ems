import {createSlice} from '@reduxjs/toolkit';

const initialState={
    departmentData:null,
    loading:false
}

const departmentSlice=createSlice({
    name:'department',
    initialState,
    reducers:{
        setDepartMent:(state,action)=>{
            state.departmentData=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
});

export const {setDepartMent,setLoading}=departmentSlice.actions;

export default departmentSlice.reducer;