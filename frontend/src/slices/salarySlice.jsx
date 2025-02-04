import {createSlice} from '@reduxjs/toolkit';

const initialState={
    salaryData:null,
    loading:false,
}

const salarySlice=createSlice({
    name:'salary',
    initialState,
    reducers:{
        setSalary:(state,action)=>{
            state.salaryData=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
    }
    }
})

export const {setSalary,setLoading}=salarySlice.actions;

export default salarySlice.reducer;