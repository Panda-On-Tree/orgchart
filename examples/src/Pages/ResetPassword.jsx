import React from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import logo from '../assets/logo.png'
import { baseurl } from '../api/apiConfig'

function ResetPassword() {

    let navigate = useNavigate();
    let location = useLocation();

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        data.username = location.state.username;
        console.log(data);

        axios({
            method: "post",
            url: `${baseurl.base_url}/mhere/reset-password`,
            headers: {
                "Content-Type": "application/json",
            },
            data,
        })
            .then(function (response) {
                console.log(response);
                navigate("/login")
                
            })
            .catch(function (err) {
                console.log(err);
            })
    };
    return (
        <div>
            <div className=" flex-r containers">
                <div className="flex-r login-wrapper">
                    <div className="login-text">
                        <div className="logo">
                            <img src={logo}  height="80px" width="200px" alt="" />

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



                            <button className="btns" type="submit">Update Password</button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword