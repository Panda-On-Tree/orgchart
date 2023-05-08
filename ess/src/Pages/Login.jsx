import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import logo from '../assets/logo.png'
import { baseurl } from '../api/apiConfig'
import apk from "./assets/mLogin.apk"
import { toast } from 'react-toastify';
const LoginForm = () => {
  let navigate = useNavigate()
  const [error, setError] = useState()
  const {
    register,
    handleSubmit,
   
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
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
        if(err.response.data)
          {setError(err.response.data.message)
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
    <div>
      <div className=" flex-r containers">
        <div className="flex-r login-wrapper">
          <div className="login-text">
            <div className="logo">
              <img src={logo} height="80px" width="200px" alt="" />
            </div>
            <h1>Log In</h1>
            <p style={{ color: 'red' }}> {error}</p>

            <form className="flex-c" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-box">
                <span className="label">UserName</span>
                <div className=" flex-r input">
                  <input
                    type="text"
                    placeholder="name@abc.com"
                    {...register('username', {
                      required: 'required',
                    })}
                  />
                  <i className="fas fa-at"></i>
                </div>
              </div>

              <div className="input-box">
                <span className="label">Password</span>
                <div className="flex-r input">
                  <input
                    type="password"
                    placeholder="8+ (a, A, 1, #)"
                    {...register('password', {
                      required: true,
                      maxLength: 15,
                    })}
                  />
                  <i className="fas fa-lock"></i>
                </div>
              </div>

              <div className="check">
                <a
                  style={{ color: 'red', fontSize: '14px', marginBottom:'10px' }}
                  href="/ess/forget-password"
                >
                  Forget Password?
                </a>
              </div>

              <button
                className="btns"
                style={{ padding: '10px 20px', marginTop:'10px' }}
                type="submit"
              >
                Log In
              </button>
              {/* <span className="extra-line">
                                <span>Already have an account?</span>
                                <a href="#">Sign In</a>
                            </span> */}
            <a href={apk} className='login-download-app' download="mLogin"><u>Download MLogin app</u></a>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
