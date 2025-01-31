import React from 'react';
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className='w-full h-screen overflow-hidden'>
        <Navbar/>
        <div className='flex h-full'>
            <Sidebar/>
            <div className='p-3 bg-gray-100 flex-1'>
               <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard
