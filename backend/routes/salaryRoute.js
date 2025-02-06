import express from 'express';
import { addSalary, getEmployeeSalaryHistory, getSalaryHistory } from '../controllers/salaryController.js';
import { isAuth } from '../middleware/isAuth.js';

const router=express.Router();

router.post('/add_salary',isAuth,addSalary);
router.post('/get_salary_history',isAuth,getSalaryHistory);

router.post('/get_employe_salary_history',isAuth,getEmployeeSalaryHistory);
export default router;