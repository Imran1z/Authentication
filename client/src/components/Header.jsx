import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'


const Header = () => {
  const {currentUser}=useSelector((state)=>state.user);
  // console.log(currentUser)
  // console.log(currentUser.user.profile)
  // console.log(currentUser.user)
  return (
    <div className='bg-slate-200'>
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to='/'>
              <h1 className='font-bold'>Auth App</h1>
            </Link>
            <ul className='flex gap-4'>
              <Link to='/'>
                <li>Home</li>
              </Link>
              <Link to='/about'>
                <li>About</li>
              </Link>
              <Link to='/profile'>
                {currentUser?(
               
                <img 
                  src={`${currentUser.profile}`} 
                  alt='profile' 
                  className='h-7 w-7 rounded-full object-cover'
                  style={{ alignSelf: 'center' }} // Vertically center the image
                />

                ):(

                <li>SignIn</li>
                )}
              </Link>
              {/* <Link to='/signup'>
                <li>SignUp</li>
              </Link> */}
              
            </ul>
        </div>
    
    </div>
  )
}

export default Header