import React from 'react';
import { useEffect,useContext,useState} from 'react';
// import axios from 'axios';
import axios from '../fetch/axios.js'; 
import PopUpSuccessCard from './PopUpSuccessCard.jsx';
import PopUpFailureCard from './PopUpFailureCard.jsx';
import { Form,Link, useActionData,useNavigate,useLocation  } from 'react-router-dom';
import { login} from '../fetch/login.js';
import AuthContext from './GlobalContext.jsx';
import usePopUpHandler from '../fetch/useHandlePopUp.js'
import {useGoogleLogin} from '@react-oauth/google'
export async function action(obj){
  try {
    const formData = await obj.request.formData();
    const email = formData.get('email')
    const password = formData.get('password')
    const response = await login({ email, password });
    return response
  }
  catch (err) {
    return err.response?.data  
  }
}
export default  function Login(){

  let message= useActionData();
  const {auth,setAuth}=useContext(AuthContext);
  const navigate = useNavigate();
  const location=useLocation();
  const previousRoute = location.state?.from;
  const {visible,setVisible}=usePopUpHandler(); 
  // const []
   function handleLogin(e){
  
    gooleLogin()
   }



    const responseGoole=async (authResult)=>{
      try{
           if(authResult['code']){
            const response= await axios.get(`/api/googleLogin?code=${encodeURIComponent(authResult.code)}`,{headers:{"Content-Type":'application/json'},withCredentials:true})
          
        setVisible(true)
        setAuth({userId:response?.data?.userId,accessToken:response?.data?.accessToken,roles:response?.data?.roles});
             //console.log(response.data.roles)
        message=response?.data?.message
       setTimeout(()=>{
           navigate(previousRoute ||'/',{replace:true});
        },2000)
           }
       }
      catch(err){
        console.log(err.message)
      }
    }


  const gooleLogin=useGoogleLogin(
    {
      onSuccess:responseGoole,
      onError:responseGoole,
      flow:'auth-code'
    }
  );
  //const [isLoging,setLoging]=useState(false);
  
 
  useEffect(() => {
    let t=0
    if(message?.emailId || message?.password){
      setVisible(true)
    }
    if (message?.userId) {
      setVisible(true)
        setAuth({userId:message?.userId,accessToken:message?.accessToken,roles:message?.roles});
       t=setTimeout(()=>{
           navigate(previousRoute ||'/',{replace:true});
        },2000)
      
     }
    return ()=>{
      clearInterval(t)
      message={}
    }
}, [message]);
  return (
    <div className=' relative min-h-screen inset-0 top-16 md:top-24 w-full min-w-[220px] justify-center items-center flex flex-col bg-gradient-to-br from-indigo-950/95 via-black to-slate-700 '>
     <div className={`absolute -top-full   w-0 flex flex-col justify-center items-center ${message ?" transition-all duration-1000 ease-out w-full top-2  ":""} `}>  
    < PopUpSuccessCard
     message={message}
     visible={visible}/>
    < PopUpFailureCard
     message={message}
     visible={visible}/>
    </div>
    <div className=" w-full m-auto h-full flex flex-col justify-center items-center p-2 ">
    <div className=" w-full m-auto h-auto min-w-[220px] box-border shadow-2xl bg-slate-500 rounded sm:px-4  md:p-4 md:max-w-xl 2xl:w-2/5">
     <h1 className="text-center mb-8 mt-2 text-xl sm:text-2xl md:text-3xl text-white">Welcome back! login now</h1>
     <div className='w-4/5  p-2 flex justify-center items-center mx-auto mb-3  '>
     <button onClick={(e)=>handleLogin(e)} className=' focus:border focus:border-black w-full  mx-auto font-medium  text-base  rounded-md p-1 text-slate-900   text-center '>
     <div className='bg-slate-300  hover:bg-white rounded-md  w-full flex  hover:border-slate-950  '>
      <div  className=' h-auto w-1/4 ml-2 ' >
        <img className='w-10 h-10 m-2' src={"../../public/icons8-google-48.png"}alt="googleImage"/>
      </div>
      <div className=' w-3/4 text-start place-content-center text-xs sm:text-base'>
        Login with Google
      </div>
     </div>
     </button>

     </div> 






    
     <div className="flex items-center justify-center mb-2 space-x-2">
  <hr className="w-2/5 border-gray-300" />
  <span className="text-gray-300 text-sm">Or</span>
  <hr className="w-2/5 border-gray-300" />
</div>
   <div className=" flex flex-col justify-center items-center w-full">
     <Form className="flex flex-col justify-center items-center w-full" method="post" >
      <input className="p-3 mb-4 w-4/5 text-base rounded sm:max-w-sm md:max-w-[320px] " type='email' name='email' placeholder='Email address' required autoFocus/>
      <input className="p-3 mb-4 w-4/5 text-base rounded sm:max-w-sm md:max-w-[320px] " type='password' name='password' placeholder='password' required/>
      <button  type="submit" className="text-base sm:text-base w-1/2  p-3 rounded mb-4 mt-2 hover:ring-0 ring-teal-500 ring-offset-1 bg-violet-400 hover:bg-teal-200 hover:bg-opacity-25 hover:rounded-md sm:w-1/4  md:w-3/12 "> {"Log In"}</button>
     </Form>
       <div className=" font-sans mb-4 text-base  text-white ">dont have  account ? <Link  className="text-base font-medium  text-blue-300" to="/signin">sign in</Link></div>
   </div>
   </div> 
   </div>
   </div>
  )
}
