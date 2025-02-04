import User from "./models/User.js";
import bcrypt from 'bcrypt';

export const createAdmin=async()=>{
     try {

        let pass=await bcrypt.hash('1234',10);
         
        let admin=await User.create({
            name:'naveen',
            email:'naveen@gmail.com',
            password:pass,
            role:'admin'
        })

        if(admin){
            console.log('admin created');
        }
     } catch (er) {
         console.log(er);
     }
}