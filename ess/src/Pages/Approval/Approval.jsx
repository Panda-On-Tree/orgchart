import {
  SlBadge,
  SlMenu,
  SlMenuItem,
} from '@shoelace-style/shoelace/dist/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../../api/apiConfig'
import './Approval.css'
function Approval() {
  useEffect(() => {
    getApprovalIndex()
    
  }, [])


  const [approvalIndex, setApprovalIndex] = useState()

  function getApprovalIndex() {
    const data = {
      employee_id: localStorage.getItem('employee_id'),
    }
    console.log(data)
    axios({
      method: 'post',
      url: `${baseurl.base_url}/mhere/get-approval-index`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data,
    })
      .then(function (response) {
        console.log(response)
        setApprovalIndex(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function getApprovaldata(abc) {
    const data = {
      employee_id: localStorage.getItem('employee_id'),
      request_type:abc
    }
    console.log(data)
    axios({
      method: 'post',
      url: `${baseurl.base_url}/mhere/get-approval-data`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data,
    })
      .then(function (response) {
        console.log(response)

      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="approval-main">
      <div className="approval-main-left">
        <SlMenu
          style={{ maxWidth: '100%', maxHeight: '75vh', overflowX: 'hidden' }}
        >
            {approvalIndex?.map((item)=>{
                return(
                    <SlMenuItem
                    className="aproval-menu-item"
                    style={{ borderBottom: '1px solid grey' }}
                    value={item.request_type}
                    onClick={(e)=>{
                        getApprovaldata(e.target.value)
                    }}
                    >
                    {item.request_type}
                    <SlBadge slot="suffix" variant="neutral" pill pulse>
                      {item.count}
                    </SlBadge>
                  </SlMenuItem>
                )
            })}
        </SlMenu>
      </div>
      <div className="approval-main-right"></div>
    </div>
  )
}

export default Approval
