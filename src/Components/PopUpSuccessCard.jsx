import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons';
export default function PopUpSuccessCard({message,visible}){
    return (
      <>
{visible && message?.userId ? <div className= "  relative border-2 border-gray-200  bg-slate-200  shadow-2xl shadow-gray-800   w-[220px] sm:min-w-[360px] m-2   h-40 rounded-md text-center place-content-center  top-40 left-auto right-auto  " >
    <div className=" absolute -top-6 left-6 right-6 ">
   <FontAwesomeIcon className=' text-6xl z-30 shadow-md shadow-gray-700 rounded-full ' icon={faCircleCheck}  style={{color: "#3bf160",}} />
   </div>
     { message?.userId ? (
       <div className='w-full h-auto text-base font-bold' >{message.message}</div>
     ) :<></>}
   </div> :<></>}
   </>
    )
}