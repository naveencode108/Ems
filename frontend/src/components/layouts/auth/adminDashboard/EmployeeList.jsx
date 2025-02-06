import React, { useEffect, useState } from "react";
import { getAllEmployee } from "../../../../services/actions/employeeApi";
import AddEmployee from "./EmployeeAddEdit/AddEmployee";
import { useDispatch, useSelector } from "react-redux";
import { setEmployee } from "../../../../slices/employeeSlice";
import ViewEmployeeDetails from "./EmployeeAddEdit/ViewEmployeeDetails";
import EditEmployee from "./EmployeeAddEdit/EditEmployee";
import ShowSalaryHistory from "./Salary/ShowSalaryHistory";
import LeaveHistory from "./Leave/LeaveHistory";

const EmployeeList = () => {
  const [showAddEmployee, setshowAddEmployee] = useState(false);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [showEmployeeData, setShowEmployeeData] = useState(null);
  const [editEmployee, setEditEmployee] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [showSalary, setShowSalary] = useState(false);
  const [showLeave,setShowLeave]=useState(false);

  const { employeeData } = useSelector((state) => state.employee);
  const {token}=useSelector(state=>state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllEmployee = async () => {
      let result = await getAllEmployee(token);
      if (result.data.success) {
        dispatch(setEmployee(result.data.data));
      }
    };
    fetchAllEmployee();
  }, []);

  return (
    <>
      {showAddEmployee && (
        <AddEmployee onClick={() => setshowAddEmployee(false)}  token={token}/>
      )}

      {showEmployeeDetails && (
        <ViewEmployeeDetails
          onClose={() => setShowEmployeeDetails(false)}
          data={showEmployeeData}
         />
      )}

      {editEmployee && (
        <EditEmployee
          data={editEmployeeData}
          onClose={() => setEditEmployee(false)}
        token={token} />
      )}

      {showSalary&&
       <ShowSalaryHistory onClose={()=>setShowSalary(false)} data={showEmployeeData} token={token}/>
      }

      {showLeave&&
       <LeaveHistory onClose={()=>setShowLeave(false)} data={showEmployeeData} token={token}/>
      }

      <div className="w-full h-[calc(100vh-100px)] overflow-y-auto ">
        <h1 className="text-3xl text-center my-4">Manage Employee</h1>

        <div className="flex justify-between items-center px-5">
          <input
            type="text"
            placeholder="Search here"
            className="bg-gray-100 text-gray-700 outline-none ring-1 rounded-md py-2 px-1"
          />
          <button
            onClick={() => setshowAddEmployee(true)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-md shadow"
          >
            Add Employee
          </button>
        </div>

        <div className="w-full p-3">
          <table className="w-full text-center">
            <thead className="border-b-[1px] border-b-gray-500">
              <tr className="">
                <th className="px-4 py-2">Sno</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">DOB</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeData &&
                employeeData.map((item, index) => (
                  <tr key={index} className="border-b-[1px] border-b-gray-500">
                    <td className="px-4 py-4 text-sm">{index + 1}</td>
                    <td className="px-4 py-4 text-sm">{item?.userId?.name}</td>
                    <td className="px-4 py-4 text-sm">{item?.userId?.name}</td>
                    <td className="px-4 py-4 text-sm">
                      {item.dateOfBirth.split("T")[0]}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {item.departmentId.name}
                    </td>
                    <td className="px-4 py-4 space-x-2">
                      <button
                        onClick={() => {
                          setShowEmployeeDetails(true);
                          setShowEmployeeData(item);
                        }}
                        className="px-3 py-1 text-sm rounded-lg bg-sky-500 "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setEditEmployeeData(item);
                          setEditEmployee(true);
                        }}
                        className="px-3 text-sm py-1 rounded-lg bg-green-500 "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setShowSalary(true);
                          setShowEmployeeData(item);
                        }}
                        className="px-3 text-sm py-1 rounded-lg bg-yellow-500 "
                      >
                        Salary
                      </button>
                      <button onClick={()=>{
                         setShowLeave(true);
                         setShowEmployeeData(item);
                      }} className="px-3 text-sm py-1 rounded-lg bg-red-500 ">
                        Leave
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
