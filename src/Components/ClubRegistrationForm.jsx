import React from 'react';
import {useState} from 'react';
import useAxiosPrivate from '../fetch/useAxiosPrivate.js';
function RegistrationForm({clubName}) {
  const axiosPrivate=useAxiosPrivate()
  const [memberData,setMemberData]=useState({Name:"",USNumber:"",MobileNumber:"",pasingYear:""})
  const [response,setResponse]=useState("");
  const [errResponse,setErrorResponse]=useState("")
  const [club_Name,setClubName]=useState(clubName)
  function handleChange(e) {
    setMemberData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSubmit(e){
      e.preventDefault()
    try{
        const response= await axiosPrivate.post(`/api/techhub/postClubMemberData?clubName=${club_Name}`,memberData)
        setResponse(response.data)
    }
    catch(err){
      setErrorResponse(err.response.data)
    }
  }
  return (
    <div  className=" min-h-screen z-20 flex items-center justify-center bg-blue-700/45 brightness-75 px-4 shadow-lg shadow-slate-700 ">
      <div className="w-full max-w-md p-4 bg-gray-300 rounded-lg shadow-lg">
        <div className='w-full text-xs sm:text-base flex flex-wrap text-center flex-col '>
          {response?<h3 className='text-green-500'>{response}</h3>:<h3 className='text-red-500'>{errResponse}</h3>}
         <h2 className=" text-base md:text-xl  xl:text-2xl font-semibold text-blue-950 text-center mb-6">
         Register for the club
        </h2>
        </div>
    
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='flex flex-col items-center gap-y-2 w-full h-auto justify-center'>
            <div className='w-3/4' >
            <label htmlFor="usn" className="block text-sm font-medium text-black/45 brightness-100">
              USN
            </label>
            <input
              type="text"
              id="usn"
              name="USNumber"
              onChange={handleChange}
              placeholder="Enter your USN"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Name Field */}
          <div className='w-3/4'>
            <label htmlFor="name" className="block text-sm font-medium text-black/45">
              Name
            </label>
            <input
              type="text"
              id="name"
               name="Name"
              placeholder="Enter your Name"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className='w-3/4'>
            <label htmlFor="name" className="block text-sm font-medium text-black/45">
              passing Year
            </label>
            <input
              type="text"
              id="name"
               name="passingYear"
              placeholder="Enter your passing year"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Mobile Number Field */}
          <div className='w-3/4'>
            <label htmlFor="mobile" className="block text-sm font-medium text-black/45">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
               name="MobileNumber"
              onChange={handleChange}
              placeholder="Enter your Mobile Number"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Submit Button */}
          <div className='mt-3 '>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600/35 hover:bg-purple-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Submit
            </button> 
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
