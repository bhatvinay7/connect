import useAuth from "../fetch/useAuth.js";
import {useEffect,useState}from 'react';
import {Outlet,Navigate,useLocation}from 'react-router-dom';
export default  function AuthRequire(){
    const [isLoading,setLoading]=useState(true);
 
    const {auth,setAuth}=useAuth();
    const location=useLocation();
   
return(
     <>
      {auth?.userId ?<Outlet/>
     :<Navigate to="/login" state={{from:location}} replace/>  
      }
     </>
 
 )
}
