import React, { useEffect, useState } from 'react'
import './Policy.css'
import { SlDivider, SlMenu, SlMenuItem, SlButton, SlDialog, SlInput, SlTextarea, SlSelect } from '@shoelace-style/shoelace/dist/react';
import pdf from '../assets/pdf-test.pdf'
import axios from 'axios';
import { baseurl } from '../../api/apiConfig';
import { FileUpload } from 'primereact/fileupload';
function Policy() {
    const [policyData, setPolicyData] = useState('');
    const [deptList, setDeptList] = useState()
    const [data, setData] = useState()
    const [policy, setPolicy] = useState()
    const [newPolicy, setNewPolicy] = useState(false);
    const [updatePolicy, setUpdatePolicy] = useState(false);
    const [currentDepartmentAdmin, setCurrentDepartmentAdmin] = useState(false);
    const [deletePolicy, setDeletePolicy] = useState(false);
    const [deletePolicyId, setDeletePolicyId] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateId, setUpdateId] = useState("");
    const [updateDepartment, setUpdateDepartment] = useState("");
    const [updateAccessto, setUpdateAccessto] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");
    const [updateFile, setUpdateFile] = useState();
    const [newTitle, setNewTitle] = useState("");
    const [newDeptAccess, setNewDeptAccess] = useState();
    const [newDept, setNewDept] = useState();

    const [newDescription, setNewDescription] = useState("");
    const [newFile, setNewFile] = useState();
    const [dept, setDept] = useState(['it', 'sales', 'travelling', 'service', 'admin', 'hr'])
    useEffect(() => {
        getDept()

    }, [])


    function getDept() {
        axios({
            method: 'get',
            url: `${baseurl.base_url}/mhere/get-department`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res);
                setDeptList(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function getPolicy(dept) {
        console.log(dept);
        const data = {
            department: dept,
            access_to: localStorage.getItem('department')
        }
        if(localStorage.getItem('role') == 'sadmin')
        {
            data.access_to = "";
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-policy`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res.data);
                const data = [];
                const length = res.data.data.length;
                console.log(length);
                if (!length) {
                    setPolicy([]);
                }
                res.data.data.map((item, i) => {
                    const linkSource = `data:application/pdf;base64,${item.file}`;

                    fetch(linkSource)
                        .then(res => res.blob())
                        .then(blob => {
                            const file = new File([blob], item.title, { type: "application/pdf" })
                            console.log(file);
                            var objectURL = URL.createObjectURL(file);
                            item.url = objectURL
                            data.push(item)
                            console.log(i);
                            if (data.length >= length) {
                                console.log(data);
                                setPolicy(data);
                            }
                        })

                })
                /* const linkSource = `data:application/pdf;base64,${res.data.data[0].file}`;
                fetch(linkSource)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "File name", { type: "application/pdf" })
                        console.log(file);
                        var objectURL = URL.createObjectURL(file);
                        setData(objectURL)
                    }) */

            })
            .catch((err) => {
                console.log(err);
            })
    }

    function addPolicy() {
        console.log(newTitle);
        console.log(newDescription);
        console.log(newFile);
        var formdata = new FormData();
        formdata.append("title", newTitle)
        formdata.append("description", newDescription)
        formdata.append("policy_file", newFile[0])
        formdata.append("department", newDept)
        formdata.append("access_to", newDeptAccess)
        formdata.append("employee_id", localStorage.getItem('employee_id'))
        for (const pair of formdata.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/add-policy`,
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data: formdata
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function updatePolicyFinal() {

        var formdata = new FormData()
        formdata.append("title", updateTitle)
        formdata.append("description", updateDescription)
        formdata.append("policy_file", updateFile)
        formdata.append("department", updateDepartment)
        formdata.append("access_to", updateAccessto)
        formdata.append("id", updateId)
        formdata.append("employee_id", localStorage.getItem('employee_id'))
        for (const pair of formdata.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/update-policy`,
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data: formdata
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function deletePolicyFinal() {
        console.log(deletePolicyId);
        const data = {
            id: deletePolicyId
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/delete-policy`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='policy-main'>

            <div className='policy-main-left'>
                <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>Policy</h3>
                <SlMenu style={{ maxWidth: '100%', maxHeight: '75vh', overflowX: 'hidden' }}>
                    {deptList?.map((item) => {
                        return (
                            <SlMenuItem style={{ borderBottom: '1px solid grey' }} value={item.department.toLowerCase()} onClick={(e) => {
                                setNewDept(e.target.value)

                                getPolicy(e.target.value);
                                if (localStorage.getItem("role") == "sadmin") {
                                    console.log("sadmin");
                                    setCurrentDepartmentAdmin(true);
                                }
                                if (localStorage.getItem("role") == "admin") {
                                    console.log(e.target.value);
                                    if (e.target.value.toLowerCase() == localStorage.getItem('department').toLowerCase()) {
                                        console.log("admin");
                                        setCurrentDepartmentAdmin(true);
                                    } // local
                                    else {
                                        setCurrentDepartmentAdmin(false);
                                    }
                                }
                            }} className='policy-menu-item'>{item.department}</SlMenuItem>

                        )
                    })}



                </SlMenu>
            </div>
            <div className='policy-main-right'>
                <div>
                    <SlDialog style={{ '--width': '50vw' }} label="Add New Policy" open={newPolicy} onSlRequestClose={() => {
                        setNewPolicy(false);
                        setNewTitle("");
                        setNewDescription("");
                        setNewFile("");
                    }}>
                        <SlInput style={{ marginBottom: '20px' }} label="Policy Title" value={newTitle} onSlInput={e => { setNewTitle(e.target.value) }} />
                        <SlTextarea style={{ marginBottom: '20px' }} label="Policy Description" onSlInput={e => { setNewDescription(e.target.value) }} />
                        <SlSelect onSlChange={(e) => {
                            setNewDeptAccess(String(e.target.value))
                        }} label='Access to:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                            {deptList?.map((item) => {
                                return (
                                    <SlMenuItem value={item.department.toLowerCase()} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >{item.department}</SlMenuItem>
                                )
                            })}

                        </SlSelect>
                        <input type="file" id="myfile" name="myfile" accept='application/pdf' onChange={e => { setNewFile(e.target.files) }} />
                        <SlButton size='large' className='policy-button' slot="footer" variant="primary" onClick={() => {
                            setNewPolicy(false);
                            addPolicy();
                        }}>
                            Add
                        </SlButton>
                    </SlDialog>
                    {currentDepartmentAdmin ?
                        <SlButton size='large' className='policy-button' variant="primary" style={{ marginBottom: "5vh" }} onClick={() => setNewPolicy(true)}>
                            Add New Policy
                        </SlButton> : null}
                </div>
                <ul className='policy-right-list-container'>

                    {policy?.length ? null : <p>"No Policy Found For This Department"</p>}
                    {
                        policy?.map((item) => {

                            return (
                                <li className='policy-right-list-item'>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    <a style={{ marginRight: '20px' }} id="link" href={item.url} target="_blank">View Policy</a>

                                    {currentDepartmentAdmin ?
                                        <SlButton size='large' className='policy-button' style={{ marginRight: '20px' }} variant="primary" onClick={() => {
                                            setUpdateDepartment(item.department)
                                            setUpdateAccessto(item.access_to)
                                            console.log(item.access_to);
                                            setUpdateTitle(item.title);
                                            setUpdateDescription(item.description);
                                            setUpdateId(item.id)
                                            setUpdatePolicy(true);

                                        }}>
                                            Update Policy
                                        </SlButton> : null}

                                    {currentDepartmentAdmin ?
                                        <SlButton size='large' className='policy-button' style={{ marginRight: '20px' }} variant="primary" onClick={() => {
                                            setDeletePolicyId(item.id)
                                        setDeletePolicy(true)}}>
                                            Delete Policy
                                        </SlButton> : null}
                                </li>
                            )
                        })
                    }


                </ul>
            </div>
            <SlDialog style={{ '--width': '50vw' }} label="Add Policy" open={updatePolicy} onSlRequestClose={() => { setUpdatePolicy(false); }}>
                <SlInput style={{ marginBottom: '2vh' }} label="Policy Title" value={updateTitle} onSlInput={e => { setUpdateTitle(e.currentTarget.value) }} />
                <SlTextarea style={{ marginBottom: '2vh' }} label="Policy Description" value={updateDescription} onSlInput={e => { setUpdateDescription(e.target.value) }} />
                <SlSelect value={updateAccessto.split(",")} onSlChange={(e) => {
                    setUpdateAccessto(String(e.target.value))
                   
                }} label='Access to:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                    {deptList?.map((item) => {
                        return (
                            <SlMenuItem value={item.department.toLowerCase()} onClick={(e) => {
                                
                            }} >{item.department}</SlMenuItem>
                        )
                    })}

                </SlSelect>
                <input type="file" id="myfile" name="myfile" accept='application/pdf' onChange={e => { setUpdateFile(e.target.files) }} />
               
                <SlButton size='large' className='policy-button' slot="footer" variant="primary" onClick={() => {
                    setUpdatePolicy(false);
                    updatePolicyFinal();
                }}>
                    Update
                </SlButton>
            </SlDialog>
            <SlDialog label="Confirmation" style={{'--width': '25vw'}} open={deletePolicy} onSlAfterHide={() => setDeletePolicy(false)}>
                Are you Sure You Want to DELETE this Policy?
                <SlButton size='large' className='policy-button' variant="danger" style={{marginRight:'20px'}} slot="footer"  onClick={() => {
                    setDeletePolicy(false);
                    deletePolicyFinal();
                }}>
                    Delete
                </SlButton>
                <SlButton size='large' className='policy-button' slot="footer" variant="primary" onClick={() => setDeletePolicy(false)}>
                    Cancel
                </SlButton>
            </SlDialog>
        </div>
    )
}

export default Policy