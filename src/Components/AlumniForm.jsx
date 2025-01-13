import React, { useState } from "react";
import useAxiosPrivate from '../../../src/fetch/useAxiosPrivate.js';
function AlumniForm() {
  const axiosPrivate=useAxiosPrivate()
  const [alumniInfo, setFormData] = useState({
    name: "",
    jobrole: "",
    batch: "",
    branch:"",
    link: "",
  });
  const [response,setResponse]=useState("")
  const [errorResponse,setErroResponse]=useState("")
  const [file,setFile]=useState("")
  const [isLoading,setLoading]=useState(false)

  function handleFileChange(e){
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }
  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:value, // Handle file input
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const formData=new FormData()
      formData.append('image',file)
      formData.append('body',JSON.stringify(alumniInfo))
      setLoading(true)
      const response = await axiosPrivate.post('/api/alumni/postalumanaiInfo',formData,{
        headers: {
          "Content-Type": "multipart/form-data", // Only for this specific request
        },
      })
      setResponse(response?.data)
    }
    catch(err){
      setErroResponse(err.response?.data)
    }
    finally{
      setLoading(false)
    }
    // Perform further processing, e.g., sending data to a server
  };

  return (
    <div className=" w-3/5 mx-auto p-6 m-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Alumni Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={alumniInfo.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Job Role Field */}
        <div>
          <label htmlFor="jobRole" className="block font-medium mb-1">
            Job Role
          </label>
          <input
            type="text"
            id="jobRole"
            name="jobrole"
            value={alumniInfo.jobrole}
            onChange={handleChange}
            placeholder="Enter your job role"
            className="w-full border border-gray-300 rounded-md p-2"
            
          />
        </div>

        {/* Batch Field */}
        <div>
          <label htmlFor="batch" className="block font-medium mb-1">
            Batch
          </label>
          <input
          type="text"
            id="batch"
            name="batch"
            value={alumniInfo.batch}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            
          />
            
        </div>
        
        <div className="w-full mx-auto">
      <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
        Select Branch
      </label>
      <select
        id="branch"
        name="branch"
        value={alumniInfo.branch}
        onChange={handleChange}
        className="mt-1 block w-full p-2 bg-gray-200 border border-gray-300 text-black rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          Select Branch
        </option>
        <option value="CSE">Computer Science and Engineering (CSE)</option>
        <option value="ECE">Electronics and Communication Engineering (ECE)</option>
        <option value="CE">Civil Engineering (CE)</option>
        <option value="IS">Information Science (IS)</option>
        <option value="AI-ML">Artificial Intelligence and Machine Learning (AI-ML)</option>
      </select>
      </div>
        {/* Image Upload Field */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md p-2"
            accept="image/*"
            
          />
        </div>

        {/* Link Field */}
        <div>
          <label htmlFor="link" className="block font-medium mb-1">
            Profile/LinkedIn Link
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={alumniInfo.link}
            onChange={handleChange}
            placeholder="Enter your profile link"
            className="w-full border border-gray-300 rounded-md p-2"
            
          />
        </div>

        {/* Submit Button */}
        <div className="w-full ">
          <div className="ml-auto w-fit ">

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
          </div>
        <div className='w-full text-center place-content-center mx-auto'>
      {isLoading?<p className='text-xs sm:text-base text-slate-700'>Uploading...</p>:<></>}
    </div>
     <div className='w-full text-center place-content-center mx-auto '>
      {response ?<p className='text-green-600 text-xs sm:text-base'>{response}</p>:<p className='text-red-600 sm:text-base'>{errorResponse}</p>}

     </div>
      </form>
    </div>
  );
}

export default AlumniForm;
