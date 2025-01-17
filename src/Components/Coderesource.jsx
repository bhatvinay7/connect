import React from 'react';
import ReactDOM from 'react-dom';
import {useGetResource} from '../fetch/getdata.js';
import { useLoaderData,Link } from 'react-router-dom';
// import {arrayBufferToBase64} from '../../HelperFunctions/arrayBuffer.js';
//import './Styles/Coderesource.css'
export async function  loader({params}){
   return await useGetResource(params.id)
}
export default function Coderesource(){
    const {data:resource,error}=useLoaderData();
    if(error){
      return (
         <>
         {error.message}
         </>
      )
    }
    const elements=resource?.map((element,index)=>{
      const base64String=arrayBufferToBase64(element?.img.data.data);
      return(
         <div key={index} className="codeCardDiv">
             <Link to={`/:${element?._id}`} className="coderesourcelink">
             <div className="linkContainer">
            <h2 className='elementNameStyle'>{element.name}</h2>
            <img src={`data:image/png;base64,${base64String}`}className="imgStyle"></img>
            <div className="spandiv">
               <div>
               <span>{element.language}</span>
               </div>
               <div>
               <span>{element.vote}</span>
               </div>
            </div>
            </div>
           </Link>
         </div>
      )
    })
    return(
       <>
       <h1>Coding club</h1>
       <div className="elementsContainer">
       {elements}
       </div>
       
    
       </>

    )
}