import React from 'react';
import ReactDOM from 'react-dom';
import { useRouteError } from 'react-router-dom';
export default function EventError(){
    const err=useRouteError();
    return(
        <>
        <h1>Error ocured,unable to load data..!</h1>
        <h2>{err.message}</h2>
        </>
    )
} 
