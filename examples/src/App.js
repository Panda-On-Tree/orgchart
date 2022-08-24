import React from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'

import LoginForm from './Pages/Login'
import Chart from './Pages/Chart'
import ResetPassword from './Pages/ResetPassword'
import ForgetPassword from './Pages/ForgetPassword'
import MChart from './Pages/MChart'
import Otp from './Pages/Otp'
import Home from './Pages/Home/Home'
function App(){
   

    return (
      <Routes basename="/react-org-chart">
        <Route exact path="/" element={<Chart/>}></Route>
        <Route exact path="/chart" element={<MChart/>}></Route>
        <Route exact path="/login" element={<LoginForm/>}></Route>
        <Route exact path="/otp" element={<Otp/>}></Route>
        <Route exact path="/reset-password" element={<ResetPassword/>}></Route>
        <Route exact path="/forget-password" element={<ForgetPassword/>}></Route>
        <Route exact path="/home" element={<Home/>}></Route>
      </Routes>
    )
  }


  export default App;
