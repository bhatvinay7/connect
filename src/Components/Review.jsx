import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../fetch/axios.js'
import { Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Review = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/ReviewSection/getAllDetail");
      setData(response.data)
    }
    try {
      fetchData()
    }
    catch (err) {
      console.log(err.message)
    }
  }, [])

  return (
    <Swiper
      dir="rtl"
      pagination={{
        clickable: true,
      }}
      speed={1000}
      modules={[Autoplay]}
      spaceBetween={15} // Space between slides
      slidesPerView={1} // Number of slides visible at once
      loop={true} // Enables infinite loop
      slidesOffsetBefore={0}
      slidesOffsetAfter={0}

      autoplay={{
        delay: 2000, // Delay between slides (in ms)
        disableOnInteraction:false,
        pauseOnMouseEnter: true, // Keep autoplay after user interaction
      }}
      
      breakpoints={{
        // Default settings (no autoplay for smaller screens)
        0: {
          autoplay: false,
        },
        // Enable autoplay for md breakpoint and above
        768: {
          autoplay: {
            delay: 2000, // Delay between slides
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
        },
      }}

     module={[Autoplay]}

      className=' relative flex justify-center bg-black/20 px-2 overflow-clip items-center  h-auto  rounded-md w-4/5  '>
      {data?.map((each, index) => {
        return (
          <SwiperSlide key={index} className=' overflow-clip w-full h-full  place-content-center rounded-md'>
            <div className='w-full  rounded-md border-l-8 border-l-gray-400 p-2  h-full flex flex-col md:flex-row-reverse justify-start  items-start bg-cyan-200/30  '>
              <div className='w-full  md:ml-4 md:w-fit h-full flex flex-col justify-center items-center md:items-end  '>
                <div className='group  w-auto h-suto  sm:w-24 sm:h-24 hover:bg-gradient-to-tr hover:from-sky-200 hover:via-slate-200 hover:to-cyan-600 rounded-full'>
                  <img className=" group-hover:p-0.5 border border-white inset-0 p-0 w-24 h-24 rounded-full object-fill    aspect-auto " src={`${each.img}`} alt="" />

                </div>
                <div className=' flex flex-col w-fit '>
                <p className='text-center text-slate-200/80 text-base'>{each.name}</p> 
                <div className='flex flex-row-reverse gap-2'>
                <p className='text-center text-slate-200/80 text-xs'>{each.branch}</p>
                <p className='text-center text-slate-200/80 text-xs ' >{each.passout}</p>
                </div>
              </div>
              </div>
             
              <div className=' ml-4 justify-self-end text-wrap  h-auto sm:self-end md:w-full w-full flex justify-center items-center  my-auto   '  >
                <p className=' text-justify sm:text-left text-xs sm:text-base sm:text-balance md:text-end w-auto h-full place-content-center  '>{each.review}</p>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
export default React.memo(Review)