import React from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark } from '@fortawesome/free-solid-svg-icons';
export default function PopFailureCard({ message,visible}){
  return (
     <>
      {visible && (message?.password || message?.emailId) ? <div className=" border-2 border-red-300 bg-red-50 flex justify-center items-center gap-2   relative  shadow-xl  min-w-[260px] sm:min-w-[360px] m-2 h-auto p-4 sm:p-6 rounded-md text-center place-content-center  top-40 left-auto right-auto  " >
        <FontAwesomeIcon className=' text-4xl z-30 shadow-md shadow-gray-700 rounded-full' icon={faCircleXmark} style={{color: "#f7020f",}} />
        {message?.emailId || message?.password ? (
          <div className='  w-full h-auto text-base font-bold  '>
            <div className='text-red-500'>
              {message?.emailId ? message.emailId : <></>}
            </div>
            <div className='text-red-500'>
              {message?.password ? message.password : <></>}
            </div>
          </div>
        ):<></>
      }  
    </div>: <></>}
      </>
    )
}

