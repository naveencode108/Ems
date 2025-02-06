import express from 'express';
import { dashboardOverview, login } from '../controllers/authController.js';
import { isAuth } from '../middleware/isAuth.js';

const router=express.Router();

router.post('/login',login);
router.get('/dashboard_overview',isAuth,dashboardOverview);

export default router;
