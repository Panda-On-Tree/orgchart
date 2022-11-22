import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { baseurl } from '../../api/apiConfig'
import './Profile2.css'
function Profile2() {
    const [eData, setEData] = useState()

    useEffect(()=>{
        employeeData()
    },[])

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
    <div className='profil-main'>
        <div className='profil-container'>
            <div className='profil-header-main'>
                <div className='profil-image-container'>
                <img className='profil-image'
                    src={
                        eData?.image ? `data:image/jpeg;base64,${eData.image}` : ""
                    }
                    alt="Profile pic"
                    />
                </div>
                    <div className='profil-header-detail'>
                        <h2>{eData?.name_of_the_eployee}</h2>
                        <h3>{eData?.department}</h3>
                    </div>
            </div>
            <div className='profil-details-main'>
                <div className='profil-details-basic-main'>
                    <div className='profil-details-basic-container'>
                        <div className='profil-details-basic-single'>
                            <p className='profil-single-key'>Official Mail Id</p>
                            <p className='profil-single-value'>{eData?.mail_id_official}</p>
                        </div>
                        <div className='profil-details-basic-single'>
                            <p className='profil-single-key'>Employee Id</p>
                            <p className='profil-single-value'>{eData?.new_e_code}</p>
                        </div>
                        <div className='profil-details-basic-single'>
                            <p className='profil-single-key'>Designation</p>
                            <p className='profil-single-value'>{eData?.designation}</p>
                        </div>
                        <div className='profil-details-basic-single'>
                            <p className='profil-single-key'>Date of joining</p>
                            <p className='profil-single-value'>{eData?.date_of_joining_as_per_records}</p>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile2