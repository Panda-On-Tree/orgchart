import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../api/apiConfig'

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
  return <div>Profile</div>
}

export default Profile
