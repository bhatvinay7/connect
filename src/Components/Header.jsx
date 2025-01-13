import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHouse, faCaretDown, faUser, faCircle } from '@fortawesome/free-solid-svg-icons';

import { useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import DropDown from './DropDown.jsx';
import AuthContext from './GlobalContext.jsx';
function Header({ handleLogout }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible] = useState(false)
  const { auth, setAuth } = useContext(AuthContext);
  const style = {
    color: "rgba(0, 0, 0, 0.826)",
    textDecoration: "underline",
  }





  useEffect(() => {
    if (toggle) {
      document.body.classList.add("overflow-hidden")

    }
    else {
      document.body.classList.remove("overflow-hidden")
    }
    return () => {
      document.body.classList.remove("overflow-hidden")
      setVisible(false)

    }


  }, [toggle])
  return (
    <div className=" caret-transparent z-40 fixed inset-0  w-full min-w-[280px] h-24 ">
      <header className=" hidden md:flex md:w-full h-full items-center  md:bg-gray-800 ">
        <div className="  md:items-center w-1/5 ">
          <h1 className=" md:ml-4 md:w-1/5 md:text-orange-500 md:text-2xl">Connectr</h1>
        </div>
        <div className=" md:w-4/5 lg:w-3/5 ml-auto  ">
          <nav className=" md:flex justify-around gap-2 ">

            <NavLink
              className={" outline-none md:text-teal-500   md:text-base"} to="/">Home

              {/* <div className={`" ${({ isActive }) =>
              isActive ? " border-b-2 pb-0.5 border-white rounded-sm   " : "border-none"
            }`} >
            </div> */}

            </NavLink>
            <DropDown />
            <NavLink className="outline-none  md:text-teal-500 md:text-base" to="about">About</NavLink>
            <NavLink className="outline-none md:text-teal-500  md:text-base" to="signin">Sign In</NavLink>
            <div className={auth?.userId ? "md:block" : "hidden"}>
              <button onClick={handleLogout} className="text-red-600 md:text-base" >Sign Out</button>
            </div>
            <div className={`${auth?.userId ? "block" : "hidden"} relative group`}>
              <FontAwesomeIcon className=" md:text-xs xl:text-xl text-slate-200 bg-gray-500 rounded-full px-2 py-1.5 " icon={faUser} />
              <div className='w-fit max-w-52 truncate text- p-1 invisible group-hover:visible right-4 absolute top-6 flex flex-col bg-white rounded-md '>
                <span className='text-xs sm:text-base'>{auth?.userId}</span>
                {/* <div className='flex items-start justify-start gap-1'>
              <span>
              <FontAwesomeIcon className={` text-[8px] ${isOnline ? "text-green-400":"text-red-500"}   `}icon={faCircle} />
              </span>
               {isOnline?<span className='text-xs sm:text-base' >Online</span>:<span>Offline</span>}
             </div> */}
              </div>
            </div>
          </nav>
        </div>
      </header>
      <header className={`h-16 caret-transparent  relative grid grid-clos-1 grid-rows-auto  md:hidden`}>
        <div className={`flex  items-center  bg-gray-800 w-full p-2 h-20 col-span-full }`}>
          <FontAwesomeIcon className=' text-base sm:text-xl' onClick={() => setToggle(!toggle)} icon={faBars} />
          <h1 className="md:text-2xl text-base text-center ml-4 text-orange-500 sm:text-xl ">Connectr</h1>
          <div className={`${auth?.userId ? "block" : "hidden"} relative group ml-auto mr-4`}>
            <FontAwesomeIcon className=" md:text-xs xl:text-xl text-slate-200 bg-gray-500 rounded-full px-1.5 py-1 " icon={faUser} />
            <div className='w-fit max-w-52 truncate text- p-1 invisible group-hover:visible right-4 absolute top-6 flex flex-col bg-white rounded-md '>
              <span className='text-xs sm:text-base'>{auth?.userId}</span>

            </div>
          </div>
          <div/>  
        </div>   
          <div className={`absolute  top-20 z-10 bg-gradient-to-r from-indigo-800/75 to-gray-500 min-h-screen h-full  md:hidden ${toggle
              ? " visible transition-all duration-700 ease-in w-full  overflow-y-scroll "
              : " transition-all  duration-700 ease-in w-0  invisible "
            }`}>

            <nav className="flex flex-col gap-8 mt-4 ml-6 w-full">

              <div onClick={() => setToggle(!toggle)} className="flex gap-x-1.5 w-full">
                <FontAwesomeIcon  className=" text-xs  sm:text-base"icon={faHouse} />
                <NavLink className="text-black  text-center text-xs sm:text-base" to="/"><span className="">Home</span></NavLink>
              </div>
              {/* <div onClick={() => setToggle(!toggle)} className="w-full"> */}
              <div onClick={() => setVisible(!visible)} className="w-auto">
                <div className=" relative w-full ">
                  <div className=" flex items-center ">
                    <span className=" mr-2 tex-black text-xs sm:text-base ">Explore</span><FontAwesomeIcon icon={faCaretDown} style={{ color: "#f6f7f8", }} />
                  </div>
                  <div className={`absolute ${visible ? " visible h-auto w-full rounded-sm transition-all duration-700 " : " invisible w-0 h-0 text-transparent "
                    } `}>

                    <ul className={visible ? "bg-slate-100 mt-8 w-1/2 rounded-md flex justify-start flex-col items-start " : "hidden"}>
                      <li onClick={() => setToggle(!toggle)} className=" w-fit ml-4 text-center p-3 text-xs sm:text-base hover:border-b-4 hover:bg-gray-300 "><Link to="/techclub">Tech club</Link></li>
                      <li onClick={() => setToggle(!toggle)} className=" w-fit ml-4 text-center p-3 text-xs sm:text-base hover:border-b-4 hover:bg-gray-300 " ><Link to="/culturalclub">Cultural club</Link></li>
                      <li onClick={() => setToggle(!toggle)} className=" w-fit ml-4 text-center p-3 text-xs sm:text-base hover:border-b-4 hover:bg-gray-300 " ><Link to="/sportsclub">Sports club</Link></li>
                      <li onClick={() => setToggle(!toggle)} className=" w-fit ml-4 text-center p-3 text-xs sm:text-base hover:border-b-4 hover:bg-gray-300 "><Link to="/artsclub">Arts club</Link></li>
                      <li onClick={() => setToggle(!toggle)} className=" w-fit ml-4 text-center p-3 text-xs sm:text-base hover:border-b-4 hover:bg-gray-300 "><Link to="events">Events</Link></li>
                      <li onClick={() => setToggle(!toggle)} className=" w-fit ml-4 text-center p-3 text-xs sm:text-base hover:border-b-4 hover:bg-gray-300 "><Link to="alumni">Connect</Link></li>
                      
                      {/* <li><Link to="/"></Link></li> */}
                    </ul>
                  </div>
                </div>
              </div>
              {/* </div> */}
              <div onClick={() => setToggle(!toggle)} className="w-full">
                <NavLink className="text-black text-xs sm:text-base font-semibold" style={({ isActive }) =>
                  (isActive ? style : null)} to="about">About</NavLink>
              </div>
              <div className="w-full border-b-slate-700">
                <NavLink onClick={() => setToggle(!toggle)} className="text-black font-semibold text-xs w-full sm:text-base" to="signin">Sign In</NavLink>
              </div >
              <div onClick={() => setToggle(!toggle)} className={auth?.userId ? "block" : "hidden"}>
                <button className="text-red-700 font-semibold text-xs sm:text-base" onClick={handleLogout}  >Sign Out</button>
              </div>

            </nav>
          </div>
      </header >
    </div>
  )
}
export default Header