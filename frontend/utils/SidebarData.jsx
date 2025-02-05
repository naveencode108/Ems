import { MdDashboard } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaBuilding } from "react-icons/fa";
import { MdWorkOff } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

export const SideData = [
  { title: "Dashboard", path: "/", icon: <MdDashboard />, role: "admin" },
  {
    title: "Employees",
    path: "/employees",
    icon: <PiUsersThreeFill />,
    role: "admin",
  },
  {
    title: "Departments",
    path: "/departments",
    icon: <FaBuilding />,
    role: "admin",
  },
  { title: "Leaves", path: "/leaves", icon: <MdWorkOff />,role:'admin' },
  {
    title: "Salary",
    path: "/salary",
    icon: <RiMoneyRupeeCircleFill />,
    role: "admin",
  },
  //  employeeData
  {
    title: "Dashboard",
    path: "/employee-dashboard",
    icon: <MdDashboard />,
    role: "employee",
  },
  {
    title: "My Profile",
    path: "/employee-profile",
    icon: <PiUsersThreeFill />,
    role: "employee",
  },
  {
    title: "Leave",
    path: "/employee-leave",
    icon: <MdWorkOff />,
    role: "employee",
  },
  {
    title: "Salary",
    path: "/employee-salary",
    icon: <RiMoneyRupeeCircleFill />,
    role: "employee",
  },
];
