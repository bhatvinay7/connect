<<<<<<< HEAD
import axios from './axios';
const login=async ({email,password})=>{
    try{
    const body={'email':email,'password':password}   
   const response=await axios.post('/api/login',JSON.stringify(body),{headers:{"Content-Type":'application/json'},
=======
import myaxios from './axios';
const login=async ({email,password})=>{
    try{
    const body={'email':email,'password':password}   
   const response=await myaxios.post('/api/login',JSON.stringify(body),{headers:{"Content-Type":'application/json'},
>>>>>>> 026f6a24fb5288054bc3d3fdf8d46e487398fcf1
withCredentials:true}

   );
   return response?.data;
    }
    catch(err){
        throw err
}
}
const signin=async ({email,password})=>{
    try{
    const body={'email':email,'password':password}   
   const response=await axios.post('/api/signin',JSON.stringify(body),{
    headers:{"Content-Type":'application/json'},withCredentials:true
   });
   return response;
    }
    catch(err){
        throw err
    }
}

const updateUser=async ({email,role})=>{
    try{
    const body={'email':email,'role':role}   
<<<<<<< HEAD
   const response=await axios.patch('/api/updateUser',JSON.stringify(body),{
=======
   const response=await myaxios.patch('/api/updateUser',JSON.stringify(body),{
>>>>>>> 026f6a24fb5288054bc3d3fdf8d46e487398fcf1
    headers:{"Content-Type":'application/json'},withCredentials:true
   });
   return response;
    }
    catch(err){
        return err
    }
}

export {signin,login,updateUser};