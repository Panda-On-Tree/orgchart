import {
  SlBadge,
  SlButton,
  SlDialog,
  SlInput,
  SlMenu,
  SlMenuItem,
  SlSelect,
} from '@shoelace-style/shoelace/dist/react'
import axios from 'axios'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../../api/apiConfig'
import './Approval.css'
function Approval() {
  const [open, setOpen] = useState(false)
  const [approvalId, setApprovalId] = useState()
  const [approvalIndex, setApprovalIndex] = useState()
  const [approvalData, setApprovalData] = useState()
  const [changeStatus, setChangeStatus] = useState({
    status:"",
    approver_remarks:""
  })
  const [tableCol, setTableCol] = useState([
    {
      name: 'request_id',
      label: 'Request ID',
      options: {
        filter: true,
        sort: true,
        display: false
      },
    },
    {
      name: 'applied_by',
      label: 'Employee Code',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name_of_the_eployee',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'request_type',
      label: 'Leave Type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'status',
      label: 'status',
      options: {
        filter: true,
        sort: true,
      },
    },
  ])

  useEffect(() => {
    getApprovalIndex()
  }, [])

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
      request_type: abc,
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
        console.log(response.data.data)
        setApprovalData(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function changeLeaveStatus(){
    const data = {
        status: changeStatus.status,
        approver_remarks: changeStatus.approver_remarks,
        employee_id: localStorage.getItem("employee_id"),
        approval_id: approvalId 
      }
      console.log(data)
      setOpen(false)
      axios({
        method: 'post',
        url: `${baseurl.base_url}/mhere/change-leave-status`,
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



  const options = {
    tableBodyMaxHeight: '60vh',
    responsive: 'standard',
    selectableRowsHideCheckboxes: true,
    onRowClick: (rowData, rowMeta) => {
      console.log(rowData)
      setOpen(true)
     setApprovalId(rowData[0])
     
    },
  }

  return (
    <div className="approval-main">
      <SlDialog  label="Dialog" open={open} style={{ '--width': '30vw', marginBottom:'20px' }} onSlRequestClose={() => setOpen(false)}>
        <SlSelect onSlChange={(e)=>{
            setChangeStatus({...changeStatus, ["status"]:e.target.value})
        }} label='Change Status'>
          <SlMenuItem value="approved">Approve</SlMenuItem>
          <SlMenuItem value="rejected">Reject</SlMenuItem>
        </SlSelect>
        <SlInput onSlChange={(e)=>{
 setChangeStatus({...changeStatus, ["approver_remarks"]:e.target.value})
        }} label="Remarks" />

        <SlButton
          slot="footer"
          variant="primary"
          onClick={() => changeLeaveStatus()}
        >
          Update
        </SlButton>
        <SlButton slot="footer" variant="danger" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDialog>
      <div className="approval-main-left">
        <SlMenu
          style={{ maxWidth: '100%', maxHeight: '75vh', overflowX: 'hidden' }}
        >
          {approvalIndex?.map((item) => {
            return (
              <SlMenuItem
                className="aproval-menu-item"
                style={{ borderBottom: '1px solid grey' }}
                value={item.request_type}
                onClick={(e) => {
                  getApprovaldata(e.target.value)
                }}
              >
                {item.request_type}
                <SlBadge slot="suffix" variant="primary" pill pulse>
                  {item.count}
                </SlBadge>
              </SlMenuItem>
            )
          })}
        </SlMenu>
      </div>
      <div className="approval-main-right">
        <div className="approval-table-main">
          <MUIDataTable
            title="Approval"
            columns={tableCol}
            data={approvalData}
            options={options}
          ></MUIDataTable>
        </div>
      </div>
    </div>
  )
}

export default Approval
