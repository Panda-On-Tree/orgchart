import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../api/apiConfig'
import './Profile.css'
function Profile() {
  const [eData, setEData] = useState()
  const [mData, setMData] = useState()
  useEffect(() => {
    getManagerData();
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

  function getManagerData() {
    const data = {
      employee_id: localStorage.getItem('employee_id'),
    }
    axios({
      method: 'post',
      url: `${baseurl.base_url}/mhere/manager-data`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })
      .then(function (response) {
        console.log(response.data)
        setMData(response.data)
      })
      .catch(function (err) {
        console.log(err)
      })
  }
  return (
    <div className='wrapper-container'>
        
        <div class="wrapper">
    <div class="img-area">
      <div class="inner-area">
        <img
          src={eData?.image?`data:image/jpeg;base64,${eData.image}`:""}
          alt="twitter"
        />
      </div>
    </div>
    <div class="name"></div>
    <div class="career">{eData?.department}</div>
    <hr class="horizon" />
    <div class="info">
      <p><u>Employee Id:</u> &nbsp;  {eData?.new_e_code}</p>
      <p><u>Name:</u> &nbsp; {eData?.name_of_the_eployee}</p>
      <p><u>Email Id:</u> &nbsp; {eData?.mail_id_official}</p>
    </div>
    <div class="flow">
    <div class="name">Manager Details</div>
    <hr class="horizon" />
    <div class="info">
      <p><u>Name:</u> &nbsp; {mData?.fullname} </p>
      <p><u>Email Id:</u> &nbsp; {mData?.email}</p>
      <p><u>Phone Number:</u> &nbsp; {mData?.phone}</p>
    </div>
    </div>
    
  </div>

    </div>
  )
}

export default Profile
