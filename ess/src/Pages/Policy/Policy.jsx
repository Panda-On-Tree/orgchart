import React, { useEffect, useState } from 'react'
import './Policy.css'
import {  SlMenu, SlMenuItem, SlButton, SlDialog, SlInput, SlTextarea, SlSelect, SlCheckbox, SlTag, SlRadioGroup, SlRadio } from '@shoelace-style/shoelace/dist/react';
import axios from 'axios';
import { baseurl } from '../../api/apiConfig';
import { window } from 'd3';

function Policy() {
   // const [policyData, setPolicyData] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState("")
    const [deptartment, setDeptartment] = useState()
    const [deptList, setDeptList] = useState()
    //const [data, setData] = useState()
    const [newHaveQuestion, setNewHaveQuestion] = useState(false);
    const [newQuestions, setNewQuestions] = useState([
        {
            question:"",
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            answer:"",
        }
    ]);
    const [questionForReview, setQuestionForReview] = useState(0);
    const [policyQuizDialog, setPolicyQuizDialog] = useState(false);
    const [policyQuizQuestions, setPolicyQuizQuestions] = useState([
        {
            question:``,
            option1:"",
            option2:"",
            option3:"",
            option4:""
        }
    ]);
    const [newQuestionTag, setNewQuestionTag] = useState(0);
    const [addQuestionDialog, setAddQuestionDialog] = useState(false);
    const [updateQuestionDialog, setUpdateQuestionDialog] = useState(false)
    const [updateQuestionTag, setUpdateQuestionTag] = useState(0)
    const [updateQuestions, setUpdateQuestions] = useState([
        {
            question:"",
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            answer:""
        }
    ])
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
    const [updateHaveQuestion, setUpdateHaveQuestion] = useState("");
    const [updateBandList, setUpdateBandList] = useState("");
    const [gradeListFull, setGradeListFull] = useState();
    const [bandListFull, setBandListFull] = useState();
  //  const [dept, setDept] = useState(['it', 'sales', 'travelling', 'service', 'admin', 'hr'])
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
                let has_department = false;
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
     
        if(!newFile){
            alert("Please Insert A Document");
            return
        }
        console.log(JSON.stringify(updateQuestions));
        console.log(JSON.parse(JSON.stringify(updateQuestions)));
        if(newHaveQuestion){
            console.log(newQuestions);
           for ( const i of newQuestions){
            for (const [key, value] of Object.entries(i)) {       
                if(!value){
                    alert("Input All Questions fields")
                    return
                }
              }
           }
        }

        var formdata = new FormData();
        formdata.append("title", newTitle)
        formdata.append("description", newDescription)
        formdata.append("policy_file", newFile[0])
        formdata.append("department", newDept)
        formdata.append("access_to", newDeptAccess)
        formdata.append("access_to_grade", gradeList)
        formdata.append("access_to_band", bandList)
        formdata.append("have_question", newHaveQuestion)
        formdata.append("have_to_accept", needAccept)
        formdata.append("questions",JSON.stringify(newQuestions));

        formdata.append("employee_id", localStorage.getItem('employee_id'))
        for (const pair of formdata.entries()) {
           if(!pair[1]){
             alert("Please Input all values")
             return
           }
           
          }
          console.log("all test pass");
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
                setNewPolicy(false);
                getPolicy(deptartment);
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
        formdata.append("have_question", updateHaveQuestion)
        formdata.append("employee_id", localStorage.getItem('employee_id'))
        formdata.append("questions",JSON.stringify(updateQuestions));
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
                getPolicy(deptartment);
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
            getPolicy(deptartment);
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

    function removeNewQuestion(i){
        console.log(i);
        var newArray = [...newQuestions];
        const nextArr = newArray.filter((item,index)=> index !== i);
        console.log(newArray);
        if (newQuestionTag >= nextArr.length) {
            console.log(newQuestionTag);
            if(newQuestionTag > 0)
                setNewQuestionTag(newQuestionTag - 1);
        }
        if(!nextArr.length){
            setNewQuestions([{
                question:"",
                option1:"",
                option2:"",
                option3:"",
                option4:"",
                answer:"",
            }])
            return;
        }
        setNewQuestions(nextArr);
    }

    function removeUpdateQuestion(i){
        console.log(i);
        var newArray = [...updateQuestions];
        const nextArr = newArray.filter((item,index)=> index !== i);
        console.log(newArray);
        if (updateQuestionTag >= nextArr.length) {
            //console.log(newQuestionTag);
            if(updateQuestionTag > 0)
                setUpdateQuestionTag(updateQuestionTag - 1);
        }
        if(!nextArr.length){
            setUpdateQuestions([{
                question:"",
                option1:"",
                option2:"",
                option3:"",
                option4:"",
                answer:"",
            }])
            return;
        }
        setUpdateQuestions(nextArr);
    }

    function getQuestionsForPolicy(id) {
        const data = {
            policy_id: id
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/policy-question`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
        .then((res)=>{
            console.log(res.data.data);
            setPolicyQuizQuestions(res.data.data);
            if(res.data.data.length){
                setUpdateQuestions(res.data.data);
            }
        })
        .catch((err)=>{
            console.log(err);
        }) 
    }

    function getQuestionsForPolicyUpdate(id) {
        const data = {
            policy_id: id
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/policy-question-update`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
        .then((res)=>{
            console.log(res.data.data);
            if(res.data.data.length){
                setUpdateQuestions(res.data.data);
            }
        })
        .catch((err)=>{
            console.log(err);
        }) 
    }

    function acceptPolicyWithQuestion() {
        const data = {
            employee_id: localStorage.getItem('employee_id'),
            policy_id: policyQuizQuestions[0].policy_id,
            questions: policyQuizQuestions
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/accept-policy-question`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
        .then((res)=>{
            console.log(res.data);
            alert(res.data.message)
            setPolicyQuizDialog(false);
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
                <SlMenu className='policy-menu' style={{ maxWidth: '100%', overflowX: 'hidden' }}>
                    {departmentForPolicies?.map((item,i) => {
                        return (
                            <SlMenuItem id={i} style={{ borderBottom: '1px solid grey' }} value={item.department.toLowerCase()} onClick={(e) => {
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
                            {deptList?.map((item,i) => {
                                return (
                                    <SlMenuItem i={i} value={item.department.toLowerCase()} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >{item.department}</SlMenuItem>
                                )
                            })}

                        </SlSelect>
                        <SlSelect onSlChange={(e) => {
                            setBandList(String(e.target.value))
                        }} label='Band:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                            {bandListFull?.map((item,i) => {
                                return (
                                    <SlMenuItem id={i} value={item.band.toLowerCase()} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >{item.band}</SlMenuItem>
                                )
                            })}

                        </SlSelect>
                        <SlSelect onSlChange={(e) => {
                            setGradeList(String(e.target.value))
                        }} label='Grade:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                            {gradeListFull?.map((item,i) => {
                                return (
                                    <SlMenuItem id={i} value={item.grade.toLowerCase()} onClick={(e) => {
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
                        <SlCheckbox className='policy-question-checkbox' onSlChange={e=>{setNewHaveQuestion(e.target.checked)}} >Require Questions?</SlCheckbox>
                        <input style={{display:'block'}} type="file" id="myfile" name="myfile" accept='application/pdf' onChange={e => { setNewFile(e.target.files) }} />
                        {newHaveQuestion ?<SlButton size='large' style={{marginRight:'20px'}} className='policy-button' slot="footer" variant="primary" onClick={() => {
                            setAddQuestionDialog(true);
                        }}>
                            Add Question
                        </SlButton>:""}
                        <SlButton size='large' className='policy-button' slot="footer" variant="success" onClick={() => {
                           
                            addPolicy();
                        }}>
                            Add
                        </SlButton>
                    </SlDialog>
                    {currentDepartmentAdmin ?
                        <SlButton size='large' className='policy-button' variant="primary" style={{ marginBottom: "3vh",paddingLeft:'5%' }} onClick={() => setNewPolicy(true)}>
                            Add New Policy
                        </SlButton> : null}
                        {deptartment?(policy?.length ? null : <p>"No Policy Found For This Department"</p>):<p>"Select Department to view there policy"</p>}
                        <div className='policy-card-main'>
                            {policy?.map((item,i)=>{
                                return(
                                    <div id={i} className='policy-card-container'>
                                    <div className='policy-card-title' style={{'display':'flex','justifyContent': "flex-start"}}>
                                        {item.title} 
                                        {item.accepted == "accepted"?<span class="material-symbols-outlined" style={{"marginLeft":"10px", "color":"green"}}> verified </span>: null}
                                    </div>
                                <div className='policy-des-button-main'>
                                <div className='policy-card-description'>
                                    <div>
                                    {item.description}
                                    </div>
                                   <div className='policy-accept-container'>
                                   {
                                        item.accepted == "pending"? <div className="accept-policy-button">
                                        <SlCheckbox style={{marginLeft:'5px'}} className='home-policy-check' onSlChange={(e)=>{
                                             
                                            console.log(e.target.checked);
                                            if(e.target.checked){
                                                
                                                setButtonDisabled(item.id)
                                            }
                                            else{
                                                
                                                setButtonDisabled("")
                                            }
                                        }} >I have read and understood the above policy</SlCheckbox>
                                        {buttonDisabled == item.id ? <SlButton  style={{maxWidth:'20%', marginLeft:'5px'}} outline variant='success' onClick={()=>{
                                            if(item.have_question){
                                                getQuestionsForPolicy(item.id);
                                                setPolicyQuizDialog(true);
                                            }
                                            else{
                                                sendAcceptPolicy(item.id);
                                            }
                                        }} >Accept</SlButton>:""}
                                    </div>:""
                                    }  
                                   </div>
                                </div>
                                <div className='policy-card-button'>
                                     <a style={{color:'white'}} id="link" href={item.url} target="_blank"><SlButton size='large' variant='neutral'>View Policy</SlButton></a>
                                {currentDepartmentAdmin ?
                                        <SlButton size='large' className='policy-button'  variant="primary" onClick={() => {
                                            setUpdateDepartment(item.department)
                                            setUpdateAccessto(item.access_to)
                                            console.log(item.have_question);
                                            setUpdateTitle(item.title);
                                            setUpdateDescription(item.description);
                                            setUpdateId(item.id)
                                            setUpdatePolicy(true);
                                            setUpdateAccept(item.have_to_accept);
                                            setUpdateHaveQuestion(item.have_question);
                                            setUpdateBandList(item.access_to_band);
                                            setUpdateGradeList(item.access_to_grade);
                                            getQuestionsForPolicyUpdate(item.id);
                                        }}>
                                            Update Policy
                                        </SlButton> : null}

                                    {currentDepartmentAdmin ?
                                        <SlButton size='large' className='policy-button' outline style={{ marginRight: '20px' }} variant="danger" onClick={() => {
                                            setDeletePolicyId(item.id)
                                        setDeletePolicy(true)}}>
                                            Delete Policy
                                        </SlButton> : null}
                                </div>
                                </div>
                            </div>
                                )
                            })}
                           {/*  <div className='policy-card-container'>
                                <div className='policy-card-title'></div>
                                <div className='policy-des-button-main'>
                                <div className='policy-card-description'>
                                    <div>
                                   
                                    </div>
                                </div>
                                <div className='policy-card-button'>
                                
                                </div>
                                </div>
                            </div> */}
                            
                        </div>

                    
                </div>
            </div>
            {/* Update Dialog */}
            <SlDialog style={{ '--width': '50vw' }} label="Update Policy" open={updatePolicy} onSlRequestClose={() => { setUpdatePolicy(false); }}>
                <SlInput style={{ marginBottom: '2vh' }} label="Policy Title" value={updateTitle} onSlInput={e => { setUpdateTitle(e.currentTarget.value) }} />
                <SlTextarea style={{ marginBottom: '2vh' }} label="Policy Description" value={updateDescription} onSlInput={e => { setUpdateDescription(e.target.value) }} />
                <SlSelect value={updateAccessto.split(",")} onSlChange={(e) => {
                    setUpdateAccessto(String(e.target.value))
                   
                }} label='Access to:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                    {deptList?.map((item,i) => {
                        return (
                            <SlMenuItem id={i} value={item.department.toLowerCase()} onClick={(e) => {
                                
                            }} >{item.department}</SlMenuItem>
                        )
                    })}

                </SlSelect>
                <SlSelect value={updateBandList.split(",")} onSlChange={(e) => {
                            setUpdateBandList(String(e.target.value))
                        }} label='Band:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                            {bandListFull?.map((item,i) => {
                                return (
                                    <SlMenuItem id={i} value={item.band.toLowerCase()} onClick={(e) => {
                                        console.log(e.target.value);
                                    }} >{item.band}</SlMenuItem>
                                )
                            })}

                        </SlSelect>
                        <SlSelect value={updateGradeList.split(",")} onSlChange={(e) => {
                            setUpdateGradeList(String(e.target.value))
                        }} label='Grade:' style={{ marginBottom: '20px' }} placeholder="Select a few" maxTagsVisible={-1} multiple clearable>
                            {gradeListFull?.map((item,i) => {
                                return (
                                    <SlMenuItem id={i} value={item.grade.toLowerCase()} onClick={(e) => {
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
                        <SlCheckbox className='policy-question-checkbox' checked={updateHaveQuestion} onSlChange={e=>{setUpdateHaveQuestion(e.target.checked)}} >Require Questions?</SlCheckbox>
                <input type="file" id="myfile" name="myfile" accept='application/pdf' onChange={e => { setUpdateFile(e.target.files) }} />
               
                {updateHaveQuestion?<SlButton size='large' className='policy-button' slot="footer" variant="primary" style={{marginRight:'20px'}} onClick={() => {
                    setUpdateQuestionDialog(true);
                }}>
                    Add Question
                </SlButton>:""}
                <SlButton size='large' className='policy-button' slot="footer" variant="success" onClick={() => {
                    setUpdatePolicy(false);
                    updatePolicyFinal();
                }}>
                    Update
                </SlButton>
            </SlDialog>
            {/* Delete Dialog */}
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
            {/* Add Question Dialog */}
            <SlDialog className='add-question-dialog' label="Questionnaire" style={{'--width': '40vw'}} open={addQuestionDialog} onSlRequestClose={() => setAddQuestionDialog(false)}>
            <div className='policy-question-tag-main'>
                {newQuestions.map((item,i)=>{
                    return(
                            <SlTag size="large" id={`a${i}`} variant={newQuestionTag == i ? "primary" : "neutral"} removable onSlRemove={e=>{removeNewQuestion(i)}} onClick={e=>{setNewQuestionTag(i); console.log(i); console.log(newQuestions[i]);}}>{`Question ${i+1}`}</SlTag>
                    )
                })}
            </div>
            <div className='question-add-input-container'>
            <SlInput className='question-add-input' label="Question" value={newQuestions[newQuestionTag].question} onSlInput={e=>{
                setNewQuestions(current =>
                    current.map((obj, i) => {
                      if (i === newQuestionTag) {
                        return {...obj, question: e.target.value};
                      }
              
                      return obj;
                    }),
                  );
            }}/>
            <SlInput className='question-add-input' label="Option 1" value={newQuestions[newQuestionTag].option1} onSlInput={e=>{
                setNewQuestions(current =>
                    current.map((obj, i) => {
                      if (i === newQuestionTag) {
                        return {...obj, option1: e.target.value};
                      }
                      return obj;
                    }),
                  );
            }}/>
            <SlInput className='question-add-input' label="Option 2" value={newQuestions[newQuestionTag].option2} onSlInput={e=>{
                setNewQuestions(current =>
                    current.map((obj, i) => {
                      if (i === newQuestionTag) {
                        return {...obj, option2: e.target.value};
                      }
                      return obj;
                    }),
                  );
            }}/>
            <SlInput className='question-add-input' label="Option 3" value={newQuestions[newQuestionTag].option3} onSlInput={e=>{
                setNewQuestions(current =>
                    current.map((obj, i) => {
                      if (i === newQuestionTag) {
                        return {...obj, option3: e.target.value};
                      }
                      return obj;
                    }),
                  );
            }}/>
            <SlInput className='question-add-input' label="Option 4" value={newQuestions[newQuestionTag].option4} onSlInput={e=>{
                setNewQuestions(current =>
                    current.map((obj, i) => {
                      if (i === newQuestionTag) {
                        return {...obj, option4: e.target.value};
                      }
                      return obj;
                    }),
                  );
            }}/>
            {newQuestions[newQuestionTag].option4 && newQuestions[newQuestionTag].option3 && newQuestions[newQuestionTag].option2 && newQuestions[newQuestionTag].option1 ?
            <SlSelect className='question-add-input' value={newQuestions[newQuestionTag].answer} label="Answer" onSlChange={e=>{
                console.log(e.target.value);
                setNewQuestions(current =>
                    current.map((obj, i) => {
                      if (i === newQuestionTag) {
                        return {...obj, answer: e.target.value};
                      }
                      return obj;
                    }),
                  );
            }}>
                <SlMenuItem value={newQuestions[newQuestionTag]?.option1}>{newQuestions[newQuestionTag].option1}</SlMenuItem>
                <SlMenuItem value={newQuestions[newQuestionTag]?.option2}>{newQuestions[newQuestionTag].option2}</SlMenuItem>
                <SlMenuItem value={newQuestions[newQuestionTag]?.option3}>{newQuestions[newQuestionTag].option3}</SlMenuItem>
                <SlMenuItem value={newQuestions[newQuestionTag]?.option4}>{newQuestions[newQuestionTag].option4}</SlMenuItem>
            </SlSelect>
           : "" }
            </div>
                <SlButton size='large' className='policy-button' variant="primary" style={{marginRight:'20px'}} slot="footer"  onClick={() => {
                    setNewQuestions([...newQuestions, {
                        question:"",
                        option1:"",
                        option2:"",
                        option3:"",
                        option4:"",
                        answer:"",
                    }])
                    setNewQuestionTag(newQuestions.length);
                }}>
                    ADD More
                </SlButton>
                <SlButton size='large' className='policy-button' slot="footer" variant="success" onClick={() => {
                    setAddQuestionDialog(false)
                    console.log(newQuestions);
                }}>
                    Done
                </SlButton>
            </SlDialog>
            {/* Policy Question on Acceptance Dialog */}
            <SlDialog className='policy-quiz-dialog' label="Questionnaire" style={{'--width': '40vw'}} open={policyQuizDialog} onSlRequestClose={() => setPolicyQuizDialog(false)}>
                <div className='policy-question-tag-main'>
                    {policyQuizQuestions.map((item,i)=>{
                        return(
                                <SlTag size="large" id={i} variant={questionForReview == i ? "primary" : "neutral"} onClick={e=>{setQuestionForReview(i)}}>{`Question ${i+1}`}</SlTag>
                        )
                    })}
                </div>
                <p style={{marginTop:"20px"}}>{policyQuizQuestions[questionForReview].question}</p>
                <SlRadioGroup label="Select an option" name="a" value={policyQuizQuestions[questionForReview].answer} fieldset onSlChange={e=>{
                    setPolicyQuizQuestions(current =>
                        current.map((obj, i) => {
                          if (i === questionForReview) {
                            return {...obj, answer: e.target.value};
                          }
                          return obj;
                        }),
                      );
                }}>
                    <SlRadio value={policyQuizQuestions[questionForReview].option1}>{policyQuizQuestions[questionForReview].option1}</SlRadio>
                    <SlRadio value={policyQuizQuestions[questionForReview].option2}>{policyQuizQuestions[questionForReview].option2}</SlRadio>
                    <SlRadio value={policyQuizQuestions[questionForReview].option3}>{policyQuizQuestions[questionForReview].option3}</SlRadio>
                    <SlRadio value={policyQuizQuestions[questionForReview].option4}>{policyQuizQuestions[questionForReview].option4}</SlRadio>
                </SlRadioGroup>
                    <SlButton size='large' className='policy-button' disabled={!(questionForReview>0)} variant="neutral" style={{marginRight:'20px'}} slot="footer"  onClick={() => {
                        setQuestionForReview(questionForReview-1);
                    }}>
                        Previous
                    </SlButton>
                    <SlButton size='large' className='policy-button' disabled={!(questionForReview < policyQuizQuestions.length-1)} variant="primary" style={{marginRight:'20px'}} slot="footer"  onClick={() => {
                        setQuestionForReview(questionForReview+1);
                    }}>
                        Next
                    </SlButton>
                    <SlButton size='large' className='policy-button' disabled={!(questionForReview >= policyQuizQuestions.length-1)} slot="footer" variant="success" onClick={() => {
                        console.log(policyQuizQuestions);
                        acceptPolicyWithQuestion();
                    }}>
                        Submit
                    </SlButton>
            </SlDialog>
            {/* Update Policy Question Dailog */}
            <SlDialog className='add-question-dialog' label="Questionnaire" style={{'--width': '40vw'}} open={updateQuestionDialog} onSlRequestClose={() => setUpdateQuestionDialog(false)}>
            <div className='policy-question-tag-main'>
                {updateQuestions.map((item,i)=>{
                    return(
                            <SlTag size="large" id={i} variant={updateQuestionTag == i ? "primary" : "neutral"} removable onSlRemove={e=>{removeUpdateQuestion(i)}} onClick={e=>{setUpdateQuestionTag(i);}}>{`Question ${i+1}`}</SlTag>
                    )
                })}
            </div>
            <div className='question-add-input-container'>
            <SlInput className='question-add-input' label="Question" value={updateQuestions[updateQuestionTag].question} onSlInput={e=>{
                setUpdateQuestions(current =>
                    current.map((obj, i) => {
                      if (i === updateQuestionTag) {
                        return {...obj, question: e.target.value};
                      }
              
                      return obj;
                    }),
                  );
            }}/>
            <SlInput className='question-add-input' label="Option 1" value={updateQuestions[updateQuestionTag].option1} onSlInput={e=>{
                setUpdateQuestions(current =>
                    current.map((obj, i) => {
                      if (i === updateQuestionTag) {
                        return {...obj, option1: e.target.value};
                      }
                      return obj;
                    }),
                  );
            }}/>
            <SlInput className='question-add-input' label="Option 2" value={updateQuestions[updateQuestionTag].option2} onSlInput={e=>{
                setUpdateQuestions(current =>
                    current.map((obj, i) => {
                      if (i === updateQuestionTag) {
                        return {...obj, option2: e.target.value};
                      }
                      return obj;
                    }),
                  );
            }}/>
            <SlInput className='question-add-input' label="Option 3" value={updateQuestions[updateQuestionTag].option3} onSlInput={e=>{
                setUpdateQuestions(current =>
                    current.map((obj, i) => {
                      if (i === updateQuestionTag) {
                        return {...obj, option3: e.target.value};
                      }
                      return obj;
                    }),
                  );
            }}/>
            <SlInput className='question-add-input' label="Option 4" value={updateQuestions[updateQuestionTag].option4} onSlInput={e=>{
                setUpdateQuestions(current =>
                    current.map((obj, i) => {
                      if (i === updateQuestionTag) {
                        return {...obj, option4: e.target.value};
                      }
                      return obj;
                    }),
                  );
            }}/>
            {updateQuestions[updateQuestionTag].option4 && updateQuestions[updateQuestionTag].option3 && updateQuestions[updateQuestionTag].option2 && updateQuestions[updateQuestionTag].option1 ?
            <SlSelect className='question-add-input' value={updateQuestions[updateQuestionTag]?.answer} label="Answer" onSlChange={e=>{
                console.log(e.target.value);
                setUpdateQuestions(current =>
                    current.map((obj, i) => {
                      if (i === updateQuestionTag) {
                        return {...obj, answer: e.target.value};
                      }
                      return obj;
                    }),
                  );
            }}>
                
                <SlMenuItem value={updateQuestions[updateQuestionTag]?.option1}>{updateQuestions[updateQuestionTag].option1}</SlMenuItem>
                <SlMenuItem value={updateQuestions[updateQuestionTag]?.option2}>{updateQuestions[updateQuestionTag].option2}</SlMenuItem>
                <SlMenuItem value={updateQuestions[updateQuestionTag]?.option3}>{updateQuestions[updateQuestionTag].option3}</SlMenuItem>
                <SlMenuItem value={updateQuestions[updateQuestionTag]?.option4}>{updateQuestions[updateQuestionTag].option4}</SlMenuItem>
            </SlSelect>
           : "" }
            </div>
                <SlButton size='large' className='policy-button' variant="primary" style={{marginRight:'20px'}} slot="footer"  onClick={() => {
                    setUpdateQuestions([...updateQuestions, {
                        question:"",
                        option1:"",
                        option2:"",
                        option3:"",
                        option4:"",
                        answer:"",
                    }])
                    setUpdateQuestionTag(updateQuestions.length);
                }}>
                    ADD More
                </SlButton>
                <SlButton size='large' className='policy-button' slot="footer" variant="success" onClick={() => {
                    //setAddQuestionDialog(false)
                    setUpdateQuestionDialog(false)
                    console.log(updateQuestions);
                }}>
                    Done
                </SlButton>
            </SlDialog>
        </div>
    )
}

export default Policy