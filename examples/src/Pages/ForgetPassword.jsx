import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import logo from '../assets/logo.png'

function ForgetPassword() {

    let navigate = useNavigate();
    const {register,handleSubmit,formState: { errors },} = useForm();

    const onSubmit = (data) => {
      console.log(data);
        axios({
          method:"post",
          url:"http://192.168.1.7:8080/v1/api/mhere/send-otp",
          headers:{
            "Content-Type": "application/json",
          },
          data,
        })
        .then(function(response){
          console.log(response);
          navigate("/otp", {state:{username:data.username}})
        })
        .catch(function(err){
          console.log(err);
        })
      };
    

  return (
    <div>
        <div className=" flex-r container">
                <div className="flex-r login-wrapper">
                    <div className="login-text">
                        <div className="logo">
                            <span><i className="fab fa-speakap"></i></span>
                            <img src={logo}  height="80px" width="200px" alt="" />

                        </div>
                        <h1>Forgot Password?</h1>
                        

                        <form className="flex-c" onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="input-box">
                                <span className="label">Enter Username</span>
                                <div className=" flex-r input">
                                    <input type="text" placeholder="name@abc.com"
                                     {...register("username", {
                                        required: "required",
                                      })} />
                                    <i className="fas fa-at"></i>
                                </div>
                            </div>


                           
                            

                            <button className="btn" type="submit">Request Otp</button>
                           
                        </form>

                    </div>
                </div>
            </div>
    </div>
  )
}

export default ForgetPassword