import React from "react";
import AdminDashboard from "./pages/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import MyDashBoard from "./components/layouts/auth/adminDashboard/MyDashBoard";
import EmployeeList from "./components/layouts/auth/adminDashboard/EmployeeList";
import DepartmentList from "./components/layouts/auth/adminDashboard/DepartmentList";
import LeaveList from "./components/layouts/auth/adminDashboard/LeaveList";
import Salary from "./components/layouts/auth/adminDashboard/Salary";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/layouts/auth/ProtectedRoutes";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Dashboard from "./components/layouts/employeeDashboard/Dashboard";
import Profile from "./components/layouts/employeeDashboard/Profile";
import Leave from "./components/layouts/employeeDashboard/Leave";
import EmployeeSalary from "./components/layouts/employeeDashboard/Salary";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={<ProtectedRoutes><AdminDashboard /></ProtectedRoutes>}>
        <Route path="/" element={<MyDashBoard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/leaves" element={<LeaveList />} />
        <Route path="/salary" element={<Salary />} />
      </Route>

      {/* employee dashboard */}

      <Route element={<EmployeeDashboard />}>
        <Route path="/employee-dashboard" element={<Dashboard />} />
        <Route path="/employee-profile" element={<Profile />} />
        <Route path="/employee-leave" element={<Leave />} />
        <Route path="/employee-salary" element={<EmployeeSalary />} />
      </Route>
    </Routes>
  );
};

export default App;
