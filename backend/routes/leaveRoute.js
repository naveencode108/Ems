import express from 'express';
import { addLeave, changeLeaveStatus, getAllLeaves, getEmployeeLeaves } from '../controllers/leaveController.js';

const router=express.Router();


router.post('/add_leave',addLeave);
router.post('/get_employee_leave',getEmployeeLeaves); // will  change the method post to get later when create middleware

router.get('/get_all_leaves',getAllLeaves);

router.post('/change_leave_status',changeLeaveStatus);





export default router;