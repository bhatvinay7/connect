import React from 'react';
import { useContext } from 'react';
import axios from '../fetch/axios.js';
import ReactDOM from 'react-dom'; 
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AuthContext from './GlobalContext.jsx';

export default function Layout(){
  const {setAuth}=useContext(AuthContext);
  async function handleLogout(e){
    e.preventDefault();
    try{
     const response= await axios.get('/api/logout/',{
      withCredentials: true
  });
  setAuth({});
    
    }
    catch(err){
      console.log(err);
    }
  }
 return(
  <div>
   <Header
   handleLogout={handleLogout}
   />
   
    <Outlet/>
    
    </div>   
    )
}