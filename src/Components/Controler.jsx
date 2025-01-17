import React from 'react'
import EventControler from './EventControler'
import EventForm from './ClubEventsControler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Outlet, Link } from 'react-router-dom'
export default function Controler() {
    return (
        <>
            <div className='relative top-20 md:top-24 caret-transparent w-full min-h-screen  bg-black/45'>
                <div className=' flex items-center h-auto justify-start flex-wrap w-full mt-5 p-4 gap-3  sm:p-2 '>
                    <div className='w-fit h-auto'>
                        <Link className='border text-xs sm:text-base rounded-md hover:bg-teal-400 hover:text-white ring ring-sky-300 bg-gray-300 border-black p-0.5 sm:p-1 md:p-1.5 lg:p-2 w-fit' to={'eventform'}>Event Registration Uploader</Link>
                    </div>

                    <div className='w-fit h-auto'>
                        <Link className='border text-xs sm:text-base rounded-md hover:bg-teal-400 hover:text-white ring ring-sky-300  bg-gray-300 border-black p-0.5 sm:p-1 md:p-1.5 lg:p-2 w-fit' to={'recentClubEvent'}>Club Event Uploader</Link>
                    </div>

                    <div className='w-fit h-auto'>
                        <Link className='border text-xs sm:text-base rounded-md hover:bg-teal-400 hover:text-white ring ring-sky-300 bg-gray-300 border-black p-0.5 sm:p-1 md:p-1.5 lg:p-2 w-fit' to={'clubactivity'}>Club Activity Uploader</Link>

                    </div>

                    <div className='w-fit h-auto'>
                        <Link className='border text-xs sm:text-base rounded-md hover:bg-teal-400 hover:text-white ring ring-sky-300 bg-gray-300 border-black p-0.5 sm:p-1 md:p-1.5 lg:p-2 w-fit' to={'alumniform'}>Alumni Form</Link>
                    </div>

                    <div className='w-fit h-auto flex items-center justify-center gap-2 border text-xs sm:text-base rounded-md hover:bg-teal-400 hover:text-white ring ring-sky-300 bg-gray-300 border-black p-0.5 sm:p-1 md:p-1.5 lg:p-2'>
                        <div>
                            <Link to={'eventregister'}>Event Registration</Link>
                        </div>
                        <FontAwesomeIcon className=" text-xs sm:text-base" icon={faDownload} />
                        <div>
                        </div>
                    </div>
                    <div className='w-fit h-auto flex items-center justify-center gap-2 border text-xs sm:text-base rounded-md hover:bg-teal-400 hover:text-white ring ring-sky-300 bg-gray-300 border-black p-0.5 sm:p-1 md:p-1.5 lg:p-2'>
                        <div>
                            <Link to={'clubgoalregister'}>Club Goal Section</Link>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>

                <Outlet />


            </div>

        </>
    )
}