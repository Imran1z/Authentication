import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import Signup from './Pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'


const App = () => {
  return (
    
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>

        </Route>
        

      </Routes>
    </BrowserRouter>
  )
}

export default App