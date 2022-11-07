import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../../api/apiConfig'
import './OutdoorDuty.css'
import { SlMenuItem, SlSelect, SlIcon, SlInput, SlButton } from '@shoelace-style/shoelace/dist/react';
import MUIDataTable from 'mui-datatables';

function OutdoorDuty() {

    const [colums, setColumns] = useState([
        {name: "leave_type",
        label: "Leave Type",
        options: {
            filter: true,
            sort: true,
        }},
        {name: "start_date",
        label: "Start Date",
        options: {
            filter: true,
            sort: true,
        }},
        {name: "end_date",
        label: "End date",
        options: {
            filter: true,
            sort: true,
        }},
        {name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
        }},
    ])
    const [team, setTeam] = useState()
    const [employeeLeave, setEmployeeLeave] = useState()
    const [teamLeave, setTeamLeave] = useState()
    const [leaveData, setLeaveData] = useState({
        employee_id: "",
        leave_type: "",
        reason: "",
        start_date: "",
        end_date: "",
        short_leave_type: ""
    })
    useEffect(() => {
        getTeam();
        getLeave();
    }, [])


    const options = {
        tableBodyMaxHeight: "60vh",
        responsive: "standard",
        selectableRowsHideCheckboxes: true
    };

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

    function leaveDataHandle(e) {
        let name = e.target.name
        let value = e.target.value
        setLeaveData({ ...leaveData, [name]: value })
    }

    function sendLeaveData() {
        //console.log(leaveData);
        var manager_id, applied_by;
        if (localStorage.getItem('employee_id') == leaveData.employee_id) {
            manager_id = localStorage.getItem('manager_id');
            applied_by = 'employee'
        }
        else {
            manager_id = localStorage.getItem('employee_id');
            applied_by = 'manager'
        }
        if (!(leaveData.leave_type && leaveData.start_date && leaveData.employee_id && manager_id && applied_by)) {
            alert("Fields can not be empty 1");
            return;
        }
        if (leaveData.leave_type == "short_leave" || leaveData.leave_type == "half_day") {
            if (!leaveData.short_leave_type) {
                alert("Fields can not be empty 2");
                return;
            }
        }
        else {
            if (!leaveData.end_date) {
                alert("Fields can not be empty 3");
                return;
            }
        }
        alert("submitted");

        const data = {
            employee_id: leaveData.employee_id,
            manager_id: manager_id,
            start_date: leaveData.start_date,
            end_date: leaveData.end_date,
            reason: leaveData.reason,
            applied_by: applied_by,
            leave_type: leaveData.leave_type,
            leave_time: leaveData.short_leave_type
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/apply-leave`,
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data,
          })
            .then(function (response) {
                console.log(response);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    function getLeave(){
        const data = {
            employee_id: localStorage.getItem('employee_id'),
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-leave`,
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data,
          })
            .then(function (response) {
                console.log(response);
                setEmployeeLeave(response.data.data.employee_leave)
                setTeamLeave(response.data.data.team_leave)
            })
            .catch(err=>{
                console.log(err);
            })
    }

    return (
        <div className='leave-main'>
            <div className='od-main-leave'>
                <div className='od-main-leave-header'>
                    <p>New Outdoor Duty</p>
                </div>
                <div className='od-main-leave-inner'>
                    <SlSelect name='employee_id' value={leaveData.employee_id} onSlChange={leaveDataHandle} className='leave-select' label="Select one">
                        <SlMenuItem value={localStorage.getItem('employee_id')}>Myself:  {localStorage.getItem("employee_id")}</SlMenuItem>
                        {
                            team?.map((item) => {
                                return (
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
                    leaveData.leave_type == 'short_leave' || leaveData.leave_type == 'half_day' ? <div className='od-main-leave-inner'>
                        <SlInput name='start_date' value={leaveData.start_date} onSlChange={leaveDataHandle} type='date' className='leave-select' label="Start Date" />
                        <SlSelect name='short_leave_type' value={leaveData.short_leave_type} onSlChange={leaveDataHandle} className='leave-select' label="leave Type">

                            <SlMenuItem value="morning">Morning</SlMenuItem>
                            <SlMenuItem value="evening">evening</SlMenuItem>
                        </SlSelect>
                    </div> : <div className='od-main-leave-inner'>
                        <SlInput name='start_date' value={leaveData.start_date} onSlChange={leaveDataHandle} type='date' className='leave-select' label="Start Date" />
                        <SlInput name='end_date' value={leaveData.end_date} onSlChange={leaveDataHandle} type='date' className='leave-select' label="End Date" />
                    </div>
                }



                <div style={{ padding: '15px' }}>
                    <SlButton onClick={() => {
                        sendLeaveData()
                    }} variant="primary" size='large'>Submit</SlButton>
                </div>
            </div>
            <div className='od-main-leave'>
            <div className='od-main-leave-header'>
                    <p>Your Outdoor Duty</p>
                </div>
                <div>
                <MUIDataTable
                            title={"Your Leaves"}
                            columns = {colums}
                            data={employeeLeave}
                            options ={options}
                        ></MUIDataTable>

                </div>
            </div>
            <div className='od-main-leave'>
            <div className='od-main-leave-header'>
                    <p>Team Outdoor Duty</p>
                </div>
                <div>
                <MUIDataTable
                            title={"Team Leave"}
                            columns = {colums}
                            data={employeeLeave}
                            options ={options}
                        ></MUIDataTable>

                </div>
            </div>
        </div>
    )
}

export default OutdoorDuty