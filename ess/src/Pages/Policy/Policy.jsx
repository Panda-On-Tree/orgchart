import React, { useEffect, useState } from 'react'
import './Policy.css'
import { SlDivider, SlMenu, SlMenuItem, SlButton, SlDialog, SlInput, SlTextarea, SlSelect, SlCheckbox, SlIcon } from '@shoelace-style/shoelace/dist/react';
import pdf from '../assets/pdf-test.pdf'
import axios from 'axios';
import { baseurl } from '../../api/apiConfig';
import { FileUpload } from 'primereact/fileupload';
function Policy() {
    const [policyData, setPolicyData] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState("")
    const [deptartment, setDeptartment] = useState()
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
    const [needAccept, setNeedAccept] = useState("")
    const [newDeptAccess, setNewDeptAccess] = useState();
    const [newDept, setNewDept] = useState();
    const [departmentForPolicies, setDepartmentForPolicies] = useState([]);
    const [newDescription, setNewDescription] = useState("");
    const [newFile, setNewFile] = useState();
    const [gradeList, setGradeList] = useState();
    const [bandList, setBandList] = useState();
    const [updateGradeList, setUpdateGradeList] = useState("");
    const [updateAccept, setUpdateAccept] = useState("")
    const [updateBandList, setUpdateBandList] = useState("");
    const [gradeListFull, setGradeListFull] = useState();
    const [bandListFull, setBandListFull] = useState();
    const [dept, setDept] = useState(['it', 'sales', 'travelling', 'service', 'admin', 'hr'])
    useEffect(() => {
        getDept()
        getDeptPolicy();
        getBandGrade();
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
    function getDeptPolicy() {
        const data = {
            department: localStorage.getItem('role') == "sadmin"? "" : localStorage.getItem('department'),
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-department-policies`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                setDepartmentForPolicies(res.data.data)
                console.log(res.data.data.length);
                if(!res.data.data.length){
                    setDepartmentForPolicies([{department: localStorage.getItem('department')}]);
                }
                const has_department = false;
                res.data.data.map((item, i)=>{
                    if(localStorage.getItem('department') == item.department){
                        has_department = true;
                    }
                    if(i >= res.data.data.length){
                        if(!has_department){
                            res.data.data.push({
                                department: localStorage.getItem('department')
                            })
                            setDepartmentForPolicies(res.data.data);
                        }
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function getPolicy(dept) {
        console.log(dept);
        const data = {
            employee_id: localStorage.getItem("employee_id"),
            department: dept,
            access_to: localStorage.getItem('department'),
            access_to_band: localStorage.getItem('band'),
            access_to_grade: localStorage.getItem('grade'),
        }
        if(localStorage.getItem('role') == 'sadmin')
        {
            data.access_to = "";
        }
        if(localStorage.getItem('role') != 'user')
        {
            data.access_to_band = "";
            data.access_to_grade = "";
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
        formdata.append("access_to_grade", gradeList)
        formdata.append("access_to_band", bandList)
        formdata.append("have_to_accept", needAccept)

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

    function getBandGrade(){
        axios({
            method: 'get',
            url: `${baseurl.base_url}/mhere/get-grade-band`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((res) => {
                console.log(res);
                setGradeListFull(res.data.data.grade);
                setBandListFull(res.data.data.band);
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
        formdata.append("access_to_grade", updateGradeList)
        formdata.append("access_to_band", updateBandList)
        formdata.append("have_to_accept", updateAccept)
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

    function sendAcceptPolicy(id){
        const data = {
            employee_id: localStorage.getItem("employee_id"),
            policy_id: id
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/accept-policy`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
        .then((res)=>{
            console.log(res);
            getPolicy(deptartment);

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
                    {departmentForPolicies?.map((item) => {
                        return (
                            <SlMenuItem style={{ borderBottom: '1px solid grey' }} value={item.department.toLowerCase()} onClick={(e) => {
                                setNewDept(e.target.value)
                                setDeptartment(e.target.value)
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
                        <h3>Access To </h3>
                        <SlSelect onSlChange={(e) => {
                            setNewDeptAccess(String(e.target.value))
                        }} label='Department:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                            {deptList?.map((item) => {
                                return (
                                    <SlMenuItem value={item.department.toLowerCase()} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >{item.department}</SlMenuItem>
                                )
                            })}

                        </SlSelect>
                        <SlSelect onSlChange={(e) => {
                            setBandList(String(e.target.value))
                        }} label='Band:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                            {bandListFull?.map((item) => {
                                return (
                                    <SlMenuItem value={item.band.toLowerCase()} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >{item.band}</SlMenuItem>
                                )
                            })}

                        </SlSelect>
                        <SlSelect onSlChange={(e) => {
                            setGradeList(String(e.target.value))
                        }} label='Grade:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                            {gradeListFull?.map((item) => {
                                return (
                                    <SlMenuItem value={item.grade.toLowerCase()} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >{item.grade}</SlMenuItem>
                                )
                            })}

                        </SlSelect>
                        <SlSelect label='Need To Accept?' style={{ marginBottom: '20px' }} onSlChange={(e)=>{
                            setNeedAccept(e.target.value)
                        }} placeholder="Select a few" clearable>
                            <SlMenuItem value={true} onClick={(e) => {
                                        console.log(e.target.value);
                                    
                                    }} >True</SlMenuItem>
                            <SlMenuItem value={false} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >False</SlMenuItem>
                          

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
                                    <h4 style={{display:'flex'}}>{item.title}
                                    {
                                        item.accepted == "accepted"? <span style={{color:'green', marginLeft:'10px'}} class="material-symbols-rounded">
check_circle
</span>:""
                                    }
                                    </h4>
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
                                            setUpdateAccept(item.have_to_accept)
                                            setUpdateBandList(item.access_to_band);
                                            setUpdateGradeList(item.access_to_grade);
                                        }}>
                                            Update Policy
                                        </SlButton> : null}

                                    {currentDepartmentAdmin ?
                                        <SlButton size='large' className='policy-button' style={{ marginRight: '20px' }} variant="primary" onClick={() => {
                                            setDeletePolicyId(item.id)
                                        setDeletePolicy(true)}}>
                                            Delete Policy
                                        </SlButton> : null}
                                    {
                                        item.accepted == "pending"? <div className="accept-policy-button">
                                        <SlCheckbox className='home-policy-check' onSlChange={(e)=>{
                                             
                                            console.log(e.target.checked);
                                            if(e.target.checked){
                                                
                                                setButtonDisabled(item.id)
                                            }
                                            else{
                                                
                                                setButtonDisabled("")
                                            }
                                        }} >I have read and understood the above policy</SlCheckbox>
                                        {buttonDisabled == item.id ? <SlButton onClick={()=>{
                                            sendAcceptPolicy(item.id)
                                        }} >Accept</SlButton>:""}
                                    
                                    </div>:""
                                    }  
                                   

                                </li>
                            )
                        })
                    }


                </ul>
            </div>
            <SlDialog style={{ '--width': '50vw' }} label="Update Policy" open={updatePolicy} onSlRequestClose={() => { setUpdatePolicy(false); }}>
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
                <SlSelect value={updateBandList.split(",")} onSlChange={(e) => {
                            setUpdateBandList(String(e.target.value))
                        }} label='Band:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                            {bandListFull?.map((item) => {
                                return (
                                    <SlMenuItem value={item.band.toLowerCase()} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >{item.band}</SlMenuItem>
                                )
                            })}

                        </SlSelect>
                        <SlSelect value={updateGradeList.split(",")} onSlChange={(e) => {
                            setUpdateGradeList(String(e.target.value))
                        }} label='Grade:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                            {gradeListFull?.map((item) => {
                                return (
                                    <SlMenuItem value={item.grade.toLowerCase()} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >{item.grade}</SlMenuItem>
                                )
                            })}

                        </SlSelect>
                        <SlSelect label='Need To Accept?' style={{ marginBottom: '20px' }} value={updateAccept} placeholder="Select a few" onSlChange={(e)=>{
                            setUpdateAccept(e.target.value)
                        }} clearable>
                            <SlMenuItem value={true} onClick={(e) => {
                                        console.log(e.target.value);
                                    //setUpdateAccept(e.target.value)
                                    }} >True</SlMenuItem>
                            <SlMenuItem value={false} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >False</SlMenuItem>
                          

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