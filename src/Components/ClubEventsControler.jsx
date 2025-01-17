import React, { useState,useEffect, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from "react-dropzone";
import useAxiosPrivate from '../fetch/useAxiosPrivate.js';
export default function EventForm({method,url,close}) {
    const axiosPrivate=useAxiosPrivate()
  const [isLoading,setLoading]=useState(false)
    const [response,setResponse]=useState("")
    const [ErrResponse,setErrResponse]=useState("")  
  const [file,setFile]=useState("")  
  const [formInfo, setFormData] = useState({
    eventName: "",
    headLine1: "",
    headLine2: "",
    date: "",
    clubName:"",
    venue: "",
    category:""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formInfo, [name]: value });
  };

  function handleFileChange(e){
    const fileList = e.target.files;  //  FileList object
    const fileArray = [...fileList]; // Convert to array using spread operator
    console.log(fileArray)
    setFile(fileArray)
    //console.log(e.target.files)
  }
  
  

  const handleSubmit = async(e) => {
      e.preventDefault();
    try{
        const formData=new FormData()
        file.forEach((each) => {
          formData.append("Image", each); // Make sure this matches 'Image' in multer middleware
        });
        // formData.append('Image',file);
        formData.append('body',JSON.stringify(formInfo))
        setLoading(true)
      
        if(method=='patch'){
            const response=await axiosPrivate.patch(url,formData,{headers: {
                "Content-Type": "multipart/form-data" // Only for this specific request
            }})
            setResponse(response.data)
            
        }
        else{
        const response = await axiosPrivate.post('/api/techhub',formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Only for this specific request
          },
        })
        setResponse(response.data)
       
      }
      

      }
      catch(err){
        setErrResponse(err.response?.data)
      }
      finally{
        setLoading(false)
      }

  };

  return (
    <div className=" flex justify-center items-center w-full min-h-screen bg-black/45 ">
      <form
        onSubmit={handleSubmit} encType="multipart/form-data"
        className="bg-white shadow-lg rounded-lg p-8 w-full md:3/4 lg:w-3/5 m-5 "
      >
        {close? <div onClick={()=>{close()}} className=' w-full flex justify-end  '>
        <FontAwesomeIcon className=" text-base self-end w-fit mr-4  hover:text-red-500 hover:scale-125 text-black  " icon={faXmark} />
        </div>:<></>}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center"> Club Event/WorkShop Form</h2>

        <div className="mb-4">
          <label
            htmlFor="eventName"
            className="block text-sm font-medium text-gray-700"
          >
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formInfo.eventName}
            onChange={handleInputChange}
            placeholder="Enter event name"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700"
      >
        Select Category:
      </label>
      <select
        id="category"
        name="category"
        value={formInfo.category}
        onChange={handleInputChange}
        className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">-- Select an Option --</option>
        <option value="event">Event</option>
        <option value="workshop">Workshop</option>
      </select>
      
    </div>




        <div className="mb-4">
          <label
            htmlFor="venue"
            className="block text-sm font-medium text-gray-700"
          >
            clubName
          </label>
          <input
            type="text"
            id="clubName"
            name="clubName"
            value={formInfo.clubName}
            onChange={handleInputChange}
            placeholder="Enter venue"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="headLine1"
            className="block text-sm font-medium text-gray-700"
          >
            Headline 1
          </label>
          <textarea
            id="headLine1"
            name="headLine1"
            value={formInfo.headLine1}
            onChange={handleInputChange}
            placeholder="Enter headline 1"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
            
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="headLine2"
            className="block text-sm font-medium text-gray-700"
          >
            Headline 2
          </label>
          <textarea
            id="headLine2"
            name="headLine2"
            value={formInfo.headLine2}
            onChange={handleInputChange}
            placeholder="Enter headline 2"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formInfo.date}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
        
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="venue"
            className="block text-sm font-medium text-gray-700"
          >
            Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formInfo.venue}
            onChange={handleInputChange}
            placeholder="Enter venue"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6 ">
      <label htmlFor="image" className="block  text-sm font-medium text-gray-700">Image</label>
      <input
        type="file"
        id="Image"
        name="Image"
        onChange={handleFileChange}
        multiple
       // value={eventInfo?.image||""}
        className="mt-1 border-dashed border border-black p-4 block w-full text-sm text-gray-500  rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
        <div className=" w-full flex justify-end ">

        <button
          type="submit"
          className=" w-fit   p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all"
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
  );
}
