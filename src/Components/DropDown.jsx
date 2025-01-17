import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function Dropdown(){
    return(
        <div className="group caret-transparent">
            <div className="relative inline-block">
                <div className="flex items-center ">
                <span className="mr-2 text-teal-500 md:text-base">Explore</span><FontAwesomeIcon icon={faCaretDown} style={{color: "#f6f7f8",}} />
                </div>
                 <div className="hidden z-50 group-hover:block  absolute left-0.5 rounded-sm">
                    
                    <ul className="bg-slate-100 mt-8 w-40 max-h-fit shadow-xl">
                        <li className="hover:bg-gray-200 w-full text-center px-4 py-2 text-base hover:border-b-4  "><Link to="/techclub">Tech club</Link></li>
                        <li className="hover:bg-gray-200 w-full text-center px-4 py-2 text-base hover:border-b-4  " ><Link to="/culturalclub">Cultural club</Link></li>
                        <li className="hover:bg-gray-200 w-full text-center px-4 py-2 text-base hover:border-b-4 " ><Link to="/sportsclub">Sports club</Link></li>
                        <li className="hover:bg-gray-200 w-full text-center px-4 py-2 text-base hover:border-b-4 "><Link to="/artsclub">Arts club</Link></li>
                        <li className="hover:bg-gray-200 w-full text-center px-4 py-2 text-base hover:border-b-4 "><Link to="/events">Events</Link></li>
                        <li className="hover:bg-gray-200 w-full text-center px-4 py-2 text-base hover:border-b-4" ><Link  to={'alumni'}>Connect</Link></li>
                    </ul>
                </div> 
            </div>
        </div>
    )
}