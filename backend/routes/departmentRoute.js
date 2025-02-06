import express from 'express';
import { addDepartment, deleteDepartment, getAllDepartment, updateDepartment } from '../controllers/departmentController.js';
import { isAuth } from '../middleware/isAuth.js';

const router=express.Router();

router.post('/add_department',isAuth,addDepartment);
router.get('/get_all_department',isAuth,getAllDepartment);
router.delete('/delete_department',isAuth,deleteDepartment);
router.put('/update_department',isAuth,updateDepartment);


export default router;