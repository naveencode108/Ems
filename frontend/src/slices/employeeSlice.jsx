import { createSlice } from "@reduxjs/toolkit";

const initialState={
    employeeData:null,
    loading:false
}

const employeeSlice=createSlice({
    name:'employee',
    initialState,
    reducers:{
        setEmployee:(state,action)=>{
            state.employeeData=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
})

export const {setEmployee,setLoading}=employeeSlice.actions;
export default employeeSlice.reducer;