import React from 'react'
import {useContext} from 'react'
import {context} from '../Components/Context.jsx'
const useCustomContext=()=>{
    return useContext(context)
}
export default useCustomContext