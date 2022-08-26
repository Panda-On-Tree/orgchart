import React from 'react'
import './App.css'

import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import LoginForm from './Pages/Login'
import Chart from './Pages/Chart'
import ResetPassword from './Pages/ResetPassword'
import ForgetPassword from './Pages/ForgetPassword'
import MChart from './Pages/MChart'
import Otp from './Pages/Otp'
import Home from './Pages/Home/Home'
import Sidemenu from './Pages/Home/Sidemenu'
function App(){
   
  const Dashboard =()=>(
    <div id='root' style={{overflow:"hidden"}}>
      <Sidemenu />
      <Outlet />
    </div>
  )
  const Auth =()=>(
    <div>
      <Outlet />
    </div>
  )

    return (
      <Routes>
        <Route element={<Dashboard />}>
          <Route exact path="/" element={localStorage.getItem("token")? <Home/> : <Navigate replace to="/login"/>}></Route>
          <Route exact path="/chart" element={localStorage.getItem("token")? <MChart/> : <Navigate replace to="/login"/>}></Route>
          <Route exact path="/home" element={localStorage.getItem("token")? <Home/> : <Navigate replace to="/login"/>}></Route>
          <Route exact path="/react-org-chart" element={localStorage.getItem("token")? <Home/> : <Navigate replace to="/login"/>}></Route>
        </Route>
        <Route element={<Auth />}>
          <Route exact path="/login" element={<LoginForm/>}></Route>
          <Route exact path="/otp" element={<Otp/>}></Route>
          <Route exact path="/reset-password" element={<ResetPassword/>}></Route>
          <Route exact path="/forget-password" element={<ForgetPassword/>}></Route>
        </Route>
      </Routes>
    )
  }


  export default App;
