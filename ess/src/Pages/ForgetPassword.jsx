import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import logo from '../assets/logo.png'
import { baseurl } from '../api/apiConfig'
import { toast } from 'react-toastify'

function ForgetPassword() {
  let navigate = useNavigate()
  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    axios({
      method: 'post',
      url: `${baseurl.base_url}/mhere/send-otp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })
      .then(function (response) {
        console.log(response)
        if(!response.data.otp_sent){
          toast.error(response.data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'colored',
          });
          return;
        }
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        })
        navigate('/otp', { state: { username: data.username } })
        //window.alert(response.data.otp);
        //  navigate("/otp", {state:{username:data.username}})
      })
      .catch(function (err) {
        console.log(err)
        toast.error('Some error Occured', {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'colored',
          })
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
            <h1>Forgot Password?</h1>

            <form className="flex-c" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-box">
                <span className="label">Enter Username</span>
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

              <button className="btns" type="submit">
                Request Otp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
