import React from 'react'
import { useSelector } from 'react-redux'


const Profile = () => {
  const {currentUser}=useSelector((state)=>state.user)
  console.log(currentUser)
  return (
    <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4' >

            <img src={`${currentUser.user.profile}`} alt="Profile" className='h-24 w-24 self-center cursor-pointer rounded-full mb-5 object-cover hover:h-[100px]  hover:w-[100px]'/>

            <input type="username" defaultValue={currentUser.user.username} placeholder='Username' id='password' className='bg-slate-100 p-3 rounded-lg'/> 
            
            <input type="email" defaultValue={currentUser.user.email} placeholder='Email' id='password' className='bg-slate-100 p-3 rounded-lg'/>
            
             <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg'/>

             <button  className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3'>Update</button>

             <div className='flex justify-between'>
             <p className='text-red-600  '>Delete Account</p>
             <p className='text-red-600  '>Sign Out</p>
             </div>
            </form>
    </div>
  )
}

export default Profile