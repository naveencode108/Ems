import express from 'express';
import { dashboardOverview, login } from '../controllers/authController.js';

const router=express.Router();

router.post('/login',login);
router.get('/dashboard_overview',dashboardOverview);

export default router;
