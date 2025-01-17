import {  Pagination,Autoplay } from 'swiper/modules';
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink} from '@fortawesome/free-solid-svg-icons';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function AutoplayLinks(){
  return (
    <Swiper
    dir="rtl"
    pagination={{
      clickable: true,
    }}
    modules={[Autoplay]}
    direction="vertical" 
    spaceBetween={0} // Space between slides
    slidesPerView={3} // Number of slides visible at once
    loop={true} // Enables infinite loop
    speed={300} 
    slidesOffsetBefore={0}
    slidesOffsetAfter={0}
    autoplay={{
        delay:500, // Delay between slides (in ms)
        disableOnInteraction:false,
        pauseOnMouseEnter: true, // Keep autoplay after user interaction
    }}

    
     className='flex flex-col w-full items-center justify-center  '>
      <SwiperSlide className=' w-full mb-2 '>
        <Link to="culturalclub">
      <div className=' bg-slate-300 flex items-center justify-between border border-slate-900 rounded-lg place-content-center  w-full   pb-2 text-center hover:bg-gray-300  '>
      <FontAwesomeIcon className='mr-6  text-center' icon={faLink} style={{color: "#050505",}} />
      <div className='ml-6  text-center '>Cultural club</div>
      </div>
      </Link>
        </SwiperSlide>
        <SwiperSlide className=' w-full mb-2 '>
        <Link to="/artsclub">
        <div className='bg-slate-300 flex border  justify-between items-center border-slate-900 rounded-lg place-content-center w-full h-auto pb-2 text-center hover:bg-gray-300' >
        <FontAwesomeIcon className='mr-6  text-center ' icon={faLink} style={{color: "#050505",}} />
         <div className='ml-6  text-center'> Arts club</div>
         </div> 
         </Link>
        </SwiperSlide>
        <SwiperSlide className=' w-full mb-2'>
        <Link to="/techclub">
        <div className=' bg-slate-300 w-full justify-between flex  items-center border border-slate-900 rounded-lg place-content-center h-auto pb-2 text-center hover:bg-gray-300 ' >

        <FontAwesomeIcon className='mr-6  text-center' icon={faLink} style={{color: "#050505",}} />
        <div className='ml-6  text-center'>Tech Club</div>
        </div>
        </Link>
        </SwiperSlide>
        <SwiperSlide className=' w-full mb-2 '>
        <Link to="sportsclub">
        <div className=' bg-slate-300 w-full  flex justify-between  items-center   border border-slate-900 rounded-lg place-content-center  h-auto pb-2 text-center hover:bg-gray-300 ' >
         <FontAwesomeIcon className=' mr-6  text-center' icon={faLink} style={{color: "#050505",}} />
         <div className='ml-6  text-center'>Sports Club</div>
        </div>
        </Link>
        </SwiperSlide>
    </Swiper>
  );
};