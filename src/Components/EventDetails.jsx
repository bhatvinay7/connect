import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown'
import { useParams } from "react-router-dom";
import EventControler from './EventControler.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useLoaderData } from "react-router-dom";
import moment from 'moment'
import PropagateLoader from "react-spinners/PropagateLoader";
import remarkGfm from 'remark-gfm'
import { getDate } from "../../../HelperFunctions/getDate.js";
import Registration from './Registration.jsx';
import ReactMarkdown from "react-markdown";
import useAuth from '../fetch/useAuth.js';
import useAxiosPrivate from '../fetch/useAxiosPrivate.js';

export default function EventDetails() {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false)
  const [flag, setFlag] = useState(false)
  const [visible, setVisible] = useState(false)
  const { auth } = useAuth()
  const { id } = useParams();
  const currentDate = new Date().toLocaleDateString("en-CA").slice(0, 10)
  const [eventdetail, setEventDetail] = useState({})
  const [isLoading, setLoading] = useState(true);
  const [upComming, setUpcomming] = useState("")
  const [status,setStatus]=useState("");
  const [update,setUpdate]=useState(false);
  const [handleDelete,setHandleDelete]=useState(false)

  function handleUpdata(){
    setUpdate(!update)
  }
  function handleClick() {
    setOpen(!open);
  }
  const [eventType, setEventType] = useState("");
  function handleShare() {
    const title = window.document.title;
    const url = window.document.location.href;
    if (navigator.share) {
      navigator.share(
        {
          title: `${title}`,
          url: `${url}`
        }
      )
    }
    else {
      alert("sharing option is not available!")
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response =await axiosPrivate.patch(`/api/event/updateEventStatus?id=${id}&set=${encodeURIComponent(!upComming)}`, {})
      setUpcomming(response.data.upCommingEvent)
      setStatus("Changes are recorded")
      setTimeout(()=>{
        setStatus("")
      },4000)
    }
    try {
      if(update){
        fetchData()

      }
    }
    catch (err) {
      console.log(err.message)
    }
  }, [update])
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivate.get(`/api/event/${id}`);
        setEventDetail(response.data);
        setEventType(response.data.type);
        setUpcomming(response.data?.upCommingEvent)
        setLoading(false);
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, [id]);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivate.delete(`/api/event/${id}`);
        setStatus(response.data) 
      }
      catch (error) {
        
      }
    }
      if(handleDelete){
        fetchData();
      }

  }, [handleDelete]);


  if (isLoading) {
    return (
      <>
        <PropagateLoader
          size={30}
          color={"#87CEEB"}
        />
      </>
    )
  }
  return (
    <div key={eventdetail._id} className=" relative inset-0 top-20 md:top-24 bg-gradient-to-br from-indigo-950/95 via-black to-slate-700  w-full min-h-screen  ">
      <div className="  w-full h-auto flex flex-col items-center justify-center">
        <div onClick={() => handleShare()} title="click to share" className=" relative w-fit self-end   right-4 mr-8 my-4 ">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" className="w-6 h-6" fillRule="nonzero"><g transform=""><g fill="#000000" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" ><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" textAnchor="none" fontSize="none" className="mix-blend-normal " ><g transform="scale(5.33333,5.33333)"><path d="M35.47852,5.98047c-0.81349,0.00101 -1.54534,0.49459 -1.85108,1.24844c-0.30574,0.75385 -0.12447,1.61777 0.4585,2.18515l1.09375,1.09375c-11.7031,0.17286 -21.17969,9.7489 -21.17969,21.49219c-0.0102,0.72127 0.36875,1.39216 0.99175,1.75578c0.623,0.36361 1.39351,0.36361 2.01651,0c0.623,-0.36361 1.00195,-1.0345 0.99175,-1.75578c0,-9.57245 7.62742,-17.29729 17.1543,-17.48242l-1.06836,1.06836c-0.52248,0.50163 -0.73295,1.24653 -0.55024,1.94742c0.18271,0.70088 0.73006,1.24823 1.43094,1.43094c0.70088,0.18271 1.44578,-0.02776 1.94742,-0.55024l4.32227,-4.32227c0.49926,-0.37926 0.79179,-0.97068 0.79026,-1.59765c-0.00153,-0.62697 -0.29696,-1.21695 -0.79807,-1.59376l-4.31445,-4.31445c-0.37701,-0.38755 -0.89487,-0.60596 -1.43555,-0.60547zM12.5,6c-3.56615,0 -6.5,2.93385 -6.5,6.5v23c0,3.56615 2.93385,6.5 6.5,6.5h23c3.56615,0 6.5,-2.93385 6.5,-6.5v-7.5c0.0102,-0.72127 -0.36875,-1.39216 -0.99175,-1.75578c-0.623,-0.36361 -1.39351,-0.36361 -2.01651,0c-0.623,0.36361 -1.00195,1.0345 -0.99175,1.75578v7.5c0,1.40385 -1.09615,2.5 -2.5,2.5h-23c-1.40385,0 -2.5,-1.09615 -2.5,-2.5v-23c0,-1.40385 1.09615,-2.5 2.5,-2.5h7.5c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"></path></g></g></g></svg>
        </div>
        {auth?.roles?.length ?
          <div className=' w-full h-auto ml-auto caret-transparent '>
            <div className=' relative w-full  flex justify-center flex-col items-center p-3 gap-2  mx-auto'>
            {status?<div className="sm:text-base text-xs text-green-500 flex items-center p-4 h-4 rounded-md bg-green-300/25 text-center ">{status}</div>:<></>}
              <div className=" w-full flex justify-end caret-transparent mr-14 gap-2">
              <div className=" w-3/4 sm:w-3/5 lg:w-2/5 flex justify-end h-auto relative">
                    {/* <button type="button" onClick={() => setVisible(!visible)} className={`w-fit h-auto text-black p-2 rounded-md ${upComming ? "bg-green-500" : "bg-yellow-300/75"}`}>Upcomming</button> */}
                    {visible ? <div className="absolute  bg-white left-4 w-full p-2  border border-blue-200 hover:bg-slate-200 rounded-md ">
                      <div className="w-full sm:text-base text-xs text-ceneter flex flex-col">
                        {upComming ? <p>DO you want to remove the event from Upcommming event section?</p> :
                          <p>Do you want to add it to the Upcommming event section?</p>}
                        <div className="self-end flex  gap-2">
                          <div onClick={()=>setVisible(!visible)} className="w-fit text-xs sm:text-base sm:px-2 sm:py-1.5 px-1.5 py-0.5 bg-blue-400/75 rounded-md ">No</div>
                          <div onClick={() =>{ handleUpdata()
                            setVisible(!visible)
                          }} className="w-fit text-xs sm:text-base sm:px-2 sm:py-1.5 px-1.5 py-0.5 bg-blue-400/75 rounded-md ">Yes</div>
                        </div>
                      </div>
                    </div> : <></>}
                  </div>

                <div onClick={() => setFlag(!flag)} className='w-fit  p-2 text-white bg-red-600 hover:bg-red-500 rounded-md'>
                  delete
                  {flag ?
                    <div className=" absolute z-[33] bg-slate-200 border border-gray-500 p-2 inset-0 bottom-8 w-2/5 rounded-md h-28 left-1/2 right-auto ">
                      <p className=" w-fit p-4 text-black md:text-base text-xs  ">Are you sure ?</p>
                      <div className="absolute bottom-0 right-4  ">
                        <button onClick={() => { setFlag(!flag) }} className=" w-fit px-3 p-1 py-1 sm:my-4 my-1 mr-1 rounded-md bg-blue-600 hover:bg-blue-500 text-xs sm:text-base " type='button'>No</button>
                        <button onClick={() => { setFlag(!flag) 
                                                  setHandleDelete(!handleDelete)
                        }} className=" w-fit  px-3 py-1 sm:my-4 my-1 mr-1 text-xs sm:text-base  rounded-md bg-blue-600 hover:bg-blue-500 " type='button'>Yes</button>
                      </div>

                    </div> : <></>}     
                </div>
                <div onClick={() => handleClick()} className=' w-fit text-gray-200 bg-yellow-500 hover:bg-yellow-400/75 p-2 rounded-md'>
                  update
                </div>
              </div>
              {open ?
                <div className='w-full h-auto '>

                  <EventControler
                    url={`/api/event/updateEvent?id=${encodeURIComponent(id)}`}
                    close={() => setOpen(!open)}
                    method={'patch'}
                  />
                </div> : <></>}
            </div>
          </div> : <></>}
        <h1 className=" caret-transparent font-fontRoboto pt-4 text-center mx-auto text-violet-700 font-bold text-xl md:text-2xl   ">{eventdetail.eventName}</h1>
        <div className=" mt-4 lg:mt-2 w-full">
          <div className="min-h-48 mx-auto   h-auto max-w-md sm:max-w-md lg:min-w-[480px]  lg:max-w-xl xl:max-w-xl">
            <img className="mx-auto w-3/4 rounded-md aspect-auto object-fill caret-transparent  md:w-4/5 lg:w-3/5    lg:pb-4" src={eventdetail.img} />
          </div>

          <div className=" text-left flex flex-col w-full justify-center items-center ">
            <div className="mt-3">
              <span className=" text-slate-400 text-xs md:text-base" >{moment(eventdetail.date).format("MMMM Do, YYYY")}</span>
              {/* <span className="textcolor">{eventdetail.eventType}</span> */}
            </div>

            <div className="text-slate-200 mt-3  text-xs sm:text-base p-4 text-justify">
              <span className={`${eventdetail?.organiser} ?"":"hidden"`}> Organiser: {eventdetail?.organiser}</span>
            </div>

            <div className="text-slate-200 mt-3 h-auto text-center">
              <FontAwesomeIcon className="animate-pulse mr-1" icon={faLocationDot} size="xl" style={{ color: "#ed0c39", paddingRight: "1rem" }} />
              <span className="text-xs sm:text-base p-4 ">{eventdetail.place} </span>
            </div>
            {/* flex-col justify-center  items-center */}
            <div className=" mt-4 w-4/5 h-auto mx-auto  flex flex-col justify-center items-center">
              <div className=" leading-6 md:leading-6 lg:leading-7 text-justify  h-auto  bg-black bg-opacity-5 text-slate-400 p-2 rounded-2xl text-xs sm:text-base  m-auto">
                <ReactMarkdown>{eventdetail.headLine1}</ReactMarkdown>
              </div>
              <div className=" leading-6 md:leading-6 lg:leading-7  text-justify  my-6  h-auto bg-black bg-opacity-5 text-slate-400/75 rounded-2xl text-xs p-2 sm:text-base   m-auto ">
                <Markdown  remarkPlugins={[remarkGfm]} >{eventdetail.headLine2}</Markdown>
              </div>
            </div>
          </div>
        </div>

      </div>
      {eventdetail.date.slice(0, 10) < currentDate ? <></> : <Registration eventType={eventdetail.eventName} />}
    </div>
  )
}
