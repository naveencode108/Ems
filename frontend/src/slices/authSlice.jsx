import { createSlice } from "@reduxjs/toolkit";

const initialState={
     user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
     token:localStorage.getItem('token')?localStorage.getItem('token'):null,
     loading:false
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
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        }
    }
})

export const {setUser,setToken,setLoading}=authSlice.actions;
export default authSlice.reducer;