import React from 'react';
import { Outlet } from 'react-router-dom';
import { useEffect,useState } from 'react';
import useAuth from '../fetch/useAuth';
import useRefreshToken from '../fetch/useRefreshToken';
import PropagateLoader from "react-spinners/PropagateLoader";
import Footer from './Footer';

export default function PersistantLogin(){
    const [isLoading,setLoading]=useState(true);
    const {auth}=useAuth();
    const refresh=useRefreshToken();

    useEffect(()=>{
      async  function verifyRefreshToken(){
       try{
          await refresh();
       }
       catch(err){
        console.log(err);
       }
       finally{
        setLoading(false);
       }
    }
    !auth?.accessToken ?verifyRefreshToken():setLoading(false);

    },[])
    return(
        <div className="flex justify-center w-full min-h-screen items-center m-auto">
        {isLoading?<PropagateLoader
        size={30}
        color={"#87CEEB"}
        />:<div className='w-full min-h-screen flex flex-col'>
        <Outlet/>
        <Footer/>  
        </div>
        }
        </div>
    )
}