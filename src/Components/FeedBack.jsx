import React from 'react'
import { useState,useEffect } from "react";
import { axiosPrivate } from "../fetch/axios";
const FeedbackForm=({value})=>{
  const {body,feedBackRef}=value ||{}
  console.log(body)
  const [feedback, setFeedback] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [errorResponse,setError]=useState("");
  const [response,setResponse]=useState("");
//   const [change,setChange]=useState("");
//   const [event,setEvent]=useState("")
  const maxWords = 400;
//   useEffect(()=>{
//     const t=setInterval(()=>{
//         handleFeedbackChange(event)
//     },300)
//     return()=>{
//         clearInterval(t)
//     }
//   },[change])

  const handleFeedbackChange = (e) => {
    if(e.key!= "Backspace" && wordCount < maxWords ){
    let words = e.target.value.trim()
    .replace(/\n+/g, "") // Replace multiple newlines with a single space
    .replace(/\s+/g, "") // Replace multiple spaces with a single space
    setFeedback(e.target.value);
    setWordCount(words.length);

    
    
    
}
  }

   
  
  const handleSubmit =async (e) => {
      e.preventDefault();
      if (wordCount > 0) {
          try{
           console.log("hii")
            const data={...body, text:feedback}
             const response= await axiosPrivate.post('/api/postEventFeedBack',{data})
            setResponse(response.data);
            setFeedback("")
            
          }
        
          catch(err){
            setError(err.response?.data)
          }
    }
  }
    const handleKeyDown = (e) => {
      if (e.key == "Backspace") {
        // Handle your logic for Backspace here
        if(wordCount>0){
        setWordCount(wordCount-1)
        }
      }
    }
  return (
    <div ref={feedBackRef} className=" relative caret-transparent min-h-80 flex w-full items-center justify-center bg-transparent px-4">
      <div className=" w-full lg:w-3/4   p-6 bg-slate-500/25 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-slate-700 text-center mb-6">
          Feedback Form
        </h2>
        <form onSubmit={handleSubmit} className=" w-full space-y-4">
          {/* Feedback Text Area */}
          <div className="w-full">
            <label
              htmlFor="feedback"
              className="block text-sm font-medium  text-slate-700 mb-2"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onKeyDown={handleKeyDown}
              onChange={handleFeedbackChange}
              placeholder="Write your feedback (maximum 400 words)"
              className="w-full min-h-36 max-h-48 p-3 bg-gray-700/30 text-black/45 font-mono rounded-md border border-gray-400/10 caret-black overflow-hidden ring focus:ring-purple-500/10 focus:border-purple-500/25"
            ></textarea>
            <div className=" w-full flex justify-end ">
            <p
              className={`mt-2 text-sm ${
                wordCount > maxWords ? "text-red-400" : "text-gray-400 text-xs md:text-base "
              }`}
            >
              {wordCount}/{maxWords} words
            </p>
          </div>
            <div className='w-fit h-auto mx-auto'>{response?
              <p className='text-[10px] text-green-500 font-fontRubik font-semibold sm:text-base text-cenetr text-wrap '>{response}</p>:<p className='text-[10px] font-fontRoboto text-red-600 sm:text-base text-cenetr text-wrap'>{errorResponse}</p>} </div>
            </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className=" w-fit   py-2 px-4 bg-purple-600/35 hover:bg-purple-700/60 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={wordCount === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(FeedbackForm)
