import React, { useRef, useState,useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from '../fetch/axios.js'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import required modules
import { FreeMode, Scrollbar, Mousewheel, Pagination } from 'swiper/modules';

const AwardAndAchievement=()=>{
  const [data,setData]=useState([]);
  useEffect(()=>{
        async function fetchData(){
          const response=await axios.get("/api/AchievementSection/getAlldetail");
          setData(response.data)
        }
        try{
        fetchData()
        }
        catch(err){
          console.log(err.message)
        }
  },[])
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        direction="vertical" 
        spaceBetween={30}
        freeMode={true}
        scrollbar={true}
        mousewheel={true}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        className=" bg-slate-700 rounded-md min-h-96 w-full my-8  place-content-start p-2 ">
       
        
        <SwiperSlide className='w-full h-auto   ' >
        {data?.map((each,index)=>{
           return(

            <div className='relative w-full h-auto flex flex-col items-start justify-start' key={index} >
              <div className=' relative w-full md:w-2/5 self-center h-auto '>
              <img className='w-full resize-y aspect-auto rounded-md' src={`${each.img}`} alt="img"/>
              <div className='absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-gray-400/40'>
              </div>
             </div>
              <div className='w-full leading-7 text-wrap'>
                <p className='my-2 h-auto bg-slate-200/60 p-4   rounded-md  text-justify'>
                  {each.headLine1}
                </p>
                <p className='my-2 h-auto bg-slate-200/40 p-4 rounded-md  text-justify'>
                  {each.mainContent}
                </p>
              </div>
            </div>
           )
        })}
        </SwiperSlide>
          
        
        
      </Swiper>
    </>
  );
}
export default React.memo(AwardAndAchievement)