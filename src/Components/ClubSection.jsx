import React from 'react'
import { v4 as uuidv4 } from 'uuid';
const  ClubSection=({mystyle,value,setType,currentType})=>{
    const array=value?.homePageClubInfo?.[1] || value?.workShopInfo?.[1]
    console.log(currentType)
    return(
      <div className='h-auto flex flex-wrap items-center justify-start gap-4'>
      { array?.map((each,index)=>{
         return(
        <li key={uuidv4()} onClick={()=>setType(each._id)} className={`${mystyle} ${currentType == each._id ? "bg-black text-white text-xs sm:text-base " :"bg-white ext-xs sm:text-base text-black" }` } 
 >{each._id}</li>
    )})}
      </div>
    )
}
export default React.memo(ClubSection)
// list-none border border-slate-800  hover:text-white text-black hover:bg-black place-content-center rounded-lg w-3/4 min-h-[30px]  mb-2 pb-2 bg-slate-300