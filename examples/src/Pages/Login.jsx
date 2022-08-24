import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import axios from 'axios';
import logo from '../assets/logo.png'

const LoginForm = () => {


    let navigate = useNavigate();
    const [error, setError] = useState()
    const {register,handleSubmit,formState: { errors },} = useForm();

const onSubmit = (data) => {
  console.log(data);
    axios({
      method:"post",
      url:"http://192.168.1.7:8080/v1/api/mhere/login",
      headers:{
        "Content-Type": "application/json",
      },
			data,
    })
    .then(function(response){
      console.log(response);
      navigate("/chart")
    })
    .catch(function(err){
      console.log(err);
      setError(err.response.data)
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
                        <h1>Log In</h1>
                        <p style={{color:"red"}}> {error}</p>

                        <form className="flex-c" onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-box">
                                <span className="label">UserName</span>
                                <div className=" flex-r input">
                                    <input type="text" placeholder="name@abc.com" {...register("username", {
          required: "required",
        })} />
                                    <i className="fas fa-at"></i>
                                </div>
                            </div>

                            <div className="input-box">
                                <span className="label">Password</span>
                                <div className="flex-r input">
                                    <input type="password" placeholder="8+ (a, A, 1, #)"
                                    {...register("password", {
                                        required: true,
                                        maxLength: 15,
                                      })} />
                                    <i className="fas fa-lock"></i>
                                </div>
                            </div>

                            <div className="check">
                                
                                <a style={{color:"red",fontSize:"14px"}} href="/forget-password">Forget Password?</a>
                            </div>

                            <button className="btn"  type="submit">Log In</button>
                            {/* <span className="extra-line">
                                <span>Already have an account?</span>
                                <a href="#">Sign In</a>
                            </span> */}
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;