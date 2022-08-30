import React, { useEffect } from 'react'
import './Sidemenu.css'
import { useNavigate } from 'react-router-dom'
function Sidemenu() {
  const navigate = useNavigate()
  function toogle() {
    var getSidebar = document.getElementById('nav')
    getSidebar.classList.toggle('active')
  }

  return (
    <nav
      onMouseEnter={() => {
        toogle()
      }}
      onMouseLeave={() => {
        toogle()
      }}
      id="nav"
      style={{ cursor: 'pointer' }}
    >
      <ul>
        <li>
          <a>
            <span className="icon">
              <i className="fas fa-bars"></i>
            </span>
            <span className="title">MICROTEK</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
            <span className="title">Home</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <i className="fas fa-user"></i>
            </span>
            <span className="title">Profile</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="title">Messages</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <i className="fas fa-info"></i>
            </span>
            <span className="title">Help</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <i className="fas fa-cog"></i>
            </span>
            <span className="title">Setting</span>
          </a>
        </li>
        <li
          onClick={() => {
            navigate('/chart')
          }}
        >
          <a href="#" onClick={(e) => e.preventDefault()}>
            <span className="icon">
              <i className="fas fa-sitemap"></i>
            </span>
            <span className="title">Org Chart</span>
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault()
              localStorage.removeItem('employee_id')
              localStorage.removeItem('token')
              localStorage.removeItem('fullname')
              localStorage.removeItem('email')
              navigate('/login')
            }}
          >
            <span className="icon">
              <i className="fas fa-sign-out-alt"></i>
            </span>
            <span className="title">Sign Out</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidemenu
