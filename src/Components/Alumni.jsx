import React, { useState, useEffect } from "react";
import useAxiosPrivate from '../fetch/useAxiosPrivate.js';


const AlumniSearch = () => {
  const axiosPrivate=useAxiosPrivate()
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [searchData,setResponse]=useState([]);
  const handleSelectionChange = (event) => {
    setSelectedOption((priv)=>event.target.value);
    console.log(selectedOption)
  };
  useEffect(() => {
    async function fetchData(){
      const response=await axiosPrivate.get(`/api/alumni/getalumniInfo?select=${encodeURIComponent(selectedOption)}&search=${search}`)
      setResponse(response.data)
      console.log(response.data)
    }
    if(search){
      fetchData()
    }
  }, [search])
  useEffect(() => {

    const t = setInterval(() => {
      if (searchQuery) {
        setSearch(searchQuery)
      }
    }, 300)


    return () => {
      clearInterval(t)
    }
  }, [searchQuery])

  return (
    <div className="min-h-screen relative top-20 md:top-24 bg-gray-900 w-full caret-transparent text-white p-4 ">
      <div className="max-w-7xl flex flex-col gap-y-4 font-fontRobotoSlab mt-10 md:mt-14  mx-auto">
        <h1 className="w-full text-start md:mb-14 mb:8 text-xl sm:text-2xl lg:text-4xl">Stay Connected with Our Alumni Family</h1>
        {/* Search Bar */}
        <div className="mb-8 flex gap-2  ">
          <div className=" w-3/4 ">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" w-full p-1.5 sm:p-2 text-gray-900 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          </div>

          <div className="w-1/5">
      {/* Native Select Dropdown */}
      <select
        className="w-full bg-gray-300 text-xs sm:text-base text-black rounded-md p-2"
        value={selectedOption}
        onChange={handleSelectionChange}
      >
        <option value="" disabled>
          Select
        </option>
        <option value="jobrole">Job Role</option>
        <option value="Name">Name</option>
      </select>
    </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchData.map((alumni) => (
            <div
              key={alumni._id}
              className="bg-gray-800/75 hover:border hover:border-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:brightness-105 transition duration-300"
            >  
           <img
                src={alumni.image}
                alt={alumni.name}
                className="w-32 h-32 mx-auto rounded-full object-fill mb-4"
              />
          <h2 className="text-xl font-bold text-center mb-2">{alumni.name}</h2>
              <p className="text-center text-purple-400">{alumni.jobrole}</p>

              
              <div className="mt-4">
                <p>
                  <span className="font-semibold">Batch</span>
                  {alumni.batch}
                </p>
                <p>
                  <span className="font-semibold">Branch:</span> {alumni.branch}
                </p>
               
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <a
                  href={alumni.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                > 
                   <i className="fab fa-linkedin fa-2x"></i>
                </a>
             </div> 
            </div>  



           ))}
        </div>  

       
       {searchData.length === 0 && (
          <p className="text-center text-gray-500 md:mt-8 mt-4 ">
            No alumni found. Try a different search.
          </p>
        )}
      </div>
    </div>
  );
};

export default AlumniSearch;
