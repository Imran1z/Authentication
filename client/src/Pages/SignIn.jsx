import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading,error}=useSelector((state)=>state.user)
  const navigate =useNavigate();
  const dispatch =useDispatch();
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }

  const handleSubmit =async (e)=>{
    e.preventDefault();
    try {
        dispatch(signInStart())
      const res =await fetch('/api/v1/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)

      });
      const data =await res.json( );
      
      if(data.success === false){
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSuccess(data.user))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error))
      
    }
  }

  return (
    <div className='py-5 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold p-5'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="email" placeholder='Enter an eamil' id='email'className='bg-slate-100 p-3 rounded-lg'onChange={handleChange}/>

        <input type="password" placeholder='Enter a password' id='password' className='bg-slate-100 p-3 rounded-lg'onChange={handleChange}/>

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3'>{loading?'Loading':'Sign In'}</button>
        <OAuth/>
      </form>

      <div className="mt-5">
        <p>Don't have an account?  <Link to='/signup'><span className='text-blue-500'>Sign Up</span></Link></p>
       
      </div>
      <p className='text-red-600 text-center mt-6'>{error ? error.message||"something went wrong...":""}</p>
    </div>
  )
}

export default SignIn