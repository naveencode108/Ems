import express from 'express';
import { addSalary, getEmployeeSalaryHistory, getSalaryHistory } from '../controllers/salaryController.js';

const router=express.Router();

router.post('/add_salary',addSalary);
router.post('/get_salary_history',getSalaryHistory);

router.post('/get_employe_salary_history',getEmployeeSalaryHistory);
export default router;