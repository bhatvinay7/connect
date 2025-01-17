import React from 'react';
import {useEffect,useState }from 'react'
import useAxiosPrivate from '../fetch/useAxiosPrivate.js';
const ClubStatistics = ({clubName}) => {
  const axiosPrivate=useAxiosPrivate()
  const [club_name,setClubName]=useState("");
  const [memberCount,setMembersCount]=useState("");
  const [workShopOrEventCount,setWorkShopOrEventCount]=useState("")


  useEffect(()=>{
    setClubName(clubName)
  },[])
  useEffect(()=>{
    async function fetchData(){
      const response=await axiosPrivate.get(`/api/techhub/getClubMembersCount?clubName=${encodeURIComponent(club_name)}`)
      const clubStatus=await axiosPrivate.get(`/api/techhub/getclubStatistics`)
      setWorkShopOrEventCount(clubStatus.data)
      setMembersCount(response.data)
      console.log(response.data)
      console.log(clubStatus.data)
    }
    try{
      if(club_name){
        
        fetchData()
      }
    }
    catch(err){
     // console.log(err.message)
    }
  },[club_name])
  return (
    <div className=" flex h-72 w-full items-center  bg-white   justify-center gap-4 p-4 caret-transparent ">

      <div className=" text-lg font-normal relative group flex flex-col w-1/4 justify-center  items-center   p-6 ">

        <p className=" text-xs sm:text-xl md:text-xl lg:text-2xl  w-fit font-bold  text-indigo-500 text-center mb-6">
          Active Members
        </p>
        <div className=" sm:text-xl xl:text-2xl w-fit   font-bold text-slate-600 ">
       {  memberCount?.count ?memberCount?.count:0 }
        </div>
      </div>
      <div className=" font-semibold flex w-1/4 relative flex-col justify-center   items-center p-6   ">
        <p className=" text-xs sm:text-xl md:text-2xl  xl:text-2xl w-fit font-bold text-indigo-500 text-center mb-6">Events</p>
        <div className=" sm:text-xl xl:text-2xl font-bold w-fit text-slate-600 ">0</div>
      </div>




      <div className=" font-semibold flex w-1/4 relative flex-col justify-center   items-center p-6   ">
        <p className=" text-xs sm:text-xl md:text-2xl  xl:text-2xl w-fit font-bold text-indigo-500 text-center mb-6">Workshops</p>
        <div className=" sm:text-xl xl:text-2xl font-bold w-fit text-slate-600 ">0</div>
      </div>
    </div>

  );
};


export default ClubStatistics;
