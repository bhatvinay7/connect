
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const Activityslide=({value})=> {
  const clubImg = value?.homePageClubInfo?.[0]?.[0]?.clubImg

  return (
    <>
      <Swiper
        spaceBetween={0} // Space between slides
        slidesPerView={1}
        centeredSlides={true}
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}        
        pagination={{
          clickable: true,
          dynamicBullets:true}
          } 
        modules={[Pagination]}
      

        className=" w-full flex flex-shrink-0 h-auto   outline-none bg-black lg:rounded-md "
      >
        {
          clubImg?.map((url,index)=>{
            return( 
        <SwiperSlide key={index} className='h-auto w-full overflow-x-clip m-0 bg-violet-500/10 lg:rounded-md ' >
          <div className="lg:rounded-md md:h-80 w-full sm:aspect-auto md:aspect-video overflow-x-clip ">
            <img className='lg:rounded-md resize-y  object-cover  w-full h-full ' src={`${url}`} alt="clubImg"/>
          </div>
        </SwiperSlide>
      )})}
      </Swiper>
    </>
  );
}

export default React.memo(Activityslide)