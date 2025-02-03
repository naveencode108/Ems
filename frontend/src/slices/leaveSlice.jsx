import { createSlice } from "@reduxjs/toolkit";

const initialState={
    leaveData:null
}

const leaveSlice=createSlice({
    name:'leave',
    initialState,
    reducers:{
        setLeave:(state,action)=>{
            state.leaveData=action.payload
        }
    }
});

export const {setLeave}=leaveSlice.actions;

export default leaveSlice.reducer;