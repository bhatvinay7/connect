import React from "react";
import ReactDOM from "react-dom";
// import {Form } from "react-router-dom";
import useAuth from "../fetch/useAuth.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from "react";
//import "./Styles/Registration.css";
import Form from './Form.jsx';
import axios from '../fetch/axios.js'
import useAxiosPrivate from '../../../DB/useAxiosPrivate.js';
export default function Registration({eventType}){
  const {auth}=useAuth()
  const axiosPrivate=useAxiosPrivate()
  const [confirmEmailSent,setConfirmEmailSent]=useState(null)
  const [Loading,setLoading]=useState(false);
  const [isSuccessful,SetSuccessful]=useState(false);
  const [errorResponse,setError]=useState("");
  const [groupNameFieldValue, setGroupNameField] = useState({ groupName: "" });
  const [inputfields, setinputfields] = useState([{
    emailId: "", participantName: "",usnNum:"", mobileNumber: ""
  }]);

  const [registationData,setRigistrationData]=useState(null)

  function handleChange(e,index){
    const Fields = [...inputfields]
    Fields[index] = { ...Fields[index], [e.target.name]: e.target.value };
    setinputfields(Fields)
  }
  async function  handleSubmit(e) {
    e.preventDefault();
   console.log(inputfields )
    const body = {eventType:eventType, groupName: groupNameFieldValue.groupName, participantDetails: inputfields }
    try{
      setLoading(true);
    const response=await axiosPrivate.post('/api/register',body);
      setRigistrationData(response?.data)
      setTimeout(() => {
        setLoading(false);
        SetSuccessful(true);
    }, 2000); 
    }
    catch(err){
      setError(err)
    }
    finally{
      setinputfields([{emailId: "", participantName: "",usnNum:"", mobileNumber: ""}])
      setGroupNameField({ groupName: "" })
    setTimeout(() => {
      SetSuccessful(false);
      setRigistrationData(null)
  }, 6000); 
  
    }
  }

 useEffect(()=>{
     
     async function fetchData(){
      const response=await axiosPrivate.get(`/api/sendMail?eventName=${registationData}&name=${auth.userId}`)
      setConfirmEmailSent(response.data)
     }    
     try{
    if(registationData){
      fetchData()
    }
  }
  catch(err){
    setError(err.response?.data)
   } 
 },[registationData])

  function addField(e) {
    e.preventDefault();
    const allFields =[...inputfields,{
      emailId: "", participantName: "",usnNum:"", mobileNumber: ""
    }]
    setinputfields(allFields)
  }
  function handleDelete(e,id) {
    e.preventDefault();
     const ResetFields=[...inputfields]
    const filtered=ResetFields?.filter((each,index)=>{
      return  index!=id  
     })
    setinputfields(filtered)
  
  }
  function handleGroupChange(e) {
    setGroupNameField({ groupName: e.target.value })
  }
  // if(Error){
  //   return(
  //     <div className="my-4 w-fit p-6 h-20 bg-red-100 border-4 border-red-200 rounded-md flex justify-center items-center m-auto">
  //     <h1 className="text-red-500 tex-base md:text-xl lg-text-2xl">try again,network error{Error.getMessage}</h1>
  //     </div>
  //   )
  // }
  return (
    <div className=" bg-gradient-to-br from-black via-slate-900 to-slate-700  w-full flex flex-col justify-center items-center">
       <div className="text-base sm:text-2xl my-4 md:text-2xl xl:text-3xl text-purple-600 font-semibold">
      <h1 className="font-serif" >Event registration</h1>
      </div> 
     <div className={isSuccessful ? " flex  w-2/3 h-14 sm:h-14  justify-center items-center md:w-1/2 lg:w-1/4  xl:w-1/3 rounded-md mb-8 bg-green-200 border-l-8 border-t-2 border-b-2 border-r-2 border-green-300 md:h-16 md:p-10 sm:p-8" : "hidden"}> 

      <div className="text-base md:text-xl  text-green-600">Registration Successful</div>
      </div >
     {confirmEmailSent?.messageId ? <div className="text-gray-400 text-wrap w-full text-center p-2 text-base font-fontRoboto  mb-4 " >{`A confirmation email has been sent to ${auth.userId}`}</div>:errorResponse?<div className="text-red-500/75 text-wrap w-full text-center p-2 text-base font-fontRoboto  mb-4 " >{`A confirmation email has been sent to ${errorResponse}`}</div>:<></> }

      <div className="w-full">
        <form className=" w-full" onSubmit={(e) => handleSubmit(e)}>
          <div className=" w-3/5 sm:w-1/2 md:max-w-md mx-auto xl:ml-5 xl:max-w-64 2xl:max-w-80 2xl:min-w-72 mb-2 ">
          <input type="text" autoComplete="off" title="group name is optional" className=" hover:outline-blue-200 hover:ring-4 hover:ring-emerald-100 w-full ml-3 rounded-lg  none p-3 " onChange={(e) => handleGroupChange(e)} placeholder="group name" value={groupNameFieldValue.groupName}></input>
          </div>
          {inputfields?.map((inputfield,index) => {
            return (
              <Form
              key={index}
              id={index}
              participantName={inputfield?.participantName}
              emailId={inputfield?.emailId}
              mobileNumber={inputfield?.mobileNumber}
              usnNum={inputfield?.usnNum}
              handleDelete={handleDelete}
              handleChange={handleChange}
              Length={inputfields.length}
              />
             )
          }
        )
        }
        <div className="w-full flex justify-center items-center caret-transparent mb-28">
          <button type="button" onClick={(e) => addField(e)} disabled={inputfields.length>=5} className="m-4 w-fit p-2 sm:py-3 sm:px-3.5 rounded hover:bg-yellow-100 bg-yellow-200 hover:ring-2 hover:ring-amber-50 hover:ring-offset-1" ><FontAwesomeIcon className="text-xs sm:text-base" icon={faUserPlus} /></button>
          <button disabled={Loading} type="submit" className="tex-base m-4 w-fit p-2 sm:py-2 m:px-2 overflow-clip  rounded-lg hover:bg-indigo-200 bg-indigo-500 hover:ring-2 hover:ring-blue-200 hover:ring-offset-1"> {Loading ? 'Registering....' : 'Register'}</button>
          </div>
        </form>
      </div>

    </div>
  )
}
