import express from 'express';
import { addLeave, changeLeaveStatus, getAllLeaves, getEmployeeLeaves } from '../controllers/leaveController.js';
import { isAuth } from '../middleware/isAuth.js';

const router=express.Router();


router.post('/add_leave',isAuth,addLeave);
router.post('/get_employee_leave',isAuth,getEmployeeLeaves); // will  change the method post to get later when create middleware

router.get('/get_all_leaves',isAuth,getAllLeaves);

router.post('/change_leave_status',isAuth,changeLeaveStatus);





export default router;