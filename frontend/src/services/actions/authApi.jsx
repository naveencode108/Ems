import toast from 'react-hot-toast';

export const login=async()=>{
    try {
        
    } catch (er) {
        console.log(er.message);
        toast.error(er.message);
    }
}