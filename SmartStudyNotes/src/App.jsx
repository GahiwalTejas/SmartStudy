import { useEffect, useState } from 'react';
import './App.css';
import {useDispatch,useSelector} from 'react-redux';
import authService from './appwrite/authService'
import { login,logOut } from './store/authSlice';
import { Footer, Header } from './components';
import {Outlet} from 'react-router-dom'
function App() {
  const[loading,setLoading]=useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
      }
      else{
        dispatch(logOut())
      }
      
    })
    .finally(()=>{
      setLoading(false)
    })
        

  },[])


// console.log(import.meta.env.VITE_APPWRITE_URL);
  
if (loading===false) {
  return (
    
<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>  
  <div className='w-full block'>
    <Header/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
     </div>


  </div>
  )
}
else{
  return (
    <>
  </>
  )
}

}

export default App
