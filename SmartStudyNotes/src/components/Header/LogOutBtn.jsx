import React from 'react';
import { useDispatch } from '@reduxjs/toolkit';
import authServices from '../../appwrite/authService';
import { logOut } from '../../store/authSlice';

function LogOutBtn() {
  const dispatch=useDispatch();
  const logOutHandler=()=>{
    authServices.logOut().then(()=>{
      dispatch(logOut())
    }).catch((err)=>console.log(err))
  }
  return (
          <button
          onClick={logOutHandler}
          className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
          >Logout</button>

    )
}

export default LogOutBtn;