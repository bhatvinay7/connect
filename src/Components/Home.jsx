import React from "react";
import ReactDOM from "react-dom";
// import { useNavigation } from 'react-router-dom';
import { motion} from "motion/react"
import {Link} from 'react-router-dom'
import Markdown from 'react-markdown'
import Clubslider from "./Clubslider";
import HomePageFilter from "./HomePageFilter";
import { ContextProvider } from "./Context.jsx";
import Activityslide from "./Activityslide";
import HomePageAndClubIntro from "./HomePageAndClubIntro.jsx";
import WorkShopSection from './WorkShopSection.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useMemo, useRef } from "react";
import countDown from "../fetch/coutDown.js";
import AwardAndAchievement from "./AwardAndAchievement.jsx";
import ClubSection from "./ClubSection";
import Review from "./Review.jsx";
import axios from '../fetch/axios.js'
import PropagateLoader from "react-spinners/PropagateLoader";
import Footer from './Footer.jsx'
import useAxiosPrivate from '../fetch/useAxiosPrivate.js';
import {fadeIn} from '../fetch/fadeIn.js'
export default function Home() {
  const axiosPrivate=useAxiosPrivate()
  const [isLoading, setLoading] = useState(true);
  const [isVisible,setIsVisible] = useState(false);
  const [isUpcomming,setUpcomming]=useState("")
  const [filterMenue,setFilterMenue] = useState(false);
  const [homePageAndClubIntro,setHomePageAndClubIntro] = useState([])
  const [homePageEvents,sethomePageEvents] = useState([])
  const [homePageClubInfo,sethomePageClubInfo] = useState([])
  const [currentClub,setCurrentClub] = useState("Tech club")
  const [currentWorkShopType,setWorkShopType] = useState("Technical")
  const [workShopInfo, setWorkShopInfo] = useState([]);
  const [workShopDetail, setWorkShopDetail] = useState([])
  const [workShopId, setWorkShopId] = useState("")
  const clubSection = useRef(null);
  const workShopSection = useRef(null);
  const awardSection = useRef(null);
  const reviewSection = useRef(null);

  // console.log(workShopDetail)
  const [countDown, setCountDown] = useState("");
  // const [countdowns, setCountdowns] = useState(() =>
  //   homePageEvents?.map((each) => countDown(each.date)))
  const [countdowns, setCountdowns] = useState("")
  useEffect(() => {
    const interval = setInterval(() => {
      if (homePageEvents) {
        setCountdowns(homePageEvents?.map((each) => countDown(each.date)));
      }
    }, 2000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [homePageEvents]);





  useEffect(()=>{
    if(homePageEvents){
      setUpcomming(homePageEvents?.map((each) => each.upCommingEvent))
    }
  },[homePageEvents])



  useEffect(() => {
    async function fetch(){
      try {
    const response = await axiosPrivate.get('/api/event/getNextEvents');
      // sethomePageEvents(response.data)
    }
    catch (err) {
      console.log(err.message)
    }
  }
  
      fetch()
   
  },[])

  useEffect(() => {
    async function fetchData() {
      const response = await axiosPrivate.get('/api/HomePageAndClubIntro')
      setHomePageAndClubIntro(response.data)
      setLoading(false)
      console.log(response.data)
    }
    try {
      fetchData()
    }
    catch (err) {
      console.log(err.message);
    }
  }, []);
  useEffect(() => {
    // Add the visible class after the component is mounted
    setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay to ensure transition effect is visible
  }, []);

 

  useEffect(() => {
    async function fetchData() {
      const response = await axiosPrivate.get(`/api/HomePageClubInfoSection?currentType=${encodeURIComponent(currentClub)}`);
      sethomePageClubInfo(response.data)
    }
    try {
      fetchData()
    }
    catch (err) {
      console.log(err)
    }
  }, [currentClub])

  useEffect(() => {
    async function fetchData() {
      const response = await axiosPrivate.post(`/api/getWorkShopSection?workShopType=${encodeURIComponent(currentWorkShopType)}`, {})
      setWorkShopInfo(response.data)
      // console.log(response.data)
    }
    try {
      fetchData()
    }
    catch (err) {
      console.log(err)
    }
  }, [currentWorkShopType])


  useEffect(() => {
    async function fetchData() {
      const response = await axiosPrivate.post(`/api/getWorkShopDetail?workShopId=${encodeURIComponent(workShopId)}`,{})
      setWorkShopDetail(response.data)
      
    }
    try {
      //console.log(workShopId)
      if (workShopId) {
        console.log(workShopId)
        fetchData()
      }
    }
    catch (err) {
      console.log(err)
    }
  }, [workShopId])



  const memoizedValue = useMemo(() => ({ homePageAndClubIntro }), [homePageAndClubIntro]);
  const clubInfomemo = useMemo(() => ({ homePageClubInfo }), [homePageClubInfo]);
  const workShopmemo = useMemo(() => ({ workShopInfo }), [workShopInfo]);
  const workShopmemodetail = useMemo(() => ({ workShopmemo, setWorkShopId, workShopSection }), [workShopmemo]);
  // const reference={clubSection,workShopSection,awardSection,reviewSection}
  const filterMemo = useMemo(() => ({ filterMenue, clubSection, workShopSection, awardSection, reviewSection }), [filterMenue]);

  const value =useMemo(()=>( { filterMenue, isVisible, setIsVisible, homePageAndClubIntro }),[homePageAndClubIntro,filterMenue,isVisible]) 



  if (isLoading) {
    return (
      <div className="  relative min-h-screen min-w-[280px] w-full inset-0 top-20 md:top-24 flex justify-center items-center bg-gradient-to-br from-slate-950/95 via-indigo-950/90 to-slate-900/95 ">
        <PropagateLoader
          size={20}
          color={"#87CEEB"}
        />
      </div>
    )
  }
  return (
    <motion.div className=" relative inset-0 min-h-screen top-16 md:top-24   h-auto w-full  caret-transparent bg-slate-900 "
    
    
    >
      

      <div className=" relative inset-0  flex w-full h-full min-h-screen bg-slate-800 ">

        {filterMenue ? (
          <HomePageFilter setFiltermenue={setFilterMenue} filterMemo={filterMemo} />
        ) : null}
        <div
          className={`  h-auto ${filterMenue ? " w-full lg:w-4/5 lg:ml-auto" : " w-full "
            }`}>
          <HomePageAndClubIntro  value={value}
          setFiltermenue={setFilterMenue} 
          /> 

          <section className="w-full h-auto bg-slate-900  ">
            <ContextProvider children={<Clubslider />} value={memoizedValue} />
          </section>

          <section className=" h-auto w-full  bg-slate-900 p-4 ">
            {isUpcomming.length>0 ?
            <h1 className=" p-2 xl:ml-14 w-fit text-xl sm:text-3xl md:text-4xl font-fontOswald font-extrabold text-indigo-900 ">
              Upcoming Events
            </h1>:<></>}
            <div className=" w-full    flex flex-wrap justify-start items-center gap-4">
              {homePageEvents?.map((each, index) => (
                <div key={index} className=" md:ml-14 w-fit  md:w-2/5 lg:w-full">
                  <div className=" relative w-full flex justify-start items-center mb-2 ">
                    <div className=" group min-w-fit bg-gradient-to-tr from-slate-700 via-slate-300 to-blue-500 shadow-sm shadow-black transition-transform duration-300 ease-in-out h-auto overflow-hidden rounded-lg">
                      <div className=" w-fit   sm:w-fit h-12 relative p-0.5 group-hover:scale-110 ">
                        <div className=" text-xs text-slate-700 bg-gradient-to-tr from-slate-200/40 via-slate-300/30 to-white/30 w-full h-auto p-1 rounded-lg font-fontRoboto">
                          <div className=" text-[8px] sm:text-xs  flex gap-2 items-center justify-center">
                            {['days', 'hours', 'minutes', 'seconds'].map((unit, i) => (
                              <div key={i} className=" flex flex-col items-center ">
                                <div className="p-1 w-fit bg-yellow-100 text-[8px] sm:text-xs rounded-full">{countdowns[index]?.[unit]}</div>
                                <div className=" text-[8px] sm:text-xs">{unit}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" group relative w-full h-auto aspect-auto lg:w-2/6 ">
                    <img
                      className=" w-full h-auto object-cover rounded-xl"
                      src={`${each.img}`}
                      alt="eventImage"
                    />
                    <div className=" absolute inset-0 hover:brightness-125 bg-gradient-to-b from-black/60 via-gray-400/25 to-black/75  shadow-md shadow-slate-800 rounded-md"></div>
                    <div className="absolute inset-0 flex flex-col justify-around items-center p-4 text-white bg-gradient-to-br from-slate-800 via-black/65 to-slate-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500  ">
                      <p className=" text-xs truncate overflow-hidden whitespace-normal sm:text-base">{each.shortEventInfo}</p>
                      <Link to={"events"}>
                      <button className=" mt-2 md:px-4 lg:py-2 px-4 py-0.5 sm:py-1.5 text-xs sm:text-base bg-purple-800 rounded-md">Read More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section ref={clubSection} className=" w-full h-auto  bg-slate-900">
            <div className=" flex flex-col gap-2  ">
              <h2 className=" p-2 xl:ml-14 text-xl sm:text-3xl md:text-4xl font-bold text-indigo-900">
                Discover Your Passion
              </h2>
              {/* <div className=" flex flex-col w-full h-full"> */}
                <div className=" p-4 flex w-fit md:ml-14  h-auto flex-col md:flex-row gap-3 my-1  ">
                  <ClubSection  
                    value={clubInfomemo}
                    currenType={currentClub}
                    setType={setCurrentClub}
                    mystyle={
                      " list-none text-xs font-normal md:text-base relative border sm:border-2 border-slate-800 caret-transparent bg-gradient-to-b from-transparent via-transparent to-purple-400/45    ring ring-blue-500/45 hover:border-slate-200 hover:shadow-xl hover:shadow-blue-200  hover:text-white text-black hover:bg-slate-900 place-content-center rounded-xl w-auto min-h-[15px] p-0.5 sm:p-1 "
                    }
                  />
                </div>
              {/* </div> */}


              <div className="flex h-auto flex-col w-full overflow-x-clip md:gap-2  md:flex-row-reverse  text-xs sm:text-base  text-justify md:text-base">
                <div className=" w-full overflow-x-clip  md:w-2/5 h-auto ">
                <Activityslide value={clubInfomemo} />

                </div>
                <div className=" w-full md:w-3/5 h-auto md:p-4 p-2 bg-black/75 text-white/75 lg:rounded-lg shadow-md ">
                  {homePageClubInfo[0]?.map((each, index) => (
                    <p className=" leading-7 " key={index}>{each.clubInformation}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section ref={workShopSection} className=" relative w-full h-auto bg-black">
            <div className=" p-4 md:ml-14 flex w-fit h-auto flex-row flex-wrap gap-1 sm:gap-2  mb-3 pt-4  ">
              <ClubSection
                value={workShopmemo}
                currentType={currentWorkShopType}
                setType={setWorkShopType}
                mystyle={
                  " list-none text-xs md:text-base relative border sm:border-2 border-slate-800 caret-transparent bg-gradient-to-b from-transparent via-transparent to-purple-400/45 ring ring-blue-500/45 hover:border-slate-200 hover:shadow-xl hover:shadow-blue-200  hover:text-white text-black hover:bg-slate-900 place-content-center rounded-xl w-auto w-fit h-fit min-h-[12px]  p-0.5 sm:p-1  "
                }
              />
            </div>
            <div className=" w-full h-auto ">
              <h2 className=" p-2 ml-4 md:ml-14 w-fit text-xl mb-2 sm:text-3xl  md:text-4xl text-indigo-900 font-bold">
                Workshops That We Offer
              </h2>
              <div className="w-full h-auto p-4 ">
              <ContextProvider children={<WorkShopSection />} value={workShopmemodetail} />
              </div>
            </div>

            <div className={`  z-30 absolute w-full m-2 custom-scrollbar custom-scrollbar-thumb xl:w-3/5 border border-gray-400/45 text-wrap custom-scrollbar outline-none p-6 rounded-md max-h-screen overflow-y-scroll mx-auto bg-white ${workShopId ? " visible transition-all inset-0 top-16   duration-700 ease-in " : " transition-all duration-500 ease-in -top-full invisible inset-0 "} `}>
              <div onClick={() => setWorkShopId("")} className="  w-full h-auto mb-2 flex  place-content-end cursor-pointer ">
                <FontAwesomeIcon className=" text-base self-end   hover:text-red-500 hover:scale-125 text-black  " icon={faXmark} />
              </div>
              <div></div>
              {
                workShopDetail?.map((each, index) => {
                  return (
                    <div className=" p-0.5 " key={index}>
                      <Markdown className="leading-7 font-fontRoboto text-slate-700 ">{each.detail}</Markdown>
                    </div>
                  )
                })
              }
            </div>


          </section>

          <section ref={awardSection} className=" w-full h-auto bg-slate-900">
            <div className="p-1">
              <h2 className="text-xl  sm:text-2xl md:ml-14 md:text-4xl text-indigo-900 font-bold">
                Awards and Achievements
              </h2>
              <AwardAndAchievement />
            </div>
          </section>

          <section ref={reviewSection} className=" relative w-full h-auto bg-slate-900 p-2 ">
            <Review />
          </section>
        </div>
      </div>
    </motion.div>
  );

}
