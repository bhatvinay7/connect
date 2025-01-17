import React from 'react';
import ReactDOM from 'react-dom';
import { useRouteError } from 'react-router-dom';
export default function CoderesourceError(){
    const err=useRouteError();
    return(
        <>
        <h1>Error ocured, unable load the data !..</h1>
        <h2>{err.message}</h2>
        </>
    )
}
