import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import axios from 'axios';

const LoginForm = () => {


    let navigate = useNavigate();

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
    })
  };

    return (
        <div>
            <div className=" flex-r container">
                <div className="flex-r login-wrapper">
                    <div className="login-text">
                        <div className="logo">
                            <span><i className="fab fa-speakap"></i></span>
                            <span>Microtek</span>
                        </div>
                        <h1>Log In</h1>
                        <p>Lorem Ipsum is simply dummy text of the </p>

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
                                <input type="checkbox" name="" id="" />
                                <span>Remember Me</span>
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