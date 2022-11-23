import React from 'react'
import { useState } from 'react'
import { baseurl } from '../../api/apiConfig';
import './Login2.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import microtek from '../assets/microtek.svg'
import microtek2 from '../assets/microtek2.png';
import { toast } from 'react-toastify';

function Login2() {

    let navigate = useNavigate()
    
    const [loginData, setLoginData] = useState({
        username:"",
        password:""
    })

   

    const submitLogin = () => {
        const data = loginData
        axios({
          method: 'post',
          url: `${baseurl.base_url}/mhere/login`,
          headers: {
            'Content-Type': 'application/json',
          },
          data,
        })
          .then(function (response) {
            console.log(response)
            localStorage.setItem('employee_id', response.data.new_e_code)
            localStorage.setItem('manager_id', response.data.reporting_manager_id)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('fullname', response.data.name_of_the_employee)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('grade', response.data.grade)
            localStorage.setItem('band', response.data.band)
            localStorage.setItem('role', response.data.role)
            localStorage.setItem('department', response.data.department)
            const data = {
              employee_id: response.data.new_e_code
            }
            axios({
              method:"post",
              url:`${baseurl.base_url}/mhere/get-employee-module-access`,
              headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              },
              data
            })
            .then((res)=>{
              console.log(res);
              localStorage.setItem('module_access', JSON.stringify(res.data.data))
            })
            .catch((err)=>{
                document.getElementById("login-button").disabled = true
              console.log(err);
            })
            if(response.data.is_first_login){
              const data ={
                  username: response.data.new_e_code
              }
    
              axios({
                method:"post",
                url:`${baseurl.base_url}/mhere/send-otp`,
                headers:{
                  "Content-Type": "application/json",
                },
                data,
              })
              .then(function(response){
                if(!response.data.otp_sent){
                  toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    });
                    return;
                }
                toast.success(response.data.message, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: undefined,
                  theme: "colored",
                  });
                navigate("/otp", {state:{username:data.username}})
              })
              .catch(function(err){
                document.getElementById("login-button").disabled = true
                console.log(err);
              })
              return
            }
            toast.success('Login successful', {
              position: "top-right",
              autoClose: 500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
              onClose: ()=>{
                navigate('/home')
                window.location.reload()
              }
              });
         //   navigate('/home')
           // window.location.reload()
          })
          .catch(function (err) {
            console.log(err)
            document.getElementById("login-button").disabled = false
            if(err.response.data)
              {/* setError(err.response.data.message) */
                toast.error(err.response.data.message, {
                  position: "top-right",
                  autoClose: 2000,
        
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: undefined,
                  theme: "colored",
                  
                  });
              }
              else{
                //setError("Something Went wrong, Please try again after sometime")
                toast.error('Something Went wrong, Please try again after sometime', {
                  position: "top-right",
                  autoClose: 2000,
        
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: undefined,
                  theme: "colored",
                  
                  });
              }
          })
      }


  return (
    <div className='logi-main'>
        <div className='logi-main-left'>
            <div className='logi-main-left-container'>
              <form className='logi-main-left-inner'>
              
                <div className='logi-main-left-header'>
                        <h3>Welcome Back !</h3>
                        <p> Please enter your details</p>
                    </div>
                    <div className='logi-input-main'>
                        <div className='logi-input-inner'>
                            <label htmlFor="emp">Employee Id</label>
                            <input id='emp' placeholder='Enter Your Employee Code' onChange={(e)=>{
                                setLoginData({...loginData,username:e.target.value})
                               
                            }}  type="text" />
                        </div>
                        <div className='logi-input-inner'>
                            <label htmlFor="password">Password</label>
                            <input id='password' type="password" placeholder='Enter Password' onChange={(e)=>{
                                setLoginData({...loginData,password:e.target.value})
                               
                            }}  />
                        </div>
                        <div className='logi-forget-link'>
                            <a   href="/ess/forget-password">Forgot Password?</a>
                        </div>
                    </div>
                    <div className='logi-buttons-main'>
                        <button type='submit' id='login-button'  onClick={(e)=>{
                            console.log("submit");
                            document.getElementById("login-button").disabled = true
                            e.preventDefault()
                            submitLogin()
                        }}>Login</button>
                    </div>
               
              </form>
            </div>
        </div>
        <div className='logi-main-right'>
            <div className='logi-main-right-inner'>
              {/*  <img src={microtek2} alt="" /> */}
            </div>
                        
        </div>
    </div>
  )
}

export default Login2