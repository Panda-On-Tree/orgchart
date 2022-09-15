import React, { useEffect, useState } from 'react'
import './Navbar.css'
import avatar from '../assets/profile.jpg'
import axios from 'axios'
import { baseurl } from '../../api/apiConfig'
import logo2 from '../img/logo2.png'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  let navigate = useNavigate()

  useEffect(() => {
    window.onscroll = function () {
      myFunction()
    }

    function myFunction() {
      var navbar = document.getElementById('sticky')

      var sticky = navbar.offsetTop
      if (window.pageYOffset > sticky) {
        navbar.classList.add('stickys')
        navbar.classList.add('animate__slideInDown')
        //navbar.classList.add("animate__slow")
        navbar.classList.remove('animate__slow')

        navbar.classList.remove('animate__fadeIn')
      } else {
        navbar.classList.remove('stickys')
        navbar.classList.remove('animate__slideInDown')
        navbar.classList.add('animate__slow')

        navbar.classList.add('animate__fadeIn')
      }
    }
  }, [])

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
    <header
      style={{ display: 'block', position: '', backgroundColor: '#f7f9fa' }}
      id="sticky"
      class="animate__animated  header-wrap style1"
    >
      <div class="header-bottom">
        <div class="container">
          <nav class="navbar navbar-expand-md navbar-light">
            <a class="navbar-brand">
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
                  <a class="nav-link">
                    Useful Links
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
                      <a target="_blank" href='https://microtek.tech/itop'>CMDB Tool</a>
                    </li>
                    <li class="nav-item">
                      <a target="_blank" href='https://microtek.tech/Self-Declaration/login.php'>Self Declaration</a>
                    </li>
                    <li class="nav-item">
                      <a target="_blank" href='https://microtek.tech/capex/login.php'>Capex Portal</a>
                    </li>
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
                <li class="nav-item">
                  <a
                    onClick={() => {
                      navigate('/aboutus')
                    }}
                    class="nav-link"
                  >
                    About Us
                  </a>
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
                  <a class="nav-link">
                    {eData?.name_of_the_eployee
                      ? eData.name_of_the_eployee
                      : 'Your Name'}
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
                    src={
                      eData?.image
                        ? `data:image/jpeg;base64,${eData.image}`
                        : avatar
                    }
                    style={{
                      maxHeight: '40px',
                      width: '40px',
                      borderRadius: '20px',
                    }}
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </nav>
          <div class="mobile-bar-wrap">
            <div class="mobile-menu d-lg-none">
              <a>
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
