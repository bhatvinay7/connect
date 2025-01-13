import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

export default function EventSlider({value}) {
  const arr=value?.[0]
  console.log(arr)
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        slidesPerView={1}
        modules={[Pagination]}
        className=" flex items-center caret-transparent justify-center h-auto shadow-md shadow-white  "
      >
        {arr?.map((each,index)=>{
        return(
        <SwiperSlide className=' aspect-auto md:aspect-video w-full sm:max-h-60 md:min-h-72 lg:max-h-80 max-w-[600px]  ' key={uuidv4()}>
            <div  className='h-full w-full'>
                <img className='object-cover md:object-contain h-full w-full' src={`${each}`} alt={`${each}`}/>
            </div>
        </SwiperSlide>
            )
           })

           }        
      </Swiper>
    </>
  );
}
