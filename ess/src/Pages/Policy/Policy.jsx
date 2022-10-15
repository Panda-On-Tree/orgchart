import React, { useEffect, useState } from 'react'
import './Policy.css'
import { SlDivider, SlMenu, SlMenuItem, SlButton, SlDialog, SlInput, SlTextarea, SlSelect } from '@shoelace-style/shoelace/dist/react';
import pdf from '../assets/pdf-test.pdf'
import axios from 'axios';
import { baseurl } from '../../api/apiConfig';
import { FileUpload } from 'primereact/fileupload';
function Policy() {
    const [policyData, setPolicyData] = useState('');
    const [data, setData] = useState()
    const [policy, setPolicy] = useState()
    const [newPolicy, setNewPolicy] = useState(false);
    const [updatePolicy, setUpdatePolicy] = useState(false);
    const [currentDepartmentAdmin, setCurrentDepartmentAdmin] = useState(false);
    const [deletePolicy, setDeletePolicy] = useState(false);
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");
    const [updateFile, setUpdateFile] = useState();
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newFile, setNewFile] = useState();
    const [dept, setDept] = useState(['it', 'sales', 'travelling', 'service', 'admin', 'hr'])
    useEffect(() => {

    }, [])

    function getPolicy(dept) {
        console.log(dept);
        const data = {
            department: dept,
            access_to: "it"
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
                if (!length) {
                    setPolicy([]);
                }
                res.data.data.map((item, i) => {
                    const linkSource = `data:application/pdf;base64,${res.data.data[0].file}`;
                    return (fetch(linkSource)
                        .then(res => res.blob())
                        .then(blob => {
                            const file = new File([blob], "File name", { type: "application/pdf" })
                            console.log(file);
                            var objectURL = URL.createObjectURL(file);
                            item.url = objectURL
                            data.push(item)
                            if (i >= length - 1) {
                                console.log(data);
                                setPolicy(data);
                            }
                        }))
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
    }

    function updatePolicyFinal() {
        console.log(updateTitle);
        console.log(updateDescription);
        console.log(updateFile);
    }

    function deletePolicyFinal(id) {
        console.log(id);
    }

    return (
        <div className='policy-main'>

            <div className='policy-main-left'>
                <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>Policy</h3>
                <SlMenu style={{ maxWidth: '100%' }}>
                    {dept.map((item) => {
                        return (
                            <SlMenuItem style={{ borderBottom: '1px solid grey' }} value={item.toLowerCase()} onClick={(e) => {
                                getPolicy(e.target.value);
                                if (localStorage.getItem("role") == "sadmin") {
                                    console.log("sadmin");
                                    setCurrentDepartmentAdmin(true);
                                }
                                if (localStorage.getItem("role") == "admin") {
                                    console.log(e.target.value);
                                    if (e.target.value == "it") {
                                        console.log("admin");
                                        setCurrentDepartmentAdmin(true);
                                    } // local
                                    else {
                                        setCurrentDepartmentAdmin(false);
                                    }
                                }
                            }} className='policy-menu-item'>{item}</SlMenuItem>

                        )
                    })}



                </SlMenu>
            </div>
            <div className='policy-main-right'>
                <div>
                    <SlDialog label="Dialog" open={newPolicy} onSlAfterHide={() => {
                        setNewPolicy(false);
                        setNewTitle("");
                        setNewDescription("");
                        setNewFile("");
                    }}>
                        <SlInput label="Policy Title" value={newTitle} onSlInput={e => { setNewTitle(e.target.value) }} />
                        <SlTextarea label="Policy Description" onSlInput={e => { setNewDescription(e.target.value) }} />
                        <SlSelect placeholder="Select a few" multiple clearable>
                            <SlMenuItem value="option-1">Option 1</SlMenuItem>
                            <SlMenuItem value="option-2">Option 2</SlMenuItem>
                            <SlMenuItem value="option-3">Option 3</SlMenuItem>
                            <SlDivider />
                            <SlMenuItem value="option-4">Option 4</SlMenuItem>
                            <SlMenuItem value="option-5">Option 5</SlMenuItem>
                            <SlMenuItem value="option-6">Option 6</SlMenuItem>
                        </SlSelect>
                        <input type="file" id="myfile" name="myfile" accept='application/pdf' onChange={e => { setNewFile(e.target.files) }} />
                        <SlButton slot="footer" variant="primary" onClick={() => {
                            setNewPolicy(false);
                            addPolicy();
                        }}>
                            Add
                        </SlButton>
                    </SlDialog>
                    {currentDepartmentAdmin ?
                        <SlButton variant="primary" onClick={() => setNewPolicy(true)}>
                            Add New Policy
                        </SlButton> : null}
                </div>
                <ul className='policy-right-list-container'>

                    {policy?.length ? null : "NO Policy For This Department"}
                    {
                        policy?.map((item) => {
                            return (
                                <li className='policy-right-list-item'>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    <a id="link" href={item.url} target="_blank">View Policy</a>
                                    <SlDialog label="Dialog" open={updatePolicy} onSlAfterHide={() => setUpdatePolicy(false)}>
                                        <SlInput label="Policy Title" value={updateTitle} onSlInput={e => { setUpdateTitle(e.currentTarget.value) }} />
                                        <SlTextarea label="Policy Description" value={updateDescription} onSlInput={e => { setUpdateDescription(e.target.value) }} />
                                        <input type="file" id="myfile" name="myfile" accept='application/pdf' onChange={e => { setUpdateFile(e.target.files) }} />
                                        <SlButton slot="footer" variant="primary" onClick={() => {
                                            setUpdatePolicy(false);
                                            updatePolicyFinal();
                                        }}>
                                            Update
                                        </SlButton>
                                    </SlDialog>
                                    {currentDepartmentAdmin ?
                                        <SlButton variant="primary" onClick={() => {
                                            setUpdatePolicy(true);
                                            setUpdateTitle(item.title);
                                            setUpdateDescription(item.description);
                                        }}>
                                            Update Policy
                                        </SlButton> : null}
                                    <SlDialog label="Dialog" open={deletePolicy} onSlAfterHide={() => setDeletePolicy(false)}>
                                        Are you Sure You Want to DELETE this Policy
                                        <SlButton slot="footer" variant="primary" onClick={() => {
                                            setDeletePolicy(false);
                                            deletePolicyFinal(item.id);
                                        }}>
                                            Delete
                                        </SlButton>
                                        <SlButton slot="footer" variant="primary" onClick={() => setDeletePolicy(false)}>
                                            Cancle
                                        </SlButton>
                                    </SlDialog>
                                    {currentDepartmentAdmin ?
                                        <SlButton variant="primary" onClick={() => setDeletePolicy(true)}>
                                            Delete Policy
                                        </SlButton> : null}
                                </li>
                            )
                        })
                    }


                </ul>
            </div>
        </div>
    )
}

export default Policy