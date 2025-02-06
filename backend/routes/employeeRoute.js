import express from 'express';
import { addEmployee, deleteEmployee, getAllEmployees, getEmployeeByUserId, updateEmployee } from '../controllers/employeeController.js';
import { isAuth } from '../middleware/isAuth.js';

const router=express.Router();

// admin routes
router.post('/add_employee',isAuth,addEmployee);
router.post('/delete_employee',isAuth,deleteEmployee);
router.get('/get_all_employees',isAuth,getAllEmployees);
router.put('/update_employee',isAuth,updateEmployee);
// -----------

router.post('/get_employee_by_id',isAuth,getEmployeeByUserId);


export default router;