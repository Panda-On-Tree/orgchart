import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseurl } from '../../api/apiConfig';
import './ManageUsers.css'
import MUIDataTable from "mui-datatables";
import { SlButton, SlMenuItem, SlSelect, SlTag, SlDialog } from '@shoelace-style/shoelace/dist/react';

function ManageUsers() {


    const [users, setUsers] = useState([])
    const [openStatusDialogue, setOpenStatusDialogue] = useState(false);
    const [currentEmployeeRole, setCurrentEmployeeRole] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState();
    useEffect(() => {
        getUsersData()
    }, [])

    const usertableCol = [
        {
            name: "new_e_code",
            label: "Employee Id",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "name_of_the_eployee",
            label: "Employee Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "employement_status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "department",
            label: "Department",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "designation",
            label: "Designation",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "mobile_nuumber_personal",
            label: "Phone No.",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "role",
            label: "Role",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Images",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        <SlTag variant='primary' size="medium" className="tag-row" onClick={e => {
                            console.log(users[dataIndex]);
                            setOpenStatusDialogue(true);
                            setCurrentEmployeeRole(users[dataIndex].role);
                            setSelectedEmployee(users[dataIndex].new_e_code);
                        }} style={{ zIndex: "20", cursor: "pointer" }}>
                            Update Role
                        </SlTag>
                    );
                }
            }
        }
    ]

    const options = {
        tableBodyMaxHeight: "64vh",
        responsive: "standard",
        selectableRowsHideCheckboxes: true

    }

    function getUsersData() {

        axios({
            method: 'get',
            url: `${baseurl.base_url}/mhere/get-users-admin`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res.data.data[0]);
                setUsers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    function updateRoll() {
        const data = {
            employee_id: selectedEmployee,
            role: currentEmployeeRole
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/update-user-admin`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res.data);
                setOpenStatusDialogue(false);
                getUsersData();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className='user-table-main'>
                {users ? <MUIDataTable
                    title={"Employee Table"}
                    data={users}
                    columns={usertableCol}
                    options={options}
                ></MUIDataTable> : null}
                {/* <MUIDataTable
                            title={"Employee Table"}
                            data={users}
                            columns={usertableCol}
                            options={options}
                        ></MUIDataTable> */}
            </div>
            <SlDialog label="Change status" open={openStatusDialogue} onSlRequestClose={() => {
                setOpenStatusDialogue(false)
            }} >
                <SlSelect className="part-edit-input" size='large' label="Status" value={currentEmployeeRole} onSlChange={e => {
                    setCurrentEmployeeRole(e.target.value);
                }}>
                    <SlMenuItem className='part-edit-select' value="admin">Admin</SlMenuItem>
                    <SlMenuItem className='part-edit-select' value="user">User</SlMenuItem>
                </SlSelect>
                <SlButton style={{ marginRight: "20px" }} slot="footer" variant="primary" onClick={() => {
                    updateRoll();
                }}>
                    Change
                </SlButton>
                <SlButton slot="footer" variant="primary" onClick={() => {
                    setOpenStatusDialogue(false)
                }}>
                    Close
                </SlButton>
            </SlDialog>
        </div>
    )
}

export default ManageUsers