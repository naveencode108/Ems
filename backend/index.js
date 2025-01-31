import 'dotenv/config';
import express from 'express';
import authRoute from './routes/authRoute.js'
import employeeRoute from './routes/employeeRoute.js'
import leaveRoute from './routes/leaveRoute.js'
import departmentRoute from './routes/departmentRoute.js'

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/v1/auth',authRoute);
app.use('/api/v1/employee',employeeRoute);
app.use('/api/v1/leave',leaveRoute);
app.use('/api/v1/department',departmentRoute);


app.listen(1008,()=>{
    console.log('Server is running..');
})
