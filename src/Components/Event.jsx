import React from 'react';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown'
import { useEffect, useState, useContext, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faFilter, faXmark, faCircle, faLessThan, faGreaterThan, faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import EventControler from './EventControler.jsx'

import PropagateLoader from "react-spinners/PropagateLoader";


import { getDate } from '../../../HelperFunctions/getDate.js';

import useAuth from '../fetch/useAuth.js';
import useAxiosPrivate from '../../../DB/useAxiosPrivate.js';


export default function Event() {
  const axiosPrivate = useAxiosPrivate();
  const {auth}=useAuth()
  const id=useParams();
  const [events, setEvents] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [filterArray, setFilterArray] = useState(null);
  const [typeFilter, setFilter] = useState("");
  const [filterOut, setFilterOut] = useState([]);
  const [toogle, setToogleFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeOfEvent,setTypeOfEvent] = useState("live");
  const [totalPages,setTotalPages] = useState(0);
  const [initialEventPage, setInitialEventPage] = useState(1);
  const [keyInput,setKeyInput] = useState(""); // Immediate input value
  const [searchValue,setSearchValue] = useState(""); // Debounced value
  const [windowWidth,setInnerWidth] = useState(window.innerWidth);
  const [searchResults,setSearchResults] = useState([]);
  const [Id,setId] = useState("");
  const [eventList,setEventList]=useState([])
  useEffect(()=>{
    setEventList(typeFilter ? filterOut : events)
    
  },[typeFilter,events,filterOut])
  

function getClickedEvent(id){
  setId(id)
  setSearchResults([])
}
 function clearSearchContent(){
  setSearchResults([])
 }
  function setPrevousPage() {
    if (currentPage > 1)
      setCurrentPage(currentPage - 1)
  }
  function setNextPage() {

    setCurrentPage(currentPage + 1)
  }

  function changeToPastEvents() {
    setTypeOfEvent("past")
    setCurrentPage(1)
  }
  function changeToLiveEvents() {
    setTypeOfEvent("live")
    setCurrentPage(1)
  }

  async function handleSearch(e, eachfilter, totalPages) {
    e.preventDefault()
    setTotalPages(totalPages)
    setCurrentPage(1)
    setFilter(eachfilter)
    setToogleFilter((toogle) => !toogle)
  }

useEffect(()=>{
     async function fetchData(){
      try{
      const response=await axiosPrivate.post(`/api/event/card?id=${encodeURIComponent(Id)}`,{});

      setEvents(response.data);
      }
      catch(err){
        console.log(err.message)
      }
     }
      if(Id){
        fetchData()
      }
},[Id])

  // Implementation of debouncing  //////////////////////////////////////////////////////////////
  function handleSearchQuery(e) {
    setKeyInput(e.target.value)
  }
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchValue(keyInput)
    }, 300)
    return () => {
      clearInterval(t)
    }
  }, [keyInput])
  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;
    async function fetchData() {
      const response = await axiosPrivate.post(`/api/event/search?search=${encodeURIComponent(searchValue)}`, {}, { signal, });
      setSearchResults(response.data)
      

    }
    if (searchValue) {
      try {
        fetchData()
      }
      catch (err) {
        console.log(err)
      }

    }
    return () => {
      controller.abort();
    }
  }, [searchValue])
  // /////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setInnerWidth(window.innerWidth)
  }, [windowWidth])
  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;
    async function fetchData() {
      try {

        const response = await axiosPrivate.get(`/api/event?page=${currentPage}&state=${typeOfEvent}&innerWidth=${windowWidth}`, { signal, })
        console.log(response.data)
        setEvents(response?.data?.[0] ||[]);
        // setInitialEventPage(response.data?.[1]|| 0);
        setTotalPages(response?.data?.[1]||0);
        setLoading(false);
      }
      catch (error) {
        console.log(error.response?.data);
      }
    }
    if (!typeFilter) {
      fetchData();
    }

    return () => {
      controller.abort(); // Cancel the request
    };

  }, [typeOfEvent, currentPage]);

  useEffect(() => {
    async function filterType() {
      const response = await axiosPrivate.post(`/api/event/filterslidebar?state=${typeOfEvent}&innerWidth=${windowWidth}`);
      setFilterArray(response.data);
    }

    filterType();
  }, [typeOfEvent])

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;
    async function fetchData() {
      try {
        const response = await axiosPrivate.post(`/api/event/filter?type=${encodeURIComponent(typeFilter)}&state=${typeOfEvent}&page=${currentPage}&innerWidth=${windowWidth}`, {}, { signal, });
        setFilterOut(response.data);
        // console.log(response.data)
      }
      catch (err) {
        console.log(err.massage);
      }
    }
    if (typeFilter){
      fetchData();
    }
    return () => {
      controller.abort();
    }
  }, [typeFilter, currentPage])

  useEffect(() => {
    //to stop scroling effect
    if (toogle) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [toogle]);

  function clearHandleSearch(e) {
    e.preventDefault()
    setTotalPages(initialEventPage)
    setFilter(null)
    setCurrentPage(1)
  }
  function toogleFilter(e) {
    e.preventDefault()
    setToogleFilter((toogle) => !toogle)
  }
  if (isLoading && !events){
    return (
      <div className=" min-h-screen w-full flex justify-center items-center">
        <PropagateLoader
          size={30}
          color={"#87CEEB"}
        />
      </div>
    )
  }
  const filterButtons = filterArray?.map((eachfilter, index) => {
    return (
      <div onClick={(e) => handleSearch(e, eachfilter._id, eachfilter.totalPages)} className={`${typeFilter == eachfilter._id ? " animate-bounce  " : ""} " flex   justify-center items-center font-medium font-sans border sm:bordr-2 border-black hover:bg-slate-100 bg-slate-200 p-1 sm:1.5 md:py-2   w-fit  h-auto text-[8px] sm:text-xs    rounded-lg ring  sm:ring-2 ring-cyan-100 " `} key={index} >
        <div className='p-2 text-xs text-center'>
          {eachfilter._id}
        </div>
        <div className={toogle ?'bg-slate-300 font-sans text-[8px] sm:text-xs w-auto font-normal mx-3 px-2 rounded-xl text-center text-xs ':"hidden"}>
          {eachfilter.count}
        </div>
      </div>
    )
  })

const displayElements =eventList?.length >0 ?  eventList?.map((event,index) =>{
    return (
      <div key={event._id} className=" caret-transparent relative group  overflow-hidden  border-spacing-2 border-l-4 border-b-4  group hover:bg-opacity-60 bg-gradient-to-tr from-black/80 via-gray-500/75 to-white  rounded-lg w-4/5 place-items-start md:max-w-md md:min-w-[280px] xl:max-w-[260px] 2xl:min-w-[280px]   2xl:max-w-[280px] m-10 box-border p-4  items-center justify-center shadow-lg shado w-slate-700 col-span-1 sm:col-span-6 md:col-span-6 lg:col-span-4   xl:col-span-3 2xl:col-span-3 
      ">               
        <Link  to={`/${event._id}`}>
          <div className="  flex flex-col aspect-auto md:aspect-video h-72  items-center  justify-center  w-full     
          ">
             <div className=" w-full h-auto   ">
            <div className=" group-hover:absolute transition-all duration-700 ease-in  place-content-center inset-0 w-full bg-slate-500 h-full hidden group-hover:block  text-center mb-4 text-gray-900 font-bold ">{event.eventName}</div>
            </div>
            <img className=' mx-auto group-hover:text-opacity-85 h-3/4 rounded w-full p-1   aspect-cover object-fill  ' src={event.img} />
            <div className=" hover:bg-opacity-10 h-auto bg-gray-50 bg-opacity-40 shadow-sm shadow-zinc-300 pb-2 rounded-xl w-full mt-2">
              <div className=" h-1/4 flex  flex-col justify-between items-center gap-1 mt-2 w-full">
                <div className="flex items-center h-full justify-center  w-full ">
                  <FontAwesomeIcon className="mr-2" icon={faCalendarDays} />
                  <span className="text-xs sm:text-base  lg:text-xs ">{getDate(event.date)}</span>
                </div>
                <div className="text-center h-auto w-full">
                  <span className="text-xs sm:text-base    lg:text-xs ">{event.eventType}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }):<div className='w-full p-4 place-content-start mt-10 caret-transparent justify-items-center min-h-screen col-span-full '><p className='text-xs sm:text-base lg:text-xl text-gray-200 font-semibold font-sans'>No events are found</p></div> 
  return (
    <div className={" relative inset-0 top-16 md:top-24 min-w-[270px]  min-h-screen  w-full bg-black/85 flex flex-col items-center justify-center"}>
     <div className='w-full flex flex-col'>
      <h1 className=" caret-transparent self-center mx-auto text-center font-bold text-xl md:text-2xl text-white   m-4 md:col-span-full xl:text-3xl">Experience And Explore</h1>

      <div className=" ml-auto  self-end caret-transparent ">
          <div className=" flex justify-center items-center  gap-3  ">
            <div onClick={(e)=>{changeToPastEvents()
                           clearHandleSearch(e)
            }} className={`${typeOfEvent == "past" ? "animate-mypulse  border-b-yellow-200 border-l-yellow-200 border-l-4 border-b-4" : "animate-none"} " p-0.5 sm:p-1.5 ml-auto md:m-0   w-fit text-[10px] sm:tetx-xs md:text-base  rounded-md bg-blue-100 hover:bg-blue-50 place-content-center " `}>
              Past Events
            </div>
            <div onClick={(e)=>{changeToLiveEvents()
                               clearHandleSearch(e)     
            }} className={`${typeOfEvent == "live" ? "animate-mypulse border-b-yellow-200 border-l-yellow-200 border-l-4 border-b-4" : "animate-none"} " p-0.5 sm:p-1.5 ml-auto md:m-0  w-fit   text-[10px] sm:tetx-xs md:text-base rounded-md bg-blue-100 hover:bg-blue-50 text-center place-content-center "`}>
              Live Events
            </div>
            <div title="filter" onClick={(e) => toogleFilter(e)} className="hover:bg-cyan-100 relative flex items-center justify-center w-10 h-10 text-xs md:text-base  md:w-12  md:h-12 bg-slate-300 rounded-full mr-4 ">
              <FontAwesomeIcon className=" m-2 text-base sm:text-2xl " icon={faFilter} style={{ color: "#FFD43B", }} />
              <div className={typeFilter ? " absolute  right-6 top-1 md:right-12  -left-1 " : "hidden"}>
                <FontAwesomeIcon icon={faCircle} style={{ color: "#fd0814", }} />
              </div>
            </div >
          
          </div >
        </div>
      </div> 

      {/* <div className={toogle ? "flex flex-col flex-wrap justify-start items-start    overflow-y-scroll   z-30 absolute right-0 top-0 min-h-screen border-l-8 border-b-slate-800 w-1/2 md:w-2/5  bg-white self-end h-full transition-all duration-2000 ease-in" : "w-0 hidden transition-all duration-2000 ease-in "}> */}

       <div
  className={` right-0 top-0 custom-scrollbar overflow-y-scroll max-h-screen border-l-8 border-b-slate-800 bg-slate-50 z-30 ${toogle ? " visible    absolute overflow-y-scroll w-full   md:w-2/5 self-end h-full transition-all duration-500 ease-in "
      : " overflow-y-scroll  invisible   absolute w-0 self-end h-full transition-all duration-500 ease-in "}
  `}> 
        {/* Sidebar content */}

        <div className="hidden md:block m-4 mb-8" onClick={(e) => toogleFilter(e)} >
          <FontAwesomeIcon className='text-[14px] sm:text-base' icon={faXmark}  style={{ color: "black" }} />
        </div >
        <div className="block md:hidden m-4 mb-8" onClick={(e) => toogleFilter(e)} >
          <FontAwesomeIcon className='text-[14px] sm:text-base' icon={faXmark}  style={{ color: "black" }} />
        </div >
        <div className=" flex  justify-start flex-wrap items-start gap-3  m-4">

          {filterButtons}
          {typeFilter ? <button className=' ml-2 font-normal font-sans bg-yellow-200 hover:text-yellow-400/75 w-fit p-1 sm:p-1.5 md:p-2 text-xs  rounded-md ring sm:ring-1 hover:ring-slate-700 hover:bg-yellow-50' onClick={(e) => { clearHandleSearch(e), toogleFilter(e) }}>clear fliter</button> : null}
        </div>
      </div>




{/* ///////////////////////////////////////////////// */}
{/* search bar results  */}
      <div className=' flex w-full flex-wrap h-auto  items-center    mt-4 gap-4 text-center'>
        <div className=" w-full flex  flex-grow lg:flex-grow-0 md:w-3/5 md:place-self-end justify-center  ">
          <div className=' w-full  flex flex-col items-center justify-center'>
            <div className="  flex items-center  justify-start  w-4/5 md:w-3/5 lg:w-4/5 xl:w-3/5 bg-white  rounded-full " >

              <FontAwesomeIcon className='ml-3' icon={faMagnifyingGlass} size="xl" style={{ color: "#b3b3b3", }} />
              <input onChange={(e) => handleSearchQuery(e)} type="search" placeholder="search here..." value={keyInput} className=" outline-none w-full p-2 rounded-full  " />
            </div>
            {searchResults.length != 0 ?
              <div className=" relative  mt-4 w-4/5 h-auto p-6 md:w-3/4 lg:w-4/5 xl:w-3/5 flex flex-col bg-white  rounded-md  ">

                <div className=" absolute  right-2 top-1 " >
                  <FontAwesomeIcon className='text-base sm:text-xl hover:text-red-600' onClick={clearSearchContent} icon={faCircleXmark} />
                </div>
                {searchResults?.map((each, index) => {
                  return (
                    // <Link to={`/${each._id}`}>
                    // <div className=' abolute text-xs  w-full mt-2 bg-slate-600 bg-opacity-30 text-opacity-45 hover:text-opacity-90 rounded-lg h-10 text-center  hover:bg-teal-800 hover:bg-opacity- place-content-center  border-slate-200 ' key={index}>
                    //   {each.eventName}
                    // </div>
                    // </Link>
                    <button type="button"  onClick={()=>getClickedEvent(each._id)} className=' abolute text-xs  w-full mt-2 bg-black bg-opacity-85 text-white  hover:text-opacity-90 rounded-lg h-10 text-center  hover:bg-teal-800 hover:bg-opacity- place-content-center  border-slate-200 ' key={index}>
                    {each.eventName}
                  </button>

                  )
                })}
              </div>
              : <></>} 
          </div>
          
        </div> 
        {/* ///////////////////////////////// */}

        
      </div>

      <div className={displayElements ? " min-h-fit m-auto w-full   flex flex-col  items-center lg:items-start place-items-center  md:grid md:grid-cols-12  md:grid-flow-row" : "flex flex-col  items-center justify-center  min-h-full w-full"}>{displayElements}
      </div>
      <div className='w-full '>
        <div className="flex justify-cneter gap-4 place-content-center my-4">
          <button className="bg-yellow-100 hover:bg-slate-200  bg-opacity-10 hover:ring-offset-1 hover:ring-1 ring-offset-black hover:ring-slate-300 w-10 h-6 sm:w-12 sm:h-10 lg:w-16 lg:h-9 xl:w-20 xl:h-10  rounded-md flex justify-center items-center" onClick={setPrevousPage}><FontAwesomeIcon className='text-xs sm:text-base md:text-xl' icon={faLessThan}  /></button>
          <div className="font-semibold   w-10 h-6 sm:w-12 sm:h-10 lg:w-16 lg:h-9 xl:w-20 xl:h-10 hover:ring-1 hover:ring-slate-300 bg-gray-400 flex justify-center items-center rounded-md caret-transparent text-[10px] sm:text-xs md:text-base" >{currentPage}</div>
          <button className={currentPage < totalPages ? " bg-yellow-100 hover:bg-slate-200  bg-opacity-10 hover:ring-offset-1 hover:ring-1 ring-offset-black hover:ring-slate-300  w-10 h-6 sm:w-12 sm:h-10 lg:w-16 lg:h-9 xl:w-20 xl:h-10 rounded-md flex justify-center items-center" : "hidden"} onClick={setNextPage}><FontAwesomeIcon icon={faGreaterThan} className='text-xs sm:text-base md:text-xl' /></button>
        </div>
      </div>
    </div>
  )
}

