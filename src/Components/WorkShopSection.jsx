import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Markdown from 'react-markdown'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight}from '@fortawesome/free-solid-svg-icons';
// createRoot(document.body).render(<Markdown>{markdown}</Markdown>)
import useCustomContext from '../fetch/useContext.js'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
const WorkShopSection= ()=> {
  const {workShopmemo,setWorkShopId,workShopSection}=useCustomContext();
  const scrollToSection=(ref)=>{
    ref.current.scrollIntoView({behaviour:"smooth"})
  }
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
         centeredSlides={true}
        spaceBetween={10}
        breakpoints={{
          0:{
            slidesPerView: 1,
          },
          640: { // When the viewport width is >= 640px
            slidesPerView: 2,
            slidesOffsetBefore:10,
            slidesOffsetAfter:10,
          },
          768: { // When the viewport width is >= 768px
            slidesPerView: 2,
          },
          1024: { 
            slidesOffsetBefore:0,
            slidesOffsetAfter:40,// When the viewport width is >= 1024px
            slidesPerView: 3,
            spaceBetween:30
          },
        }}
        // pagination={{
        //   clickable: true,
        // }}
    
        modules={[Pagination]}
        className=" bg-black/75   h-auto w-full sm:w-4/5  lg:w-3/4 place-content-center  "
      >
        { workShopmemo?.workShopInfo?.[0]?.map((each,index)=>{
          return(
            <SwiperSlide key={index} className=' w-2/6 p-2 place-content-start h-auto  select-none   '>
              <div className=' relative z-30 p-4 h-auto bg-gradient-to-tr from-gray-600/45  via-gray-400/10 to-gray-400/20 hover:transition-transform duration-500 ease-in hover:-translate-y-2  hover:from-black hover:to-slate-600/45   rounded-lg w-56 sm:w-64  lg:w-72 max-h-80 mx-auto mb-4 flex flex-col items-center justify-start '>
                <div className=' relative z-30 w-full aspect-auto h-auto max-h-40 overflow-clip object-cover rounded-lg m-2 '>
               <img className=' rounded-md w-full h-full overflow-clip' src={`${each.imgUrl}`} alt="img"/>
               <div className=' absolute z-10 inset-0 bg-gradient-to-b rounded-lg from-transparent via-transparent to-black/10 h-auto w-auto '>
               </div> 
               </div>

               {/* <div className='z-20 w-full h-full absolute pointer-events-none rounded-lg inset-0 bg-gradient-to-tr  from-white via-white/80 to-slate-200/75 '>
               </div>  */}
               <div className=' relative z-20 pb-2 m-2 h-auto w-full '>
               <h2 className='text-slate-300 text-xs sm:text-base lg:tex-base  font-medium font-fontRubik '>{each.workShopName}</h2>
               <p className='text-slate-600 text-xs lg:text-base font-medium'>{each.duration}</p>
               <p className='text-slate-300 text-xs lg:text-base  font-medium'>{each.mode}</p>
               <div onClick={()=>{{setWorkShopId(each._id)
                                    scrollToSection(workShopSection)
               }
               }} className=' z-30 flex w-2/5 justify-start gap-1 items-center place-content-center'>
                <div className='flex items-center justify-start w-fit'>
               <span className='text-indigo-500 font-normal self-center text-xs lg:text-base cursor-pointer '>view more</span>
               <FontAwesomeIcon className='text-xs flex items-center justify-center mt-1 p-1 text-indigo-500 self-center cursor-pointer  ' icon={faArrowRight}  />
               </div>
               
               </div>
               
               </div>
              </div>
            </SwiperSlide>
          )
        }) 
}
        
        
      </Swiper>
    </>
  );
}
export default React.memo(WorkShopSection)