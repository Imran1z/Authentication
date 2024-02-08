import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigate =useNavigate()
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }

  const handleSubmit =async (e)=>{
    e.preventDefault();
    try {
      setError(false);
      setLoading(true)
      const res =await fetch('/api/v1/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)

      });
      const data =await res.json( );
      setLoading(false)

      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(true);
      
    }
  }

  return (
    <div className='py-5 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold p-5'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="email" placeholder='Enter an eamil' id='email'className='bg-slate-100 p-3 rounded-lg'onChange={handleChange}/>

        <input type="password" placeholder='Enter a password' id='password' className='bg-slate-100 p-3 rounded-lg'onChange={handleChange}/>

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3'>{loading?'Loading':'Sign In'}</button>
      </form>

      <div className="mt-5">
        <p>Don't have an account?  <Link to='/signup'><span className='text-blue-500'>Sign Up</span></Link></p>
       
      </div>
      <p className='text-red-600 text-center mt-6'>{error && 'Something Went Wrong...'}</p>
    </div>
  )
}

export default SignIn