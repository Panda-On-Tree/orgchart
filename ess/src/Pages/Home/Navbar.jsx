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
     /*  var navbar = document.getElementById('sticky')

      var sticky = navbar.offsetTop
      if (window.pageYOffset - 50 > sticky) {
        navbar.classList.add('stickys')
        navbar.classList.add('animate__slideInDown')
        //navbar.classList.add("animate__slow")
        navbar.classList.remove('animate__slow')

        navbar.classList.remove('animate__fadeIn')
      } else {
        navbar.classList.remove('stickys')
        navbar.classList.remove('animate__slideInDown')
      // navbar.classList.add('animate__slow')

        //navbar.classList.add('animate__fadeIn')
      } */
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
        "Authorization": `Bearer ${localStorage.getItem('token')}`
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
      style={{ display: 'block', backgroundColor: '#f7f9fa'}}
      id="sticky"
      className="animate__animated  header-wrap style1"
    >
      <div className="header-bottom">
        <div className="container nv-main">
          <nav className="nav-img navbar navbar-expand-md navbar-light">
            <a className="navbar-brand">
              <img className="" src={logo2} alt="logo" />
            </a>
            <div
              className="collapse navbar-collapse main-menu-wrap"
              id="navbarSupportedContent"
            >
              <div className="menu-close d-lg-none">
                <a>
                  {' '}
                  <i className="icon-close-icon"></i>
                </a>
              </div>
              <ul className="navbar-nav ms-auto" style={{ gap: '20px' }}>
                <li className="nav-item">
                  <a
                    onClick={() => {
                      navigate('/home')
                    }}
                    className="nav-link"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    Our Services
                    <i className="icon-arrow-down"></i>
                  </a>
                  <ul className="dropdown-menu"  >
                    {/*  <li className="nav-item">
                                    <a href="electrocardiograph.html"  className="nav-link" title="Electrocardiograph">
                                        Electrocardiograph
                                        <i className="icon-arrow-right"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">MT-508 -1000</a>
                                        </li>
                                         <li className="nav-item">
                                            <a href="#" className="nav-link">MT-600 -1000</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">MT-1200 - 1000</a>
                                        </li>
                                    </ul>
                                </li> */}
                    <li className="nav-item">
                      <a className='nav-link' onClick={() => {
                        navigate('/chart')
                      }}>Org Chart</a>
                    </li>
                    <li className="nav-item">
                      <a className='nav-link' onClick={() => {
                        navigate('/product-catalog')
                      }}>Product Catalog</a>
                    </li>
                    <li className="nav-item">
                      <a className='nav-link' onClick={() => {
                        navigate('/policy')
                      }}>Policy</a>
                    </li>
                    <li className="nav-item">
                      <a className='nav-link' target="_blank" href='https://internal.microtek.tech/itop'>CMDB Tool</a>
                    </li>
                    <li className="nav-item">
                      <a className='nav-link' target="_blank" href='https://internal.microtek.tech/Self-Declaration/login.php'>Self Declaration</a>
                    </li>
                    <li className="nav-item">
                      <a className='nav-link' target="_blank" href='https://internal.microtek.tech/capex/login.php'>Capex Portal</a>
                    </li>
                    <li className="nav-item">
                      <a className='nav-link' target="_blank" href='https://microtek.eisenvault.net/'>Eisen Vault</a>
                    </li>
                    <li className="nav-item">
                      <a className='nav-link' target="_blank" href='https://microtek.peoplestrong.com/altLogin.jsf'>PeopleStong Microtek</a>
                    </li>
                    <li className="nav-item">
                      <a
                        onClick={() => {
                          navigate('/complaint')
                        }}
                        className="nav-link"
                      >
                        Complaint
                      </a>
                    </li>
                    {localStorage.getItem('role') == 'sadmin' ?
                      <li className="nav-item">
                        <a
                          onClick={() => {
                            navigate('/manage-users')
                          }}
                          className="nav-link"
                        >
                          Manage User
                        </a>
                      </li>
                      : null}
                  </ul>
                </li>
                {/* <li className="nav-item">
                  <a
                    onClick={() => {
                      navigate('/aboutus')
                    }}
                    className="nav-link"
                  >
                    About Us
                  </a>
                </li> */}
                <li
                  className="nav-item"
                  style={{
                    display: 'flex',
                    gap: '20px',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <a className="nav-link">
                    {eData?.name_of_the_eployee
                      ? eData.name_of_the_eployee
                      : 'Your Name'}
                    <i className="icon-arrow-down"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a
                        onClick={() => {
                          navigate('/profile')
                        }}
                        className="nav-link"
                      >
                        Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        onClick={() => {
                          navigate('/my-team')
                        }}
                        className="nav-link"
                      >
                        My Team
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        onClick={() => {
                          navigate('/leaves')
                        }}
                        className="nav-link"
                      >
                        Outdoor Duty
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        onClick={() => {
                          navigate('/approval')
                        }}
                        className="nav-link"
                      >
                        Approval Tasks
                      </a>
                    </li>
                    {JSON.parse(localStorage.getItem('module_access')).report ? <li className="nav-item">
                      <a
                        onClick={() => {
                          navigate('/reports')
                        }}
                        className="nav-link"
                      >
                        Reports
                      </a>
                    </li> : null}
                    <li className="nav-item">
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          localStorage.removeItem('employee_id')
                          localStorage.removeItem('token')
                          localStorage.removeItem('fullname')
                          localStorage.removeItem('email')
                          navigate('/login')
                        }}
                        className="nav-link"
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
          <div className="mobile-bar-wrap">
            <div className="mobile-menu d-lg-none">
              <a>
                <i className="icon-menu2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
