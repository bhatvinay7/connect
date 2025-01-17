import React from 'react'
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { Form, useActionData, Link, redirect, Navigate } from 'react-router-dom';
import PopUpSuccessCard from './PopUpSuccessCard.jsx';
import PopFailureCard from './PopUpFailureCard.jsx';
import { login, updateUser } from '../fetch/login.js';

import usePopUpHandler from '../fetch/useHandlePopUp.js'
 
export async function action(obj) {
  const formData = await obj.request.formData();
  const email = formData.get('email')
  const password = formData.get('password')
  const role=formData.get("role")
  try {
    const response = await updateUser({ email, password,role });
    
    return response.data
  }
  catch (err) {
    console.log(err)
    return err.response.data
  }
}
export default function Access() {
  const {visible,setVisible}=usePopUpHandler();
  const message=useActionData();
  useEffect(()=>{
   
    if(message){
      setVisible(true)
    }
  },[message])

  return (
    <div className=" relative inset-0 top-16 md:top-24 flex flex-col m-auto justify-center items-center w-full min-w-[280px] h-auto bg-gradient-to-br from-black via-slate-900 to-slate-700  " >
<div className={`absolute -top-full   w-0 flex flex-col justify-center items-center ${message ?" transition-all duration-1000 ease-in w-full top-2  ":""} `}>  
<PopUpSuccessCard
  message={message}
  visible={visible}
/>
<PopFailureCard
  message={message}
  visible={visible}
/>
</div> 
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="w-full m-auto mx-4 box-border shadow-2xl bg-slate-500 rounded sm:px-4  md: p-8 md:max-w-2xl 2xl:w-2/5">
          <h1 className="text-center mb-4 text-base sm:text-3xl md:text-2xl text-white">Register</h1>
          <div className=" flex flex-col justify-center items-center w-full">
            <Form className="flex flex-col justify-center items-center w-full" method="patch" >
              <input className="p-3 mb-3 w-4/5 text-base rounded sm:max-w-sm md:max-w-[320px] " type='email' name='email' placeholder='Email address' autoFocus />
              <input className="p-3 mb-3 w-4/5 text-base rounded sm:max-w-sm md:max-w-[320px] " type='password' name='role' placeholder='role'/>
              <input className="p-3 mb-3 w-4/5 text-base rounded sm:max-w-sm md:max-w-[320px] " type='password' name='password' placeholder='password' />
              <button className="text-base sm:text-base w-1/2  p-3 rounded mb-5 mt-3 hover:ring ring-teal-500 ring-offset-2 bg-teal-600 hover:bg-teal-200 hover:rounded-md sm:w-1/4  md:w-3/12 " >Sign In</button>
            </Form>
            <div className="mb-4 text-lg md:text-base text-white ">Already have a Account ? <Link className="text-blue-300" to="/login">Login now</Link></div>
          </div>
        </div>
      </div>
    </div >
  )
}