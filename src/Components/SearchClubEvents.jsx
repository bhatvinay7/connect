import React, { useEffect, useState,useMemo } from "react";
import useAxiosPrivate from '../fetch/useAxiosPrivate.js';
import RecentClubEvents from "./RecentClubEvents";
const SearchBar = () => {
  const axiosPrivate=useAxiosPrivate()
  const [query, setQuery] = useState("");
  const [search,setSearch]=useState("");
  const [response,setResponse]=useState([])
  const [errorResponse,setErrorResponse]=useState("")
  const memovalue=useMemo(()=> {return response},[search])
  useEffect(()=>{
    const timeout=setTimeout(()=>{
      setSearch(query)
    },500)
    return ()=>{
      clearTimeout(timeout)
    }
  },[query])

  useEffect(()=>{
    async function fetchData(){
      const response=await axiosPrivate.get(`/api/techhub/searchEvent?search=${encodeURIComponent(search)}`)
      setResponse(response.data)
    }
    try{
      if(search){
        fetchData()
        
      }
    }
    catch(err){
      setErrorResponse(err.response?.data)
    }

  },[search])

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full relative h-auto caret-transparent min-h-screen top-20 md:top-24 bg-gradient-to-r from-gray-400 to-blue-200 flex  items-start justify-start flex-col p-2 md:p-4 ">
      <h1 className="w-full text-center text-indigo-700 select-none font-semibold mt-6 caret-transparent  mb-4 sm:mb-6 md:mb-8 lg:mb-14 text-xl sm:text-2xl lg:text-4xl">Search for Inspiring Workshops And Events</h1>
      <div className="w-full"></div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search here for Events/WorkShops..."
        className=" w-full self-center   sm:w-4/5 lg:w-3/4 bg-slate-800/60 p-1.5 sm:p-2 lg:p-3 xl:p-4 text-gray-100 rounded-md ring-1 ring-offset-2 ring-blue-300/10  mt-6 caret-transparent "
      />
      
      <RecentClubEvents
      recentEvents={memovalue}
      />
    </div>
  );
}; 

export default SearchBar;
