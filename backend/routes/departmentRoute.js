import express from 'express';
import { addDepartment, deleteDepartment, getAllDepartment, updateDepartment } from '../controllers/departmentController.js';

const router=express.Router();

router.post('/add_department',addDepartment);
router.get('/get_all_department',getAllDepartment);
router.delete('/delete_department',deleteDepartment);
router.put('/update_department',updateDepartment);


export default router;