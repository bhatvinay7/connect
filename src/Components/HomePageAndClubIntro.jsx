import React from 'react'
import Clubslider from "./Clubslider";
import useContext from '../fetch/useContext'
const HomePageAndClubIntro=({value,setFiltermenue})=>{
   const {isVisible,filterMenue,homePageAndClubIntro}=value
  
    return(
        <>
         {homePageAndClubIntro?.map((homePageAndClubIntro,index)=>{
          return (
       <div key={index} className='w-full h-auto'>  
         {/* bg-gradient-to-tr from-slate-100/75  via-sky-200/45 to-indigo-200/60 */}
     <section  className=" relative h-auto    bg-cover bg-current  backdrop-brightness-200  flex flex-col ">
            
           <div className='w-full h-full absolute inset-0 bg-gradient-to-r from-white/25 via-indigo-500/30 to-black/35 z-10 '>
            
            </div> 
          {!filterMenue ?  <div onClick={()=>setFiltermenue(!filterMenue)} className="relative z-20 top-4 md:top-0 w-fit h-8 lg:flex hidden rounded-r-md pr-2 items-center justify-start  bg-slate-200">
         <svg  className="inline-block  "
            xmlns="http://www.w3.org/2000/svg"
            height="26px"
            viewBox="0 -960 960 960"
            width="34px"
            fill="#000000"
          >
            <path d="M431.33-120v-230H498v82h342v66.67H498V-120h-66.67ZM120-201.33V-268h244.67v66.67H120Zm178-164v-81.34H120v-66.66h178V-596h66.67v230.67H298Zm133.33-81.34v-66.66H840v66.66H431.33Zm164-163.33v-230H662v81.33h178V-692H662v82h-66.67ZM120-692v-66.67h408.67V-692H120Z" />
          </svg>
          <div className=" text-xs md:text-base font-semibold">
            Filter
            </div>  
          </div> :<></>}
            <div className={` h-56  w-full my-auto flex   items-center justify-center  text-wrap ${filterMenue? "xl:text-3xl":"xl:text-3xl"} font-semibold `}>
              <h1
                className={`${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } w-3/5 mt-14   text-white relative z-20 leading-snug font-fontMerriweather transition-all duration-1000 ease-in`}
              >
                {homePageAndClubIntro.headLine}
              </h1>
            </div>
            {/* <img className='w-40 self-center rounded-full aspect-square object-fill ' src="../../public/CONNECTR.png" alt=""/> */}
            <div className=" relative z-20 flex flex-row justify-start gap-2 w-full">
              <div className="m-0 w-0  xl:mx-8 place-content-center">
                {/* <FontAwesomeIcon  className="text-3xl" icon={faArrowRight} s style={{color: "#B197FC",}} /> */}
               </div>
              <p className=" h-auto   mb-6    xl:w-4/5  p-4 font-fontRubik self-center text-wrap text-justify xl:text-start  drop-shadow-md decoration-purple-200 text-base text-gray-400 xl:leading-10 xl:text-xl ">
               {homePageAndClubIntro.webPageInfo}
              </p>
            </div>
          </section>
          </div> 
  ) } ) }
  
            
 {/* <section> */}
{/* <div className="w-full h-auto bg-white mb-3 ">
  <h2 className="text-4xl text-indigo-800 font-fontRobotoSlab  text-wrap text-center font-bold p-4 ">
  {homePageAndClubIntro.tagLine}
  </h2>
  <Clubslider />
</div>
</section> */}


</>
    )
}
export default React.memo(HomePageAndClubIntro)