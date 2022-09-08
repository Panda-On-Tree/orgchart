import React, { useEffect, useState } from 'react'
import './Navbar.css'
import avatar from '../assets/profile.jpg'
import axios from 'axios'
import { baseurl } from '../../api/apiConfig'

function Navbar() {
  const [eData, setEData] = useState()
  useEffect(() => {
    employeeData();
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
    <div className="navbar-main">
      <div className="navbar-main-inner">
        <div>MICROTEK</div>
        <div className="navbar-right">
          <h3>{eData?.name_of_the_eployee}</h3>
          <img src={eData?.image?`data:image/jpeg;base64,${eData.image}`:avatar} height="40px" width="40px" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
