import React from 'react'
import AdminDashboard from './pages/AdminDashboard'
import {Routes,Route} from 'react-router-dom';
import MyDashBoard from './components/layouts/auth/adminDashboard/MyDashBoard';
import EmployeeList from './components/layouts/auth/adminDashboard/EmployeeList';
import DepartmentList from './components/layouts/auth/adminDashboard/DepartmentList';

const App = () => {
  return (
    <Routes>
       <Route element={<AdminDashboard/>}>
           <Route path='/' element={<MyDashBoard/>} />
           <Route path='/employees' element={<EmployeeList/>}/>
           <Route path='/departments' element={<DepartmentList/>}/>
           <Route path='/leaves'/>
       </Route>
    </Routes>
  )
}

export default App
