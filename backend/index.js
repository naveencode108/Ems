import 'dotenv/config';
import express from 'express';
import authRoute from './routes/authRoute.js';
import employeeRoute from './routes/employeeRoute.js';
import leaveRoute from './routes/leaveRoute.js';
import departmentRoute from './routes/departmentRoute.js';
import salaryRoute from './routes/salaryRoute.js';
import cors from 'cors';
import { connectDB } from './config/db.js';

const app=express();

app.use(cors({
    methods:['GET','POST','PUT','DELETE'],
    origin:'http://localhost:5173'
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/v1/auth',authRoute);
app.use('/api/v1/employee',employeeRoute);
app.use('/api/v1/leave',leaveRoute);
app.use('/api/v1/department',departmentRoute);
app.use('/api/v1/salary',salaryRoute);


connectDB();

app.listen(1008,()=>{
    console.log('Server is running..');
})
