import React from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

function ResetPassword() {

    let navigate = useNavigate();
    let location = useLocation();

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        data.username = location.state.username;
        console.log(data);

        axios({
            method: "post",
            url: "http://192.168.1.7:8080/v1/api/mhere/reset-password",
            headers: {
                "Content-Type": "application/json",
            },
            data,
        })
            .then(function (response) {
                console.log(response);
                
            })
            .catch(function (err) {
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
                        <h1>Reset Password</h1>


                        <form className="flex-c" onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-box">
                                <span className="label">Password</span>
                                <div className="flex-r input">
                                    <input type="password" placeholder="8+ (a, A, 1, #)" {...register("new_password", {
                                        required: true,
                                        maxLength: 15,
                                    })} />
                                    <i className="fas fa-lock"></i>
                                </div>
                            </div>

                            <div className="input-box">
                                <span className="label">Confirm Password</span>
                                <div className="flex-r input">
                                    <input type="password" placeholder="8+ (a, A, 1, #)"
                                        {...register("confirm_new_password", {
                                            required: true,
                                            maxLength: 15,
                                        })} />
                                    <i className="fas fa-lock"></i>
                                </div>
                            </div>



                            <button className="btn"type="submit">Log In</button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword