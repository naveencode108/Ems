import React from 'react'
import SalaryForm from './Salary/SalaryForm'

const Salary = () => {
  return (
    <div className="w-full h-full overflow-y-auto bg-gray-200 px-8 py-6" >
    <div className="w-full rounded-md p-4 bg-white">
        <h1 className="text-2xl mb-4 font-semibold">Add Salary</h1>
            <SalaryForm/>
      </div>
  </div>
  )
}

export default Salary
