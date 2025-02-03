import {createSlice} from '@reduxjs/toolkit';

const initialState={
    salaryData:null
}

const salarySlice=createSlice({
    name:'salary',
    initialState,
    reducers:{
        setSalary:(state,action)=>{
            state.salaryData=action.payload
        }
    }
})

export const {setSalary}=salarySlice.actions;

export default salarySlice.reducer;