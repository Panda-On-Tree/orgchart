import { SlButton, SlCheckbox, SlRadio } from '@shoelace-style/shoelace/dist/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseurl } from '../../api/apiConfig';
import './Ceam.css'
import { useNavigate } from 'react-router-dom';

function Ceam() {

    const [team, setTeam] = useState()

 
    let navigate = useNavigate();

    useEffect(()=>{
        getTeam()
    },[])


    function getTeam() {

        const data = {
            "parent_employee_id": localStorage.getItem("employee_id")
        }

        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/all-team-attendence`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res.data.result);
                setTeam(res.data.result)
            })
            .catch((err) => {
                console.log(err);
            })

    }


  return (
    <div className='ceam-main'>
        <div className='ceam-inner'>
            <div className='ceam-inner-record'><h4>Resource Name</h4><h4>Shift</h4></div>
            {team?.map((item,i)=>{
                return(
            <div className='ceam-inner-record' key={i}><h5>{item?.name}({item.employee_id})</h5><SlCheckbox></SlCheckbox></div>
                )
            })}
            <div className='ceam-inner-record'><h5>Aniket</h5><SlCheckbox></SlCheckbox></div>
        </div>
        <div>
            <SlButton onclick={()=>{
                navigate("/ceam-roster")
            }} className='ceam-main-proceed-button' variant='primary' >Proceed</SlButton>
        </div>
    </div>
  )
}

export default Ceam