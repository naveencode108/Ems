import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import employeeSlice from './slices/employeeSlice';
import departmentSlice from './slices/departmentSlice';

export const store=configureStore({
    reducer:{
        auth:authSlice,
        employee:employeeSlice,
        department:departmentSlice
    }
})