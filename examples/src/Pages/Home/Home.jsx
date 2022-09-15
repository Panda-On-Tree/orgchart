import React from 'react'
import self from "../assets/self_service.svg"
import './Home.css'
import MChart from '../MChart'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Footer from './Footer'

function Home() {
  let navigate = useNavigate()
  return (
    <div>
      <section class="hero-wrap style1">
                <div class="hero-slider-one">
                    <div class="hero-slide-item">
                        <div class="container">
                            <div class="row align-items-center gx-5">
                                <div class="col-xl-5 col-lg-6">
                                    <div class="hero-content">
                                        <h1 style={{minWidth:"37vw"}}>Welcome to Microtek Employee Self Service </h1>
                                        <div class="hero-btn">
                                            <a onClick={(e)=>{
                                              e.preventDefault();
                                              navigate('/aboutus')
                                            }} class="btn">Read More</a>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-7 col-lg-6">
                                    <div class="hero-img-wrap">
                                        <img class="hero-img" src={self} alt="Image"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
    <section class="product">
    <div>
    <div class="content-title ptb-30 text-center">
        <h2>Useful Links</h2>
    </div>
    <div style={{marginBottom:"20px"}} class="product-section">
    <ul class="row ps-list">
        <li class="col-lg-4 col-md-3 col-sm-12">
            <div class="ps-list-content">
                <a target="_blank" href="https://microtek.tech/itop">
                    <span class="icon-patient-monitor"></span>
                    <h4>CMDB Tool</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p> 
                </a>
            </div> 
        </li>
        <li class="col-lg-4 col-md-3 col-sm-12">
            <div class="ps-list-content">
                <a target="_blank" href="https://microtek.tech/Self-Declaration/login.php">
                    <span class="icon-ecg-icon"></span>
                    <h4>Self Declaration</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p> 
                </a>
            </div>
        </li>
        <li class="col-lg-4 col-md-3 col-sm-12">
            <div class="ps-list-content">
                <a target="_blank" href="https://microtek.tech/capex/login.php">
                    <span class="icon-video-laryngoscope"></span>
                    <h4>Capex</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p> 
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
