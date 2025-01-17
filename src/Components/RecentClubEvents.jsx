import React from "react";
import {Link,useNavigate} from 'react-router-dom'
import { motion } from "motion/react"
const RecentClubEvents=({recentEvents})=>{
  console.log(recentEvents)
   const navigate = useNavigate();
   function handleCardClick(id){
     navigate(`/event/${id}`)
   }

    return( 
 <div className=" w-full h-auto  flex md:justify-start justify-center flex-wrap gap-5 p-4 rounded-md ">
  {Array.isArray(recentEvents) ? recentEvents?.map((each) => (
    <div key={each._id} onClick={()=>handleCardClick(each._id)} className =" rounded-lg group relative caret-transparent shadow-md shadow-purple-600 bg-gradient-to-bl from-slate-600 via-slate-800 to-black w-4/5 sm:w-3/5 md:w-[400px]   h-60 p-4 ">
        <div className=" relative max-w-[400px] z-20  inset-0 " >
     <h1 className="  text-base sm:text-xl md:text-2xl xl:text-3xl text-blue-600 brightness-150 font-fontOswald w-full  select-none caret-transparent p-2  font-medium mb-2 truncate overflow-hidden group-hover:text-black whitespace-nowrap ">{each.eventName}</h1> 
     </div>
      {/* <div className="max-w-[200px] absolute inset-0 bottom-0 top-36  ml-auto rounded-custom-shape truncate overflow-hidden whitespace-nowrap  max-h-24 flex justify-center items-start h-auto  bg-gradient-to-tr from-slate-800 via-purple-700/25 to-black  ">
</div> */} 
   <div className=" absolute w-full rounded-lg brightness-50 hover:brightness-100 h-full inset-0  aspect-auto  ">
      <img  className="w-full h-full rounded-lg object-fill lg:object-cover overflow-clip "src={each.mainImg} alt={each.eventName} />
      </div> 
        </div>
  )):<p>No events found</p>}
  </div>
    )
}
export default React.memo(RecentClubEvents)