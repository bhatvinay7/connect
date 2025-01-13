import React from 'react';
import AutoplayLinks from './AutoplayLinks';
import ClubSection from './ClubSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const HomePageFilter=({setFiltermenue,filterMemo})=>{
  const {clubSection,workShopSection,awardSection,reviewSection}=filterMemo
const scrollToSection=(ref)=>{
    ref.current.scrollIntoView({behaviour:"smooth"})
  }
    return (
        <>
        <div className=' hidden lg:sticky inset-0 lg:top-24  z-20 lg:flex flex-col  place-content-center justify-start items-start  text-center w-3/5 lg:w-1/5 h-full   min-h-screen   border-r border-slate-400  bg-slate-800'>
            <div className=' w-full min-h[180px] h-full mb-4  '>
             <div onClick={()=>setFiltermenue(!filterMemo.filterMenue)} className='w-fit absolute top-1 left-auto right-2'> 
            <FontAwesomeIcon  style={{size:"2xl"}} icon={faXmark} />
            </div>
              <ul className=' w-full grid grid-cols-2 grid-rows-2   place-items-center mt-10 ' >
              <ClubSection
               mystyle={"list-none border border-slate-800  hover:text-white text-black hover:bg-black place-content-center rounded-lg w-3/4 min-h-[30px]  mb-2 pb-2 bg-slate-300"}
              />
              </ul>
            </div>
            <div className=' w-full h-auto   flex flex-col justify-center items-center'>
              <div className='w-full mb-2 mx-auto text-center flex flex-col justify-center items-center  '>
                <p className='mb-1 text-white'>Quick Links</p>
                <AutoplayLinks />
              </div>
              <div className=" w-full h-full mt-4  flex flex-col gap-2 items-center justify-center ">
                <div className=" bg-slate-400 hover:bg-slate-300  h-auto rounded-md w-3/4 p-2 " onClick={()=>scrollToSection(clubSection)}  >Clubs</div>
                <div className="bg-slate-400  hover:bg-slate-300 h-auto rounded-md w-3/4 p-2  "  onClick={()=>scrollToSection(workShopSection)} >Works Shops</div>
                <div className="bg-slate-400 hover:bg-slate-300  h-auto rounded-md w-3/4 p-2   "  onClick={()=>scrollToSection(awardSection)} >Award And Achevements</div>
                <div className="bg-slate-400 hover:bg-slate-300  h-auto rounded-md w-3/4 p-2  "  onClick={()=>scrollToSection(reviewSection)}  >Reviews</div>
                
              </div >
            </div>
          </div>
        </>
    )
}
export default React.memo(HomePageFilter);