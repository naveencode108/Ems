import express from 'express';
import { addSalary, getSalaryHistory } from '../controllers/salaryController.js';

const router=express.Router();

router.post('/add_salary',addSalary);
router.post('/get_salary_history',getSalaryHistory);

export default router;