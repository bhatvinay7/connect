import React from 'react'
import { useState, useEffect,useRef ,useMemo,createContext} from 'react';
import FeedBack from './FeedBack.jsx'
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../fetch/useAxiosPrivate.js';
import useAuth from '../fetch/useAuth.js';
import moment from 'moment'
import PropagateLoader from "react-spinners/PropagateLoader";
import EventSlider from './EventSlider.jsx';
import ClubEventControler from './ClubEventsControler.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faCalendarDays, faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
export default function RecentClubEventShow() {
    const axiosPrivate=useAxiosPrivate()
    const eventContext=createContext()
    const [open,setOpen]=useState(false)
    const [flag,setFlag]=useState(false)
    const { id } = useParams()
    const [eventId, setEventId] = useState(id)
    const [eventInfo, setEventInfo] = useState([])
    const [eventImg, setEventImg] = useState([])
    const [isLoading, setLoading] = useState(true)
    const {auth}=useAuth()
    const [body,setBody]=useState(null)
    const feedBackRef=useRef();
   
    function handleClick() {
        setOpen(!open);
        }

    const scrollToSection=(ref)=>{
        ref.current.scrollIntoView({behaviour:"smooth"})
      }
      useEffect(() => {
        const eventName = eventInfo?.map((each) => each.eventName); // Safe mapping
        const data = { userEmailId:auth.userId, text: "", eventName: eventName?.[0] };
        setBody(data);
      }, [eventInfo]);
    const feedback=useMemo(()=>{return {body,feedBackRef}},[body])  
    useEffect(() => {
        async function fetchData() {
            const response = await axiosPrivate.get(`/api/techhub/eventBasedOnId?eventId=${encodeURIComponent(eventId)}`);
            setEventInfo(response.data);
            setLoading(false)

        }
        try {
            if (eventId) {
                
                fetchData()
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }, [eventId])
   
    useEffect(() => {
        setEventImg(eventInfo?.map((each) => each.img))
    }, [eventInfo])

    if (isLoading) {
        return (
            <div className=" relative min-h-screen w-full top-20 md:top-24 flex justify-center items-center bg-gradient-to-br from-slate-950/95 via-black/50 to-slate-900 ">
                <PropagateLoader
                    size={30}
                    color={"#87CEEB"}
                />
            </div>
        )
    }
    else if (!isLoading && eventInfo.length == 0) {
        return (
            <div className=" relative min-h-screen w-full top-20 md:top-24 flex justify-center items-center bg-gradient-to-br from-slate-950/95 via-black/50 to-slate-900 ">
                <h1 className='text-3xl text-gray-300 font-medium'>Event information is not available</h1>
            </div>
        )
    }
    return (
        <div className='min-h-screen   relative top-20 md:top-24 bg-gradient-to-br from-slate-100 via-slate-200/50 to-slare-300  flex flex-col items-center justify-center w-full '>
            <div className='w-full  flex items-center justify-end gap-1 mt-3 caret-transparent select-none mr-10'>
                <div onClick={()=>scrollToSection(feedBackRef)} className='  w-fit text-white lg:p-2 
                p-1.5 hover:shadow-md hover:shadow-purple-600 text-xs  sm:text-base rounded-md bg-orange-300 '>Feedback
               
                </div>
                {/* <div className=' group z-30 text-white  relative w-fit hover:shadow-md hover:shadow-purple-600 p-2 rounded-md bg-orange-300 '>
                    Reviews
                <div className='absolute inset-0   h-full w-full   rounded-md '>
                </div>    
                
                </div> */}

             {auth?.roles?.length ?
                             <div className=' w-fit h-auto   '>
                               <div className='  w-full  flex justify-center flex-col items-center p-2 gap-2  mx-auto'>
                                 <div className=" w-full flex justify-end caret-transparent  gap-2">
             
                                 
                                 <div onClick={()=>setFlag(!flag)} className='w-fit text-xs sm:text-base  lg:p-2 p-1.5 text-white bg-red-600 hover:bg-red-500 rounded-md'>
                                  delete
                                  {flag ?
                                  <div className=" absolute z-[33] bg-slate-200 border border-gray-500 px-2 py-1 inset-0 top-10 bottom-8 min-w-[160px] w-2/5 rounded-md h-28 left-1/4 right-1/2 ">
                                   <p className=" w-fit p-4 text-black md:text-base text-xs  ">Are you sure ?</p>
                                   <div className="absolute bottom-0  right-4  ">
                                   <button onClick={()=>{setFlag(!flag)}} className=" w-fit px-3 p-1 py-1 sm:my-4 my-1 mr-1 rounded-md bg-blue-600 hover:bg-blue-500 text-xs sm:text-base " type='button'>No</button> 
                                   <button onClick={()=>{setFlag(!flag)}} className=" w-fit  px-3 py-1 my-4  mr-1 text-xs sm:text-base  rounded-md bg-blue-600 hover:bg-blue-500 " type='button'>Yes</button>
                                   </div>
                                  </div>:<></>}
                                 </div>
                                 <div onClick={()=> handleClick()} className=' w-fit text-gray-200 bg-yellow-500 hover:bg-yellow-400/75 sm:text-base text-xs  p-1.5 lg:p-2 rounded-md'>
                                   update
                                 </div>
                                 </div>
                                   {open?
                                   <div className=' w-full h-auto absolute z-30 inset-0 '>
                     
                                 <ClubEventControler
                                   url={`/api/event/updateEvent?id=${encodeURIComponent(id)}`}
                                   close={()=>setOpen(!open)}
                                   method={'patch'}
                                 />
                                   </div>:<></>}
                               </div>
                             </div> :<></>}
            </div>
            <div className=' w-full max-w-[600px]  h-auto    p-2 '>
                <EventSlider
                    value={eventImg} />
            </div>
            <div className=' mt-5 p-4 w-full h-auto flex flex-col   items-center justify-center '>

                {eventInfo.length > 0 ? eventInfo?.map((each,index) => {
                    
                    return (
                        <div  key={index}className='flex flex-col justify-center items-center gap-3 w-full'>
                            <div className=' rounded-md w-fit  flex flex-col justify-start items-start  h-40 '> 
                                <div className='flex justify-center items-center'>
                                    <p className='text-black font-fontRubik text-xl mb-2 select-none  '>{each.eventName}</p>
                                </div>
                            
                                <div className='flex justify-center items-center gap-2 '>
                                    <FontAwesomeIcon className='text-xs text-black' icon={faCalendarDays} />

                                    <p className='text-black text-base m-1 select-none ' >{`${moment(each.date).format("MMMM Do, YYYY")}`}</p></div>

                                <div className='flex justify-center items-center gap-2 '>
                                    <FontAwesomeIcon className='text-xs text-black' icon={faMapPin} />
                                    <p className='text-black text-base m-1 select-none '>{each.venue}</p>
                                </div>
                            </div>

                            <div className=' bg-sky-200/10 caret-transparent h-auto select-none rounded-md w-full lg:w-3/4 min-h-40 p-3'>
                                <p className='text-base text-justify font-serif leading-7'>
                                    {each.headLine1}
                                </p>
                            </div>
                            <div className=' bg-sky-200/10 h-auto caret-transparent select-none rounded-md w-full lg:w-3/4 min-h-40 p-3'>
                                <p className='text-base text-justify font-serif text-black leading-7'>
                                    {each.headLine2}
                                </p>
                            </div>

                      

                        </div>
                    )
                })

                    : <></>}
            </div>
            <div className='bg-inherit h-auto  w-full mt-8 mb-14 '>
             
                
            <FeedBack
             value={feedback}
             
            />
                
            </div>
        </div>
    )
}
