import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router';
import logo from '../assets/logo.png'
import { baseurl } from '../api/apiConfig'


import axios from 'axios';
function Otp() {

    let navigate = useNavigate();
  let location = useLocation();

    const {register,handleSubmit,formState: { errors },} = useForm();

    const onSubmit = (data) => {
      console.log(data);
  data.username = location.state.username;

        axios({
          method:"post",
          url:`${baseurl.base_url}/mhere/verify-otp`,
          headers:{
            "Content-Type": "application/json",
          },
          data,
        })
        .then(function(response){
          console.log(response);
      navigate("/reset-password", {state:{username:data.username}})

        })
        .catch(function(err){
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
                        <h1>Forgot Password?</h1>
                        

                        <form className="flex-c" onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="input-box">
                                <span className="label" >Enter Your Otp</span>
                                <div style={{marginTop:"20px"}} className=" flex-r input">
                                    <input type="number" placeholder="name@abc.com"
                                     {...register("otp", {
                                        required: "required",
                                      })} />
                                    <i className="fas fa-at"></i>
                                </div>
                            </div>


                           
                            

                            <button className="btns" type="submit">Verify</button>
                           
                        </form>

                    </div>
                </div>
            </div>
    </div>
  )
}

export default Otp