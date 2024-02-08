import React from 'react'
import {Link} from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='py-5 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold p-5'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4'>
        <input type="text" placeholder='Enter a username' id='username' className='bg-slate-100 p-3 rounded-lg' />
        <input type="email" placeholder='Enter an eamil' id='email'className='bg-slate-100 p-3 rounded-lg'/>
        <input type="password" placeholder='Enter a password' id='password' className='bg-slate-100 p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3'>Sign Up</button>
      </form>
      <div className="mt-5">
        <p>Have an account?  <Link to='/signin'><span className='text-blue-500'>Sign in</span></Link></p>
        
      </div>
    </div>
  )
}

export default SignUp