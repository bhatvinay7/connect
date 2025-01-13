import React from 'react';
import {useState,useEffect} from 'react';
const useHandlePopUp=()=>{

    const [visible,setVisible ]=useState(false);
    useEffect(()=>{
        
       const t= setTimeout(()=>{
           setVisible(false)
        },4000) 
 
       return ()=>{
        clearInterval(t)
       }
    },[visible])
   return {visible,setVisible}
}
export default useHandlePopUp;