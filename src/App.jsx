import React from "react";
import ReactDOM from 'react-dom';
import {
  RouterProvider, createBrowserRouter,
  createRoutesFromElements, Route
} from "react-router-dom";
import dotenv from 'dotenv'
import Layout from './Components/Layout.jsx';
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import SignIn, { action as signinaction } from './Components/SignIn.jsx';
import Login, { action as loginaction } from './Components/Login.jsx';
import Event from "./Components/Event.jsx";

import EventDetails from './Components/EventDetails.jsx';
import Registration from './Components/Registration.jsx';
import AuthRequire from './Components/AuthRequire.jsx';
import PersistantLogin from "./Components/PersistantLogin.jsx";
import TechClub from "./Components/TechClub.jsx";
import SportsClub from "./Components/SportsClub.jsx";
import CulturalClub from "./Components/CulturalClub.jsx";
import AtrtsClub from "./Components/ArtsClub.jsx";
import RecentClubEventShow from "./Components/RecentClubEventShow.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Access,{action as updateAction} from './Components/Access.jsx'
import AccessAuth from "./Components/AccessAuth.jsx";
import EventForm from "./Components/EventControler.jsx";
import ClubEventForm from "./Components/ClubEventsControler.jsx";
import Controler from './Components/Controler.jsx'
import ClubActivityControler from './Components/ClubActivityControler.jsx'
import AlumniSearch from "./Components/Alumni.jsx";
import AlumniForm from "./Components/AlumniForm.jsx";
import Error404 from './Components/Error404.jsx'
import SearchClubEvents from './Components/SearchClubEvents.jsx'
import EventInfoDownlode from './Components/EventInfoDownlode.jsx'
import ClubGoalForm from './Components/clubGoalsSectionForm.jsx'
function App() {
  const roles=import.meta.env.VITE_USER_ROLES
  const clientId=import.meta.env.VITE_CLIENT_ID
 
  
  const GooleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <Login />
      </GoogleOAuthProvider>
    )
  }
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} >
       <Route element={<PersistantLogin />}>
       <Route element={<AuthRequire />}>
       <Route path="/artsclub" element={<AtrtsClub />} />
      <Route path="/culturalclub" element={<CulturalClub />} />

       </Route>

       
       </Route>
      <Route path='/signin' element={<SignIn />}
        action={signinaction}
      />
      <Route path='/updateAccess' element={<Access />}
        action={updateAction}
      />
      <Route path='/login' element={<GooleAuthWrapper />}
        action={loginaction}
      />
      
    
            <Route element={<PersistantLogin />}>
        <Route element={<AuthRequire />}>
          <Route path="about" element={<About />} />
          <Route index element={<Home/>} ></Route>
          {/* <Route path="resource" element={<Coderesource />}
          // errorElement={<CoderesourceError />}
          /> */}
         <Route path="/techclub" element={<TechClub />}/>
         <Route path="/searchevents" element={<SearchClubEvents/> }></Route> 
         <Route path="/sportsclub" element={<SportsClub />} />
           <Route path="alumni" element={<AlumniSearch/> }></Route>
         <Route path="/event/:id" element={<RecentClubEventShow />} />
          <Route path="events" element={<Event />}/>
          <Route path="/:id" element={<EventDetails />} />
        </Route>

          <Route element={<AccessAuth
            roles={roles}
          />}>
            <Route path='controler' element={<Controler/>}>
          <Route path="eventform" element={<EventForm/>} ></Route>
          <Route path="recentClubEvent" element={<ClubEventForm/> }></Route>
          <Route path="clubactivity" element={<ClubActivityControler/> }></Route>
          <Route path="alumniform" element={<AlumniForm/> }></Route>
          <Route path="eventregister" element={<EventInfoDownlode/>}></Route>
          <Route path="clubgoalregister" element={<ClubGoalForm/>}></Route>
        
          </Route>
          </Route>

      </Route>
      <Route path="*" element={<Error404/>}></Route>
    </Route>
  ))
  return (

    <RouterProvider router={router} />
  )
}

export default App;
