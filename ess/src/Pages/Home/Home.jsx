import React, { useEffect, useState } from 'react'
import self from "../assets/self_service.svg"
//import './Home.css'
import MChart from '../MChart'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { baseurl } from '../../api/apiConfig'

function Home() {
  let navigate = useNavigate()

    const [policyBanner, setPolicyBanner] = useState([])
    useEffect(()=>{
        getPolicyBanner()
    },[])


    function getPolicyBanner() {

        const data = {
            "access_to": localStorage.getItem("department")
        }

        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-policy-banner`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res.data);
                setPolicyBanner(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }


  return (
    <div>
        <div>
            <marquee behavior="sliding" direction="left" onClick={()=>{
                navigate("/policy")
            }}><div style={{display:'inline-flex'}}>
            <p>Few new policies has been added for your department ! &#160;</p> {
                policyBanner?.map((item, i)=>{
                    var str  = ` ${i+1}. ${item.title}(${item.department}) `
                    return (
                        <p style={{color:'red'}} className='marque-text'>{str}&#160;</p>
                    )
                })
            }</div></marquee>
        </div>
     {/*  <section class="hero-wrap style1">
                <div class="hero-slider-one">
                    <div class="hero-slide-item">
                        <div class="container">
                            <div class="row align-items-center gx-5">
                                <div class="col-xl-5 col-lg-6 set-width ">
                                    <div class="hero-content">
                                        <h1 style={{minWidth:"37vw"}}>Welcome to Microtek Employee Self Service </h1>
                                        <div class="hero-btn">
                                            <a onClick={(e)=>{
                                              e.preventDefault();
                                              navigate('/aboutus')
                                            }} class="btn read-more-button">Read More</a>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-7 col-lg-6 set-width">
                                    <div class="hero-img-wrap">
                                        <img class="hero-img" src={self} alt="Image"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section> */}
    <section class="product" >
    <div >
    <div class="content-title ptb-30 text-center">
        <h2>Useful Links</h2>
    </div>
    <div style={{marginBottom:"20px"}} class="product-section">
    <ul class="row ps-list">
        <li class="col-lg-4 col-md-3 col-sm-12">
            <div class="ps-list-content">
                <a target="_blank" href="https://internal.microtek.tech/itop">
                <span class="material-symbols-outlined">
                    database
                    </span>
                    <h4>CMDB Tool</h4>
                    <p>IT Management Tool For Incident , change , Asset , Problem Management within the Organisation</p> 
                </a>
            </div> 
        </li>
        <li class="col-lg-4 col-md-3 col-sm-12">
            <div class="ps-list-content">
                <a target="_blank" href="https://internal.microtek.tech/Self-Declaration/login.php">
                <span class="material-symbols-outlined">
app_registration
</span>
                    <h4>Self Declaration</h4>
                    <p>Tool for declaring assets onwned by employee </p> 
                </a>
            </div>
        </li>
        <li class="col-lg-4 col-md-3 col-sm-12">
            <div class="ps-list-content">
                <a target="_blank" href="https://internal.microtek.tech/capex/login.php">
                <span class="material-symbols-outlined">
description
</span>
                    <h4>Capex</h4>
                    <p>Tool to raise and approve a capEx</p> 
                </a>
            </div>
        </li>
        <li class="col-lg-4 col-md-3 col-sm-12">
            <div class="ps-list-content">
                <a target="_blank" href="https://microtek.peoplestrong.com/altLogin.jsf">
                <span class="material-symbols-outlined">
description
</span>
                    <h4>People Strong Microtek</h4>
                    <p>HRMS tool to ease the manual process for employees</p> 
                </a>
            </div>
        </li>
        <li class="col-lg-4 col-md-3 col-sm-12">
            <div class="ps-list-content">
                <a target="_blank" href="https://microtek.eisenvault.net/">
                <span class="material-symbols-outlined">
description
</span>
                    <h4>Eisen Vault</h4>
                    <p>Document Management System with security</p> 
                </a>
            </div>
        </li>
        <li class="col-lg-4 col-md-3 col-sm-12">
            <div class="ps-list-content">
                <a target="_blank" onClick={e =>{
                    e.preventDefault();
                    navigate('/chart');
                }}>
                <span class="material-symbols-outlined">
description
</span>
                    <h4>Org Chart</h4>
                    <p>Representation of Employee Hierarchy within the Organisation</p> 
                </a>
            </div>
        </li>
        
        
    </ul>
    </div>
    
</div>
 </section>
 <Footer/>
 </div>
  )
}

export default Home
