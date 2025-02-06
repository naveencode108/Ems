import EmployeeForm from "./EmployeeForm";
const AddEmployee = ({ onClick ,token}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center transition-all ease-linear">
      <div className="p-4 w-[50rem] bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl mb-2  border-b border-gray-700 ">
          Add Employee
        </h1>
        <EmployeeForm type={"ADD"} onClose={onClick} token={token}/>
      </div>
    </div>
  );
};

export default AddEmployee;
