import express from 'express';
import { addEmployee, deleteEmployee, getAllEmployees, getEmployeeByUserId, updateEmployee } from '../controllers/employeeController.js';

const router=express.Router();

// admin routes
router.post('/add_employee',addEmployee);
router.post('/delete_employee',deleteEmployee);
router.get('/get_all_employees',getAllEmployees);
router.put('/update_employee',updateEmployee);
// -----------


router.get('get_employee_by_id',getEmployeeByUserId);


export default router;