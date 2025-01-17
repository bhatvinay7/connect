import React from 'react';
import { motion} from "motion/react"
import {Link} from 'react-router-dom'
 export default function ClubNavigation({value}){
   const {clubActivity,recentEvent,register}=value
  const scrollToSection=(ref)=>{
    ref.current.scrollIntoView({behaviour:"smooth"})
  }
           return(
              <div  className='w-fit flex items-center justify-center flex-wrap select-none gap-0.5 sm:gap-1 md:gap-2'>
                <motion.div onClick={()=>scrollToSection(recentEvent)} className=' relative group w-fit p-2 bg-white/75 text-[8px] sm:text-xs md:text-base  text-black border border-black   rounded-md'
                  whileHover={{scale:1.04}}
                  >Recent Events
                    <div className=' absolute inset-0 rounded-md group-hover:visible  w-full h-full shadow-sm group-hover:shadow-cyan-100'></div>
                </motion.div>
                <motion.div   whileHover={{scale:1.04}} onClick={()=>scrollToSection(clubActivity)} className='relative group text-[8px] sm:text-xs md:text-base  w-fit p-2 bg-white/75 text-black border border-black rounded-md'>Activities
                <div className=' absolute inset-0 rounded-md pointer-events-none group-hover:visible  w-full h-full shadow-sm group-hover:shadow-cyan-100'></div>
                </motion.div>
                <Link  to="/searchevents">
                <motion.div    whileHover={{scale:1.04}} className='relative group w-fit text-[8px] sm:text-xs md:text-base  p-2 bg-white/75 text-black border border-black rounded-md'>Search Events
                <div className=' absolute inset-0 rounded-md pointer-events-none group-hover:visible  w-full h-full shadow-sm group-hover:shadow-cyan-100'>
                </div>
                </motion.div>
                 </Link>
                <motion.div   whileHover={{scale:1.04}} onClick={()=>scrollToSection(register)} className='relative text-[8px] sm:text-xs md:text-base group w-fit p-2 bg-white/75 text-black border border-black rounded-md'>Registration
                <div className=' absolute inset-0 rounded-md group-hover:visible  w-full h-full shadow-sm group-hover:shadow-cyan-100'></div>
                </motion.div>
              </div>
 )
}