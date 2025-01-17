import { useState, useEffect, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import ClubRegistrationForm from './ClubRegistrationForm.jsx'
import Calendar from 'react-calendar';
import { Outlet } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faCalendarDays, faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import PropagateLoader from "react-spinners/PropagateLoader";
import ClubNavigation from './ClubNavigation.jsx';
import RecentClubEvents from './RecentClubEvents.jsx';
import ClubGoalSection from './ClubGoalSection.jsx';
import WhatsAppLink  from './WhatsAppLink.jsx';
import ClubStatistics from './ClubStatistics.jsx';
import useAxiosPrivate from "../fetch/useAxiosPrivate";
// import { Outlet } from 'react-router-dom';
export default function SportsClub() {
    const axiosPrivate=useAxiosPrivate()
    const [value, onChange] = useState(new Date());
    const [eventDates, setEventDates] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // For showing event details
    const [isLoading, setLoading] = useState(true)
    const [popUp, setPopUp] = useState([])
    const [recentEvents, setRecentEvents] = useState([]);
    const [clubName, setClubName] = useState("Sports Club")
    const clubActivity = useRef()
    const recentEvent = useRef()
    const register = useRef()
    const ref={clubActivity,recentEvent,register}
    // Fetch event dates from the API
    useEffect(() => {
        async function fetchEventDates() {
            try {
                const response = await axiosPrivate.get(`/api/calendarEvent/getAllDates?clubName=${encodeURIComponent(clubName)}`);

                setEventDates(response.data);

                setLoading(false)
            } catch (error) {
                console.error('Error fetching event dates:', error);
            }
        }

        fetchEventDates();
    }, []);

    useEffect(() => {
        async function fetchEventDates() {
            try {
                const response = await axiosPrivate.get(`/api/techhub?clubName=${encodeURIComponent(clubName)}`)

                setRecentEvents(response.data);
                console.log(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching event dates:', error);
            }
        }

        fetchEventDates();
    }, [])

    function handleClick(index) {
        const updatedPopUp = [...popUp];
        updatedPopUp[index] = !updatedPopUp[index];
        setPopUp(updatedPopUp);
    }
    useEffect(() => {
        async function fetchEventInfo() {
            try {
                const response = await axiosPrivate.get(`/api/calendarEvent/getEventInfo?date=${encodeURIComponent(String(value.toISOString().split('T')[0]))}&clubName=${encodeURIComponent(clubName)}`);
                // Assuming API returns events as [{ date: 'YYYY-MM-DD', title: 'Event Title', description: 'Event Description' }]
                setSelectedEvent(response.data);

            } catch (error) {
                console.error('Error fetching event dates:', error);
            }
        }
        if (value) {
            fetchEventInfo()
        }
    }, [value]);

    const recentEventMemo = useMemo(() => { return recentEvents }, [recentEvents])
    const formatMonthOnly = (locale, date) =>
        new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);
    // Highlight event dates
    const titleClassName = ({ date, view }) => {
        if (view == 'month' && eventDates.find((each) => {
            return each._id == String(date.toISOString().split('T')[0])

        })) {
            return 'event_track'
        }
        return " w-fit "
    }
    if (isLoading) {
        return (
            <div className=" relative top-20 md:top-24 min-h-screen  w-full flex justify-center items-center  bg-gradient-to-br from-indigo-950/95 vvia-black/50 to-slate-900  ">
                <PropagateLoader
                    size={30}
                    color={"#87CEEB"}
                />
            </div>
        )
    }

    return (
        //bg-gradient-to-br from-slate-900 via-black to-slate-900
        <>
            <div className='relative  top-20 md:top-24 min-h-screen  w-full  '>
                <div className='relative w-full h-auto  '>
                    {/* Add a light overlay */}
                    <div className="absolute inset-0 opacity-40 bg-gradient-to-tr from-blue-900 via-gray-600 to-black pointer-events-none z-0 "></div>
                    <div className=' relative w-full z-20'>
                        <div className='w-full h-fit flex items-end justify-end p-4'>
                            <div className='w-fit   caret-transparent'>
                                <ClubNavigation
                                 value={ref}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='relative w-full h-auto flex flex-row justify-between items-center z-10'>


                        <div className=' relative z-20 w-fit mx-auto mb-4 p-2   flex caret-transparent select-none rounded-lg justify-center flex-col items-center h-40 shadow-sm shadow-white/15 '>
                            <div className='text-black/80 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl  xl:text-5xl'>SPORTS CLUB</div>
                            <div className='text-slate-600 text-[8px] sm:text-xs md:text-base mt-2'>Fueled by Effort, Defined by Excellence</div>
                        </div>

                    </div>

                </div>
                <section  className='w-full h-auto '>
                    <div ref={recentEvent} className='bg-blue-500/60 w-full h-auto'>
                        {/* <h1 className=' p-2 text-3xl select-none text-white/75 caret-transparent font-bold'>Recent Events</h1> */}
                        <div className='w-full flex justify-start h-auto p-1'>
                            <RecentClubEvents
                                recentEvents={recentEventMemo}
                            />
                        </div>
                    </div>
                </section>

                <div ref={clubActivity}>
                    <div className='w-full h-auto bg-black'>
                        <div className='w-full text-start'>
                            {/* <h1 className='w-fit  select-none p-2 text-3xl font-bold text-white'>Activities </h1> */}
                        </div>

                        <div className='w-full flex    md:flex-row flex-col justify-start flex-wrap '>
              <div className=' w-full   shrink-0 lg:w-2/5 flex md:flex-row flex-col lg:justify-start'>
                <div className=' w-full  select-none '>
                  <Calendar
                    calendarType={'hebrew'}
                    onChange={onChange}
                    //   defaultView="month"
                    value={value}
                    tileClassName={titleClassName}
                    formatMonthYear={formatMonthOnly}
                    maxDetail="month"
                    next2Label={null}
                    prev2Label={null}
                    className="border-2 rounded-md text-base m-4 p-4 bg-gray-400 text-black  " />
                </div>
              </div>
              <div className='w-full lg:w-3/5 h-auto  flex flex-wrap items-start'>
                {selectedEvent?.length > 0 ? (selectedEvent?.map((each, index) => {
                  return (
                    <div key={uuidv4()} className=' relative w-full h-auto p-4  '>
                      <div className='    select-none w-full  sm:w-[384px]  p-4   hover:shadow-sm hover:shadow-black bg-gradient-to-tr hover:from-gray-200/35 hover:to-indigo-400  from-cyan-400/45  via-white/45 to-indigo-400 rounded-md' >
                        <h1 className='text-slate-900 w-auto text-base xl:text-xl ' >{each.eventTitle}</h1>
                        <div className=' flex gap-x-1 w-auto mt-1 items-center'>
                          <FontAwesomeIcon className='text-xs' icon={faMapPin} style={{ color: "#f1efef", }} />
                          <p className='text-slate-800' >{each.venue}</p>
                        </div>

                        <div className='  flex gap-x-1 mt-1 items-center'>
                          <FontAwesomeIcon className='text-xs' icon={faClock} style={{ color: "#f1efef", }} />
                          <p className='text-slate-800' >{each.time}</p>
                        </div>
                        <div className=' flex gap-x-1 mt-1 items-center '>
                          <FontAwesomeIcon className='text-xs' icon={faCalendarDays} style={{ color: "#f1efef", }} />
                          <p className='text-slate-800'>{`${moment(each.date).format("MMMM Do, YYYY")}`}</p>
                        </div>

                        <div className='w-fit bg-slate-900/60 text-xs text-thin text-white mt-3 rounded-md p-1' onClick={() => handleClick(index)}>read more</div>

                        <div
                          className={`absolute p-4 w-3/5 h-auto bg-gray-600 text-indigo-950  shadow-gray-800  shadow-md  z-20 rounded-lg min-h-16 xl:min-h-36 border  
                      ${popUp[index] ? " transition-all duration-700 ease-in visible top-0 scale-80 " : " bottom-0 transition-all duration-700   invisible  scale-100 "
                            }`}
                        >
                          <div className='w-full flex itrms-end justify-end'>
                            <FontAwesomeIcon onClick={() => handleClick(index)} className='text-xs text-black ml-2 hover:text-red-500 hover:scale-150' icon={faXmark} />
                          </div>

                          <p className='text-slate-900 '>{each.description}</p>
                        </div>

                      </div>
                    </div>
                  )
                })) : <div className='text-slate-500  caret-transparent text-base md:text-xl font-medium text-start px-4 pt-3 '>No events are scheduled for today </div>}
              </div>
            </div>
          </div>
          <ClubGoalSection
          clubName={clubName}
          />
            <ClubStatistics
           clubName={clubName}
        />

        </div>
          <div ref={register} className='w-full h-auto '>
            <ClubRegistrationForm
              
            />
          </div>

        <WhatsAppLink
          link={"https://chat.whatsapp.com/G7mknJ0w7AmGqQcAbXzhSY"}
        />
      </div>

 
                        {/* <div className='w-full flex '>
                            <div className='w-2/5 flex justify-center'>
                                <div className=' w-3/5  select-none  '>
                                    <Calendar
                                        calendarType={'hebrew'}
                                        onChange={onChange}
                                        //   defaultView="month"
                                        value={value}
                                        tileClassName={titleClassName}
                                        formatMonthYear={formatMonthOnly}
                                        maxDetail="month"
                                        next2Label={null}
                                        prev2Label={null}
                                        className="border-2 rounded-md text-base m-4 p-4 bg-gray-400 text-black  " />


                                </div>
                            </div>
                            <div className='w-3/5 h-auto  m-4 flex flex-wrap items-start'>
                                {selectedEvent?.length > 0 ? (selectedEvent?.map((each, index) => {
                                    return (
                                        <div key={uuidv4()} className=' relative w-full h-auto p-4  '>
                                            <div className='    select-none w-[384px] ml-6 p-4   hover:shadow-sm hover:shadow-black bg-gradient-to-tr hover:from-gray-200/35 hover:to-indigo-400  from-cyan-400/45  via-white/45 to-indigo-400 rounded-md' >
                                                <h1 className='text-slate-900 w-auto text-base xl:text-xl ' >{each.eventTitle}</h1>
                                                <div className=' flex gap-x-1 w-auto mt-1 items-center'>
                                                    <FontAwesomeIcon className='text-xs' icon={faMapPin} style={{ color: "#f1efef", }} />
                                                    <p className='text-slate-800' >{each.venue}</p>
                                                </div>

                                                <div className='  flex gap-x-1 mt-1 items-center'>
                                                    <FontAwesomeIcon className='text-xs' icon={faClock} style={{ color: "#f1efef", }} />
                                                    <p className='text-slate-800' >{each.time}</p>
                                                </div>
                                                <div className=' flex gap-x-1 mt-1 items-center '>
                                                    <FontAwesomeIcon className='text-xs' icon={faCalendarDays} style={{ color: "#f1efef", }} />
                                                    <p className='text-slate-800'>{`${moment(each.date).format("MMMM Do, YYYY")}`}</p>
                                                </div>
                                                <div className='w-fit bg-slate-900/60 text-xs text-thin text-white mt-3 rounded-md p-1' onClick={() => handleClick(index)}>read more</div>

                                                <div
                                                    className={`absolute p-4 w-3/5 h-auto bg-gray-600 text-indigo-950  shadow-gray-800  shadow-md  z-20 rounded-lg min-h-16 xl:min-h-36 border  
                      ${popUp[index] ? " transition-all duration-700 ease-in visible top-0 scale-80 " : " bottom-0 transition-all duration-700   invisible  scale-100 "
                                                        }`}
                                                >
                                                    <div className='w-full flex itrms-end justify-end'>
                                                        <FontAwesomeIcon onClick={() => handleClick(index)} className='text-xs text-black ml-2 hover:text-red-500 hover:scale-150' icon={faXmark} />
                                                    </div>

                                                    <p className='text-slate-900 '>{each.description}</p>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })) : <div className='text-slate-500 text-base text-start '>No events are scheduled for today </div>}
                            </div>
                        </div>
                    </div>

                </section >
            <section className='w-full h-auto' ref={register}>
                
            <ClubRegistrationForm />
                
            </section> 
            <WhatsAppLink
             link={"https://chat.whatsapp.com/GASrK7SbSst43QJ1vcKvN6"}
            />   
            </div> */}
            <Outlet/>
    </>
  )
}