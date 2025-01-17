import axios from './axios';
const login=async ({email,password})=>{
    try{
    const body={'email':email,'password':password}   
   const response=await axios.post('/api/login',JSON.stringify(body),{headers:{"Content-Type":'application/json'},
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
   const response=await axios.patch('/api/updateUser',JSON.stringify(body),{
    headers:{"Content-Type":'application/json'},withCredentials:true
   });
   return response;
    }
    catch(err){
        return err
    }
}

export {signin,login,updateUser};