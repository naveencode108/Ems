import toast from "react-hot-toast";
import { apiCall } from "../apiCall";

export const addSalary = async (data, token) => {
  try {
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let result;
    result = await apiCall("POST", "/api/v1/salary/add_salary", headers, data);
    return result;
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};

export const getSalary = async (data, token) => {
  try {
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let result;
    result = await apiCall(
      "POST",
      "/api/v1/salary/get_salary_history",
      headers,
      data
    );
    return result;
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};

export const getEmployeeSalary = async (data, token) => {
  try {
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let result;
    result = await apiCall(
      "POST",
      "/api/v1/salary/get_employe_salary_history",
      headers,
      data
    );
    return result;
  } catch (er) {
    return { success: false, message: er.respnse?.data?.message };
  }
};
