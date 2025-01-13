import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons';
export default function Footer(){
    return(
        
        <div className=" relative -bottom-16 md:-bottom-24  z-[32]  w-full bg-gray-300  p-4 text-center text-black top-auto  mt-auto h-auto min-w[280px] ">
        <footer className="h-auto w-full " >
         <div className="h-auto min-h-80 p-4 w-full caret-transparent flex md:flex-row flex-col md:justify-start md:items-start items-center justify-center ">
           
         <iframe className=" md:self-start md:w-2/5 w-full " src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.990264116608!2d77.72525767519704!3d13.350881387000486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16773c548eed%3A0xb9434aad7474e7df!2sNagarjuna%20College%20Of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v1735246811156!5m2!1sen!2sin" width="400" height="300" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

           <div className=" flex  flex-col justify-start items-start md:flex-row md:items-baseline md:justify-around place-content-start w-full md:w-3/5 h-full md:gap-0 gap-4  ">
           <div className=" flex flex-col gap-2   mt-4 self-start md:self-baseline  md:w-1/2 w-fit min-h-full ">
            <Link to={"/"}>
            <div className="text-black/80 text-xs sm:text-base   font-semibold ">HOME</div>
            </Link>

            <Link to={"/about"}>
            <div className="text-black/80 text-xs sm:text-base   font-semibold">ABOUT</div>
            </Link>

            <Link  to={"/events"}>
            <div className="text-black/80 text-xs sm:text-base   font-semibold">EVENTS</div>
            </Link>

            {/* <Link  to={}>
            <div></div>
            </Link >  */}
            
           </div>
           
            <div className=" h-auto self-start  md:w-1/2 w-full gap-2    ">
             <div className=" text-black text-start md:text-start w-full  md:mx-auto mr-auto text-xs sm:text-base md:text-xl lg:text-2xl font-bold mb-4   ">
                CONTACT US
             </div>
             <div className=" flex flex-col justify-start gap-2 md:items-center place-content-center items-start">
                <div className="flex justify-start gap-2 items-start mb-4">
                <FontAwesomeIcon className=" text-xs sm:text-base  md:text-2xl" icon={faLocationDot} />
                
                 <p className="text-black  text-wrap  w-full text-start  text-[8px] sm:text-base ">Nagarjuna College Of Engineering And Technology,Bengaluru</p>
                </div>
             </div>

            <div className=" w-full flex  justify-start md:justify-center gap-2 items-center mb-4">
            <div className=" mx-auto  ">
            <FontAwesomeIcon className=" text-xs sm:text-base md:text-2xl" icon={faPhone} />
            </div>
            <p className="text-black text-left place-content-center w-full text-pretty  text-[8px] sm:text-base ">
             +917019368188   
            </p>    
            </div> 
            {/*  */}
            

             
            <div className=" w-full flex justify-start md:justify-center gap-2 items-center mb-4">
            <div className="mx-auto ">
            <FontAwesomeIcon className="text-xs sm:text-base  md:text-2xl"  icon={faEnvelope} />
            </div>
            <p className="text-black  text-[8px] sm:text-base text-left place-content-center w-full text-pretty ">
             Connectrhandle@gmail.com   
            </p>    
            </div> 


            </div>
            </div>
         </div>
        </footer>
        </div>
    )
}