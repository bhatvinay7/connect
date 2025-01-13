import React from 'react';
import { createContext } from 'react';
const context=createContext({});
 function ContextProvider({children,value}){
    return(
       <context.Provider value={value}>
        {children}
       </context.Provider>
    )
}
export {context,ContextProvider}