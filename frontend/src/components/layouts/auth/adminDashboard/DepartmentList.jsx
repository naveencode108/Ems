import React, { useEffect, useState } from "react";
import AddDepartMent from "./DepartmentAddEdit/AddDepartMent";
import {
  deleteDepartment,
  getDepartment,
} from "../../../../services/actions/departmentApi";
import { useDispatch, useSelector } from "react-redux";
import { setDepartMent, setLoading } from "../../../../slices/departmentSlice";
import EditDepartment from "./DepartmentAddEdit/EditDepartment";
import toast from "react-hot-toast";

const DepartmentList = () => {
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [editDepartment, setEditDepartment] = useState(false);
  const [editData, setEditData] = useState(null);

  const { departmentData, loading } = useSelector((state) => state.department);
  const dispatch = useDispatch();

  const handleDelete = async (departmentId) => {
    let result = await deleteDepartment(departmentId);
    if (result?.data?.success) {
      let filterData = departmentData.filter(
        (item) => item._id !== departmentId
      );
      dispatch(setDepartMent(filterData));
      toast.success(result.data.message);
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchDepartment = async () => {
      let result = await getDepartment();
      if (result.data.success) {
        dispatch(setLoading(false));
        dispatch(setDepartMent(result.data.data));
      }
    };
    fetchDepartment();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen grid place-content-center text-2xl">
        Loading..
      </div>
    );

  return (
    <>
      {showAddDepartment && (
        <AddDepartMent onClick={() => setShowAddDepartment(false)} />
      )}

      {editDepartment && (
        <EditDepartment
          onClick={() => setEditDepartment(false)}
          editData={editData}
        />
      )}
      <div className="w-full h-[calc(100vh-100px)] overflow-y-auto">
        <h1 className="text-3xl text-center my-4">Manage Department</h1>

        <div className="flex justify-between items-center px-5">
          <input
            type="text"
            placeholder="Search here"
            className="bg-gray-100 text-gray-700 outline-none ring-1 rounded-md py-2 px-1"
          />
          <button
            onClick={() => setShowAddDepartment(true)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-md shadow"
          >
            Add Department
          </button>
        </div>

        <div className="w-full p-3">
          <table className="w-full text-center">
            <thead className="border-b-[1px] border-b-gray-500">
              <tr className="">
                <th className="px-4 py-2">Sno</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departmentData && departmentData.length > 0 ? (
                departmentData.map((item, index) => (
                  <tr key={index} className="border-b-[1px] border-b-gray-500">
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{item.name}</td>
                    <td className="px-4 py-4 space-x-4">
                      <button
                        onClick={() => {
                          setEditDepartment(true);
                          setEditData(item);
                        }}
                        className="px-2 capitalize  py-1 rounded-full bg-green-400"
                      >
                        edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-2 capitalize py-1 rounded-full bg-red-400"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No data yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DepartmentList;
