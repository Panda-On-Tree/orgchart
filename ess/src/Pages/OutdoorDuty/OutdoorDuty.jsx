import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../../api/apiConfig'
import './OutdoorDuty.css'
import { SlMenuItem, SlSelect,SlIcon, SlInput, SlButton } from '@shoelace-style/shoelace/dist/react';

function OutdoorDuty() {
   

    const [team, setTeam] = useState()
    const [leaveData, setLeaveData] = useState({
        employee_id:"",
        leave_type:"",
        reason:"",
        start_date:"",
        end_date:"",
        short_leave_type:""
    })
    useEffect(()=>{
        getTeam()
    },[])
   
    function getTeam() {

        const data = {
            "manager_id": 53994
        }

        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-team-data`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res.data.data);
                    setTeam(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }

  function leaveDataHandle(e){
       let name = e.target.name
       let value = e.target.value
       setLeaveData({...leaveData,[name]:value})
  }
  
    return (
    <div className='od-main'>
        <div className='od-main-leave'>
            <div className='od-main-leave-header'>
                <p>New Leave</p>
            </div>
            <div className='od-main-leave-inner'>
            <SlSelect name='employee_id' value={leaveData.employee_id} onSlChange={leaveDataHandle}  className='leave-select' label="Select one">
                <SlMenuItem value="50373">Myself</SlMenuItem>
                {
                    team?.map((item)=>{
                        return(
                            <SlMenuItem value={item.new_e_code}>{item.name_of_the_eployee}{` (${item.new_e_code})`}</SlMenuItem>
                        )
                    })
                }
            </SlSelect>
            <SlSelect name='leave_type' value={leaveData.leave_type} onSlChange={leaveDataHandle} className='leave-select' label="leave Type">
                <SlMenuItem value="casual_leave">Casual Leave</SlMenuItem>
                <SlMenuItem value="earned_leave">Earned Leave</SlMenuItem>
                <SlMenuItem value="election_leave">Election Leave</SlMenuItem>
                <SlMenuItem value="leave_without_pay">Leave Without Pay</SlMenuItem>
                <SlMenuItem value="restricted_holiday">Restricted Holiday</SlMenuItem>
                <SlMenuItem value="short_leave">Short Leave</SlMenuItem>
                <SlMenuItem value="half_day">Half Day</SlMenuItem>
                <SlMenuItem value="sick_leave">Sick Leave</SlMenuItem>
            </SlSelect>
            <SlInput name='reason' value={leaveData.reason} onSlChange={leaveDataHandle} className='leave-select' label="Leave Reason" />
            
            </div>
           
            {
                leaveData.leave_type == 'short_leave' || leaveData.leave_type =='half_day'?<div className='od-main-leave-inner'>
                <SlInput name='start_date' value={leaveData.start_date} onSlChange={leaveDataHandle} type='date' className='leave-select' label="Start Date" />
                <SlSelect name='short_leave_type' value={leaveData.short_leave_type} onSlChange={leaveDataHandle} className='leave-select' label="leave Type">
                
                <SlMenuItem value="morning">Morning</SlMenuItem>
                <SlMenuItem value="evening">evening</SlMenuItem>
            </SlSelect>
                </div>: <div className='od-main-leave-inner'>
                <SlInput name='start_date' value={leaveData.start_date} onSlChange={leaveDataHandle} type='date' className='leave-select' label="Start Date" />
            <SlInput name='end_date' value={leaveData.end_date} onSlChange={leaveDataHandle}   type='date' className='leave-select' label="End Date" />
                </div>
            }
          
           
           
            <div style={{padding:'15px'}}>
            <SlButton onClick={()=>{
                console.log(leaveData);
            }} variant="primary" size='large'>Submit</SlButton>
            </div>
        </div>
    </div>
  )
}

export default OutdoorDuty