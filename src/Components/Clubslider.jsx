import React from 'react'
import {Link} from 'react-router-dom'
import {  Pagination,Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useContext from '../fetch/useContext.js'
// import { useMemo } from 'react';
const NewClubslider=React.memo(() => {
  const {homePageAndClubIntro}=useContext()
  const linkArr=["artsclub","culturalclub","sportsclub","techclub"]
  return (
    <div className=" w-full h-auto ">
            <h2 className="text-xl xl:text-3xl text-indigo-800 font-fontRobotoSlab  text-wrap text-center font-bold p-4 ">
            {homePageAndClubIntro && homePageAndClubIntro[0]?.tagLine}
            </h2>
            <Swiper
    dir="rtl"
    pagination={{
      clickable: true,
    }}
     
    modules={[Autoplay]}
    spaceBetween={15} // Space between slides
    // slidesPerView={3} // Number of slides visible at once
    loop={true} // Enables infinite loop
    slidesOffsetBefore={20}
    slidesOffsetAfter={20}
    breakpoints={{
      640: { // When the viewport width is >= 640px
        slidesPerView: 2,
        slidesOffsetBefore:10,
        slidesOffsetAfter:10,
      },
      768: { // When the viewport width is >= 768px
        slidesPerView: 2,
      },
      1024: { // When the viewport width is >= 1024px
        slidesPerView: 3,
      },
    }}
    
    autoplay={{
        delay: 5000, // Delay between slides (in ms)
        disableOnInteraction:false,
        pauseOnMouseEnter: true, // Keep autoplay after user interaction
    }}

    
      className='flex justify-center rounded-md bg-slate-900  items-center h-52  sm:h-72 w-3/4 place-content-center '
    >
     {homePageAndClubIntro && homePageAndClubIntro[0]?.img?.map((url,index)=>{
      return(
      <SwiperSlide key={index}   className=' place-content-center w-full  sm:min-w-[280px]  rounded-lg '>
        <div className=' relative bg-slate-900 m-2 aspect-auto w-4/5  group flex flex-col justify-start items-center  rounded-lg p-4 h-auto max-h-[240px]  hover:shadow-md hover:shadow-slate-900 hover:bg-blue-950 '>
        <div className='group-hover:visible absolute rounded-lg w-full inset-0 h-full group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:via-transparent group-hover:to-gray-900 '>

        </div>
        <img className=" w-56 z-0 object-fill rounded-lg  aspect-auto " src={`${url}`} alt=""/>
        <Link to={`/${linkArr[index]}`}>
         <div  className=' group relative z-30 invisible w-0 h-0   group-hover:block mt-4 group-hover:transition-all bg-gradient-to-b from-transparent via-transparent to-white/35 hover:bg-gradient-tl hover:from-blue-500 hover:via-blue-500 hover:to-blue-400 duration-300 ease-in group-hover:w-28 group-hover:h-10 group-hover:visible rounded-lg bg-black/90   text-center place-content-center text-white' >
            RIgister
            <div className='absolute z-40 inset-0 w-full h-full group-hover:bg-gradient-to-b  group-hover:from-transparent  group-hover:via-transparent to-white/50 '></div>
         </div>
        </Link>
        </div>
      </SwiperSlide>
  )})     
    }

    </Swiper>
  
</div>


      )
}
)
export default NewClubslider




