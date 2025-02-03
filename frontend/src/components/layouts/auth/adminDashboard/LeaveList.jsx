import React, { useEffect } from 'react'
import { getAllLeave } from '../../../../services/actions/leaveApi'
import { useDispatch, useSelector } from 'react-redux'
import {setLeave} from '../../../../slices/leaveSlice';

const LeaveList = () => {

    const {leaveData} =useSelector(state=>state.leave);

    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchLeave=async()=>{
            let result=await getAllLeave();
            if(result.data.success){
                dispatch(setLeave(result.data.data));
            }
        }
        fetchLeave();
    },[])

  return (
    <div className="w-full h-[calc(100vh-100px)] overflow-y-auto ">
    <h1 className="text-3xl text-center my-4">Manage Leaves</h1>

    <div className="flex justify-between items-center px-5">
      <input
        type="text"
        placeholder="Search here"
        className="bg-gray-100 text-gray-700 outline-none ring-1 rounded-md py-2 px-1"
      />
    
    </div>

    <div className="w-full p-3">
      <table className="w-full text-center">
        <thead className="border-b-[1px] border-b-gray-500">
          <tr className="">
            <th className="px-4 py-2 text-sm">Sno</th>
            <th className="px-4 py-2 text-sm">Name</th>
            <th className="px-4 py-2 text-sm">Department</th>
            <th className="px-4 py-2 text-sm">Days</th>
            <th className="px-4 py-2 text-sm">Status</th>
            <th className="px-4 py-2 text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
            {leaveData&&leaveData.length>0?leaveData.map((item,index)=>(
                <tr className="border-b-[1px] border-b-gray-500">
                <td className="px-4 py-4 text-sm">{index+1}</td>
                <td className="px-4 py-4 text-sm">{item.userId.name}</td>
                <td className="px-4 py-4 text-sm">{item.departmentId.name}</td>
                <td className="px-4 py-4 text-sm">{item.startDate.splie('T')[0]-item.endDate.splie('T')[0]}</td>
              </tr>
            )):
             <tr>
                <td>No data yet.</td>
             </tr>
            }
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default LeaveList
