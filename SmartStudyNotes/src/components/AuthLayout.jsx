import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



export default function Protected({children,authentication=true}) {
     const navigate=useNavigate()
     const selector=useSelector()
     const authStatus=useSelector(state=>state.auth.status) 
     const [loader,setLoader]=useState(true)

     useEffect(()=>{
        if(authStatus === true){
            navigate("/")
        }else if(authStatus===false)
        {
            navigate("/login")
        }
        setLoader(false)

     },[authentication,authStatus,navigate])
     
 
 
    return (
    loader ? <h1>Page Loading.....</h1> : <>{children}</>
  )
}

