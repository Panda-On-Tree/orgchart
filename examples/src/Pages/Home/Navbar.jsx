import React, { useEffect, useState } from 'react'
import './Navbar.css'
import avatar from '../assets/profile.jpg'
import axios from 'axios'
import { baseurl } from '../../api/apiConfig'
import logo2 from '../img/logo2.png'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  let navigate = useNavigate()

  useEffect(()=>{
    window.onscroll = function() {myFunction()};
   
    // Get the navbar
  
    
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
      var navbar = document.getElementById("sticky");
    
      // Get the offset position of the navbar
      var sticky = navbar.offsetTop;
      if (window.pageYOffset > sticky) {
        navbar.classList.add("stickys")
        navbar.classList.add("animate__slideInDown")
        //navbar.classList.add("animate__slow")
        navbar.classList.remove("animate__slow")

        navbar.classList.remove("animate__fadeIn")

      } else {
        navbar.classList.remove("stickys");
        navbar.classList.remove("animate__slideInDown");
        navbar.classList.add("animate__slow")

        navbar.classList.add("animate__fadeIn")

      }
    }
  },[])

  const [eData, setEData] = useState()
  useEffect(() => {
    employeeData()
  }, [])

  function employeeData() {
    const data = {
      employee_id: localStorage.getItem('employee_id'),
    }
    axios({
      method: 'post',
      url: `${baseurl.base_url}/mhere/employee-data`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })
      .then(function (response) {
        console.log(response.data)
        setEData(response.data)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  return (
    <header style={{ display: 'block', position:"",backgroundColor:"#f7f9fa" }} id="sticky" class="animate__animated  header-wrap style1">
      <div class="header-bottom">
        <div class="container">
          <nav class="navbar navbar-expand-md navbar-light">
            <a class="navbar-brand" href="index.html">
              <img class="" src={logo2} alt="logo" />
            </a>
            <div
              class="collapse navbar-collapse main-menu-wrap"
              id="navbarSupportedContent"
            >
              <div class="menu-close d-lg-none">
                <a>
                  {' '}
                  <i class="icon-close-icon"></i>
                </a>
              </div>
              <ul class="navbar-nav ms-auto" style={{ gap: '20px' }}>
                <li class="nav-item">
                  <a
                    onClick={() => {
                      navigate('/home')
                    }}
                    class="nav-link"
                  >
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    onClick={() => {
                      navigate('/chart')
                    }}
                    class="nav-link"
                  >
                    OrgChart
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    Utilities
                    <i class="icon-arrow-down"></i>
                  </a>
                  <ul class="dropdown-menu">
                    {/*  <li class="nav-item">
                                    <a href="electrocardiograph.html"  class="nav-link" title="Electrocardiograph">
                                        Electrocardiograph
                                        <i class="icon-arrow-right"></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="nav-item">
                                            <a href="#" class="nav-link">MT-508 -1000</a>
                                        </li>
                                         <li class="nav-item">
                                            <a href="#" class="nav-link">MT-600 -1000</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link">MT-1200 - 1000</a>
                                        </li>
                                    </ul>
                                </li> */}
                    <li class="nav-item">
                      <a
                        onClick={() => {
                          navigate('/complaint')
                        }}
                        class="nav-link"
                      >
                        Complaint
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  class="nav-item"
                  style={{
                    display: 'flex',
                    gap: '20px',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <a href="#" class="nav-link">
                    {eData?.name_of_the_eployee}
                    <i class="icon-arrow-down"></i>
                  </a>
                  <ul class="dropdown-menu">
                    <li class="nav-item">
                      <a
                        onClick={() => {
                          navigate('/profile')
                        }}
                        class="nav-link"
                      >
                        Profile
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          localStorage.removeItem('employee_id')
                          localStorage.removeItem('token')
                          localStorage.removeItem('fullname')
                          localStorage.removeItem('email')
                          navigate('/login')
                        }}
                        class="nav-link"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                  <img
                     src= {eData?.image?`data:image/jpeg;base64,${eData.image}`:avatar}
                    style={{ maxHeight: '35px', borderRadius: '20px' }}
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </nav>
          <div class="mobile-bar-wrap">
            <div class="mobile-menu d-lg-none">
              <a href="javascript:void(0)">
                <i class="icon-menu2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
