import React from 'react'
import {useState,useEffect} from 'react'
import useAxiosPrivate from '../fetch/useAxiosPrivate.js';
export default function clubGoalSection({clubName}){
    console.log(clubName)
    const [club_name,setClubName]=useState(clubName) 
    const [clubData,setClubData]=useState("")
    const axiosPrivate=useAxiosPrivate()
    useEffect(()=>{
        async function fetchData(){
              const response=await axiosPrivate.get(`/api/techhub/getGoals?clubName=${encodeURIComponent(club_name)}`)
              setClubData(response.data)
        }
        if(club_name){
            try{
                fetchData()          
                              
            }
            catch(err){
                console.log(err.message)
            }
        }
    },[club_name])


return(
    <div className=" w-full h-auto  p-4 bg-black caret-transparent ">
    <h2 className="text-3xl font-semibold text-center text-white mb-8">Our Goals</h2>
    {clubData? clubData.map((each)=>{
        return(
           <div key={each._id} className='w-full h-auto'>
                    <p className=" text-lg text-center text-white/65 mb-12">
                  {each.clubHeading}
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
       {each.clubGoals.map((skill,index)=>{
        return(
            <div key={skill._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:transition-[transform,scale]  hover:duration-500 hover:ease-in hover:-translate-y-3 ">
            <h3 className=" text-xl sm:text-2xl font-semibold  text-purple-600 mb-4">{`${index+1}.${skill.goalHeading}`}</h3>
            <p className=" text-xs sm:text-base  text-justify text-gray-700 mb-12">
                {skill.information}
            </p>
          </div>
    
        )
       })}
    </div>
           </div>
        )
    }):<></>}        
  </div>
)
}