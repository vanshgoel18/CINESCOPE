/* eslint-disable no-unused-vars */
import React from 'react'
import Register from './components/Register'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import CheckApi from './components/CheckApi';
import UserDashBoard from './components/UserDashBoard';
import "./App.css"
import Movie from './components/Movie'
import FavouriteMovie from './components/User/FavouriteMovie'

const App = () => {
  return (
    <div>
   
      <Navbar/>
      {/* <Register/> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/movie' element={<Movie/>}/>
        <Route path='/user-dashboard' element={<UserDashBoard/>}/>
        <Route path='/user/favourite' element={<FavouriteMovie/>}/>
        {/* <Route path='/user/update' element={<FavouriteMovie/>}/> */}

        {/* <Route path="/check" element={CheckApi}/> */}

      </Routes>

    </div>
  )
}

export default App
