import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';


const OAuth = () => {
  const dispatch=useDispatch();
  const navigate =useNavigate();
  const handleGoogleClick= async()=>{
    try {
      const provider =new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' }); 
      const auth=getAuth(app);

      const result =await signInWithPopup(auth,provider);
      console.log(result)
      const res =await fetch('/api/v1/auth/google',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL,
        })
      }); 
      const data =await res.json();
      console.log("dta",data)
      console.log("dta",data.user)
      dispatch(signInSuccess(data.user))  
       navigate('/')
    } catch (error) {
      console.log('Could not login with google')
      
    }

  }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with google</button>

  )
}

export default OAuth