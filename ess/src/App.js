import React, { useEffect } from 'react'
import './App.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
//import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import LoginForm from './Pages/Login'
import Chart from './Pages/Chart'
import ResetPassword from './Pages/ResetPassword'
import ForgetPassword from './Pages/ForgetPassword'
import MChart from './Pages/MChart'
import Otp from './Pages/Otp'
import Home from './Pages/Home/Home'
import Sidemenu from './Pages/Home/Sidemenu'
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
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';


function App() {
  let navigate = useNavigate()

  useEffect(() => {
    verifyToken();
    setInterval(verifyToken, 1800000);
    setBasePath('@shoelace-style/shoelace/dist');
  }, [])

  const Dashboard = () => (
    <div id="root" className="dashboard-main">
      <Navbar />
      <div id="root">
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
    if(!localStorage.getItem('token')){
      return;
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

        <Route exact path="/login" element={<LoginForm />}></Route>
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
