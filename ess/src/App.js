import React, { useEffect } from 'react'
import './App.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
//import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'

import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import LoginForm from './Pages/Login'
import Chart from './Pages/Chart'
import ResetPassword from './Pages/ResetPassword'
import ForgetPassword from './Pages/ForgetPassword'
import MChart from './Pages/MChart'
import Otp from './Pages/Otp'
import Home from './Pages/Home/Home'
import Complaint from './Pages/Complaint'
import Navbar from './Pages/Home/Navbar'
import Profile from './Pages/Profile'
import AboutUs from './Pages/AboutUs'
import DowloadPage from './Pages/DowloadPage'
import axios from 'axios'
import { baseurl } from './api/apiConfig'
import ProductCatalog from './Pages/ProductCatalog/ProductCatalog'
import ProductCatalogSearch from './Pages/ProductCatalog/ProductCatalogSearch'
import ProductPartDescription from './Pages/ProductCatalog/ProductPartDescription'
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/shoelace.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import Policy from './Pages/Policy/Policy'
import MyTeam from './Pages/MyTeam/MyTeam'
import ManageUsers from './Pages/ManageUsers/ManageUsers'
import Approval from './Pages/Approval/Approval'
import Leave from './Pages/Leave/Leave'
import ProductChart from './Pages/ProductChart/ProductChart'
import Report from './Pages/Report/Report'
import Profile2 from './Pages/Profile/Profile2'
import Login2 from './Pages/Login/Login2'

function App() {
  let navigate = useNavigate()

  useEffect(() => {
    verifyToken()
    setInterval(verifyToken, 1800000)
  
  }, [])

  const Dashboard = () => (
    <div id="root" className="dashboard-main">
      <Navbar />
      <div id="root" className="dashboard-inner">
        <Outlet />
      </div>
      
    </div>
  )
  const Auth = () => (
    <div>
      <Outlet />
    </div>
  )
  const verifyToken = () => {
    if (!localStorage.getItem('token')) {
      return
    }
    axios({
      method: 'post',
      url: `${baseurl.base_url}/mhere/verify-token`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (err) {
        console.log(err)
        localStorage.removeItem('employee_id')
        localStorage.removeItem('token')
        localStorage.removeItem('fullname')
        localStorage.removeItem('email')
        navigate('/login')
      })
  }

  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route
          exact
          path="/"
          element={
            localStorage.getItem('token') ? (
              <Home />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/profile"
          element={
            localStorage.getItem('token') ? (
              <Profile />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/profile2"
          element={
            localStorage.getItem('token') ? (
              <Profile2 />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/mchart"
          element={
            localStorage.getItem('token') ? (
              <Chart />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/product-chart"
          element={<ProductChart/>}
        ></Route>
        <Route
          exact
          path="/complaint"
          element={
            localStorage.getItem('token') ? (
              <Complaint />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/leaves"
          element={
            localStorage.getItem('token') ? (
              <Leave />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/product-catalog"
          element={
            localStorage.getItem('token') ? (
              <ProductCatalog />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/product-catalog-search"
          element={
            localStorage.getItem('token') ? (
              <ProductCatalogSearch />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/product-part-desc"
          element={
            localStorage.getItem('token') ? (
              <ProductPartDescription />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/aboutus"
          element={
            localStorage.getItem('token') ? (
              <AboutUs />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/policy"
          element={
            localStorage.getItem('token') ? (
              <Policy />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/reports"
          element={
            localStorage.getItem('token') ? (
              JSON.parse(localStorage.getItem('module_access')).report ? <Report /> : <Navigate replace to="/home" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/my-team"
          element={
            localStorage.getItem('token') ? (
              <MyTeam />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/approval"
          element={
            localStorage.getItem('token') ? (
              <Approval />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/manage-users"
          element={
            localStorage.getItem('token') ? (
              localStorage.getItem('role') == 'sadmin' ? (
                <ManageUsers />
              ) : (
                <Navigate replace to="/login" />
              )
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/chart"
          element={
            localStorage.getItem('token') ? (
              <MChart />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/home"
          element={
            localStorage.getItem('token') ? (
              <Home />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/react-org-chart"
          element={
            localStorage.getItem('token') ? (
              <Navigate replace to="/home" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
      </Route>
      <Route element={<Auth />}>
        <Route exact path="/login" element={<Login2 />}></Route>
        <Route exact path="/login2" element={<Login2 />}></Route>
        <Route exact path="/otp" element={<Otp />}></Route>
        <Route exact path="/reset-password" element={<ResetPassword />}></Route>
        <Route
          exact
          path="/forget-password"
          element={<ForgetPassword />}
        ></Route>
      </Route>
      <Route exact path="/download-app" element={<DowloadPage />}></Route>
      
    </Routes>
  )
}

export default App
