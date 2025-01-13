import React, { useEffect } from 'react';
import {useState} from 'react'
import useAxiosPrivate from '../../../src/fetch/useAxiosPrivate.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
export default function Event({url,method,close}){
  
  const [isLoading,setLoading]=useState(false)
  const [file,setFile]=useState("")
  const [response,setResponse]=useState("")
  const [ErrResponse,setErrResponse]=useState("")
  const axiosPrivate=useAxiosPrivate()
  const [eventInfo,setEventInfo]=useState({eventName:"",headLine1:"",headLine2:"",eventType:"",organiser:"",date:"",place:""})

    function handleFileChange(e){
      setFile(e.target.files[0])
    }
    async function handleSubmit(e){
      e.preventDefault()
      try{
        const formData = new FormData();
        formData.append('Image', file); // Append the file
        formData.append('body',JSON.stringify(eventInfo))
      setLoading(true)

      if(method=='patch'){
      const response=await axiosPrivate.patch(url,formData,{headers: {
        "Content-Type": "multipart/form-data" // Only for this specific request
      }})
      setResponse(response.data)

      }
      else{
        const response=await axiosPrivate.post('/api/event/',formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Only for this specific request
          },
        })
        setResponse(response.data)
       
      }
      setLoading(false) 
      }
      catch(err){
        setErrResponse(err.response?.data)
      }
      finally{
        setLoading(false)
      }
    }
    function handleChange(e){
      const currentEventInfo=eventInfo
      const upDateInfo={...currentEventInfo,[e.target.name]: e.target.value }
      setEventInfo(upDateInfo)
    }
    return(
        <div className=" p-4 h-auto  flex justify-center items-center w-full mt-5 min-h-screen  ">
         <form onSubmit={handleSubmit}   encType="multipart/form-data" className="bg-white h-auto p-4 m-6 rounded-lg shadow-md w-full  md:3/4 lg:w-3/5 animate-fadeIn">
          {close?<div onClick={()=>{close()}} className=' w-full flex justify-end  '>
<FontAwesomeIcon className=" text-base self-end w-fit mr-4  hover:text-red-500 hover:scale-125 text-black  " icon={faXmark} />
</div>:<></>}
    <h2 className="text-2xl font-bold text-gray-700 mb-6">Event Form</h2>

    <div className="mb-4 w-full ">
      <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
      <input 
        type="text"
        id="eventName"
        name="eventName"
        onChange={handleChange}
        value={eventInfo?.eventName||""}
        placeholder="Enter event name"
        className="mt-1 p-4 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
      
      />
    </div>

    
    <div className="mb-4 ">
      <label htmlFor="image" className="block  text-sm font-medium text-gray-700">Image</label>
      <input
        type="file"
        id="Image"
        name="Image"
        onChange={handleFileChange}
       // value={eventInfo?.image||""}
        className="mt-1 border-dashed border border-black p-4 block w-full text-sm text-gray-500  rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    
    <div className="mb-4">
      <label htmlFor="headline1" className="block text-sm font-medium text-gray-700">Headline 1</label>
      <textarea
        id="headline1"
        name="headLine1"
        onChange={handleChange}
        value={eventInfo?.headLine1}
        placeholder="Enter 1st paragraph"
        className="mt-1 p-4 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
        
      ></textarea>
    </div>

    
    <div className="mb-4">
      <label htmlFor="headline2" className="block text-sm font-medium text-gray-700">Headline 2</label>
      <textarea
        id="headline2"
        name="headLine2"
        onChange={handleChange}
        value={eventInfo?.headLine2}
        placeholder="Enter paragraph 2"
        className="mt-1 p-4 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>

    
    <div className="mb-4">
      <label htmlFor="coordinator" className="block text-sm font-medium text-gray-700">Coordinator</label>
      <textarea
        id="coordinator"
        name="coordinator"
        rows="4" cols="6"
        onChange={handleChange}
        value={eventInfo?.coordinator}
        placeholder="Enter coordinator name  - name contactNumber "
        className="mt-1 p-4 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
     ></textarea>
    </div>

   
    <div className="mb-4">
      <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
      <input 
        id="eventType"
        name="eventType"
        type="text"
        onChange={handleChange}
        value={eventInfo?.eventType}
        placeholder='Enter event type'
        className="mt-1 p-4 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

   
    <div className="mb-4">
      <label htmlFor="organiser" className="block text-sm font-medium text-gray-700">Organiser</label>
      <input
        type="text"
        id="organiser"
        name="organiser"
        onChange={handleChange}
        value={eventInfo?.organiser}
        placeholder="Enter organiser name"
        className="mt-1 p-4 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

   
    <div className="mb-4">
      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
      <input
        type="date"
        id="date"
        name="date"
        onChange={handleChange}
        value={eventInfo?.date}
        className="mt-1 p-4 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    
    <div className="mb-4">
      <label htmlFor="place" className="block text-sm font-medium text-gray-700">Place</label>
      <input
        type="text"
        id="place"
        name="place"
        placeholder="Enter place"
        onChange={handleChange}
        value={eventInfo?.place}
        className="mt-1 p-4 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

   
    <div className="flex justify-end">
      <button
        type="submit"
        className="px-6 py-2 text-white bg-blue-600/85 hover:bg-blue-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all"
      >
        Submit
      </button>
    </div>
    <div className='w-full text-center place-content-center mx-auto'>
      {isLoading?<p className='text-xs sm:text-base text-slate-700'>Uploading...</p>:<></>}
    </div>
     <div className='w-full place-content-center mx-auto '>
      {response ?<p className='text-green-600 text-xs sm:text-base'>{response}</p>:<p className='text-red-600 sm:text-base'>{ErrResponse}</p>}

     </div>
  </form>
        </div>
           )
}