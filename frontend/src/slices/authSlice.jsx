import { createSlice } from "@reduxjs/toolkit";

const initialState={
     user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
     token:localStorage.getItem('token')?localStorage.getItem('token'):null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setToken:(state,action)=>{
            state.token=action.payload;
        }
    }
})

export const {setUser,setToken}=authSlice.actions;
export default authSlice.reducer;