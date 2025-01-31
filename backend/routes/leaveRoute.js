import express from 'express';
import { addLeave, changeLeaveStatus, getAllLeaves, getEmployeeLeaves } from '../controllers/leaveController';

const router=express.Router();


router.post('/add_leave',addLeave);
router.get('/get_employee_leave',getEmployeeLeaves);

router.get('/get_all_leaves',getAllLeaves);

router.post('/change_leave_status',changeLeaveStatus);





export default router;