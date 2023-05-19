import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'
import logo from '../assets/logo.png'
import { baseurl, selfServiceurl } from '../api/apiConfig'
import { toast } from 'react-toastify'
import {
    SlButton,
    SlDialog,
    SlInput,
    SlMenu,
    SlMenuItem,
} from '@shoelace-style/shoelace/dist/react'
import axios from 'axios'
function Otp() {
    let navigate = useNavigate()
    let location = useLocation()
    const [disableButton, setDisableButton] = useState(false)
    const [open, setOpen] = useState(false)
    const { register, handleSubmit } = useForm()
    const [username, setUsername] = useState('')
    const onSubmit = (data) => {
        console.log(data)
        data.username = location.state.username

        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/verify-otp`,
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        })
            .then(function (response) {
                console.log(response)
                toast.success('Otp verified', {
                    position: 'top-right',
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored',
                    onClose: () => {},
                })
                setUsername(data.username)
                setOpen(true)
            })
            .catch(function (err) {
                toast.error('Wrong Otp', {
                    position: 'top-right',
                    autoClose: 1200,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored',
                    onClose: () => {},
                })
                console.log(err)
            })
    }

    function sendEmailReset() {
        setDisableButton(true)
        axios({
            method: 'post',
            url: `${selfServiceurl.base_url}/mail/change-mail-password`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                employee_id: username,
            },
        })
            .then((res) => {
                console.log(res.data)
                toast.success(res.data.message,{
                  position: 'top-right',
                  autoClose: 1200,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: undefined,
                  theme: 'colored',
                })
                setDisableButton(false);
                setOpen(false)
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.message,{
                  position: 'top-right',
                  autoClose: 1200,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: undefined,
                  theme: 'colored',
                })
                setDisableButton(false)
            })
    }

    return (
        <div>
            <div className=" flex-r containers">
                <div className="flex-r login-wrapper">
                    <div className="login-text">
                        <div className="logo">
                            <img
                                src={logo}
                                height="80px"
                                width="200px"
                                alt=""
                            />
                        </div>
                        <h1>Forgot Password?</h1>

                        <form
                            className="flex-c"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="input-box">
                                <span className="label">Enter Your Otp</span>
                                <div
                                    style={{ marginTop: '20px' }}
                                    className=" flex-r input"
                                >
                                    <input
                                        type="number"
                                        placeholder=""
                                        {...register('otp', {
                                            required: 'required',
                                        })}
                                    />
                                    <i className="fas fa-at"></i>
                                </div>
                            </div>

                            <button className="btns" type="submit">
                                Verify
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <SlDialog
                label="Reset Password"
                open={open}
                onSlAfterHide={() => setOpen(false)}
            >
                <SlButton
                disabled={disableButton}
                    onClick={() => {
                      setOpen(false)
                        navigate('/reset-password', {
                            state: { username: username },
                        })
                       
                    }}
                    style={{ width: '100%', marginBottom: '20px' }}
                >
                    Forgot Password for ESS?
                </SlButton>
                <SlButton
                disabled={disableButton}
                    onClick={sendEmailReset}
                    style={{ width: '100%', marginBottom: '20px' }}
                >
                    Reset Password for Internal E-mail ID
                </SlButton>
            </SlDialog>
        </div>
    )
}

export default Otp
