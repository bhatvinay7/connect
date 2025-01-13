import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faUserPlus } from '@fortawesome/free-solid-svg-icons';
function Form({id,mobileNumber,participantName,usnNum,emailId,Length,handleChange,handleDelete}){
  return (
    <div  className="w-full flex flex-col  justify-center items-center  xl:w-3/4 xl:flex xl:flex-row xl:items-start xl:justify-start ">
    <input type='text' autoComplete="off" className=" w-3/5 outline-blue-200 hover:ring-4 hover:ring-emerald-100 ml-8 md:ml-8 rounded-lg mb-4 mr-2 sm:w-1/2  md:max-w-md xl:min-w-64 2xl:max-w-80 2xl:min-w-80 p-3" name="participantName" onChange={(e) => handleChange(e, id)} value={participantName} placeholder="username" required></input>
    <input type='text 'autoComplete="off" className=" w-3/5  outline-blue-200 hover:ring-4 hover:ring-emerald-100  ml-8  rounded-lg mb-4 mr-2 sm:w-1/2 md:max-w-md xl:min-w-64 2xl:max-w-80 2xl:min-w-80 p-3" name="usnNum" onChange={(e) => handleChange(e, id)} value={usnNum} placeholder="student usn num" required></input>
    <input type='email' autoComplete='off' className="w-3/5  outline-blue-200 hover:ring-4 hover:ring-emerald-100 ml-8 md:ml-8 rounded-lg mb-4 mr-2 sm:w-1/2 md:max-w-md xl:min-w-64 2xl:max-w-80 2xl:min-w-80 p-3" name="emailId" onChange={(e) => handleChange(e, id)} value={emailId} placeholder="email id" required></input>
    <input type='text' autoComplete='off' className="w-3/5  outline-blue-200 hover:ring-4 hover:ring-emerald-100 ml-8 md:ml-8 rounded-lg mb-4 mr-2 sm:w-1/2 md:max-w-md xl:min-w-64 2xl:max-w-80 2xl:min-w-80 p-3" name="mobileNumber" onChange={(e) => handleChange(e, id)} placeholder="mobile number" value={mobileNumber} required></input>
    {Length > 1 ? <button  onClick={(e) =>handleDelete(e,id)} className="self-center ml-64 sm:ml-96 xl:ml-0  md:my-auto pb-4" ><FontAwesomeIcon icon={faTrashCan} size="xl" /></button> : null}
    </div>
  )
}
export default Form
 