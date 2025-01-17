import useAuth from "../fetch/useAuth.js";
import {useEffect,useState}from 'react';
import {Outlet,Navigate,useLocation}from 'react-router-dom';
export default  function AccessAuth({roles}){
    const Userroles=roles.split(',')
    const [isLoading,setLoading]=useState(true);
 
    const {auth,setAuth}=useAuth();
    const location=useLocation();
return(
     <>
     
       {Array.isArray(Userroles)&& Userroles?.some(role => auth?.roles?.includes(role)) ?<Outlet/>
     :<Navigate to="/login" state={{from:location}} replace/>  
      } 
     </>
 
 )
}