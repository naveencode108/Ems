import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    let {token}=useSelector(state=>state.auth);
  return token? children :<Navigate to='/login' />
}

export default ProtectedRoutes
