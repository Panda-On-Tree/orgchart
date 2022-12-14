import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import $ from 'jquery'
import { baseurl } from '../../api/apiConfig'
import {
    SlButton,
    SlCheckbox,
    SlDialog,
    SlRadio,
    SlRadioGroup,
    SlTag,
} from '@shoelace-style/shoelace/dist/react'

function Home() {
    let navigate = useNavigate()

    const [policyBanner, setPolicyBanner] = useState([])
    const [policyBannerAcceptance, setPolicyBannerAcceptance] = useState()
    const [PolicyDialog, setPolicyDialog] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [policyQuizQuestions, setPolicyQuizQuestions] = useState([
        {
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
        },
    ])
    const [policyQuizDialog, setPolicyQuizDialog] = useState(false)
    const [questionForReview, setQuestionForReview] = useState(0)
    useEffect(() => {
        setTimeout(function () {
            // allowing 3 secs to fade out loader
            $('.page-loader').fadeOut('slow')
        }, 2000)
        getPolicyBanner()
        getPolicyDailog()
        console.log(localStorage.getItem("module_access"));
        console.log(JSON.parse(localStorage.getItem("module_access")));
    }, [])

    function getPolicyBanner() {
        const data = {
            access_to: localStorage.getItem('department'),
            access_to_band: localStorage.getItem('band'),
            access_to_grade: localStorage.getItem('grade'),
        }

        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-policy-banner`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data,
        })
            .then((res) => {
                console.log(res.data)
                setPolicyBanner(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function getPolicyDailog() {
        const data = {
            employee_id: localStorage.getItem('employee_id'),
            access_to: localStorage.getItem('department'),
            access_to_band: localStorage.getItem('band'),
            access_to_grade: localStorage.getItem('grade'),
        }
        console.log(data)
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-policy-accept-banner`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data,
        })
            .then((res) => {
                console.log(res.data)
                if (res.data.all_accepted) {
                    setPolicyDialog(false)
                    return
                }
                var item = res.data.data
                const linkSource = `data:application/pdf;base64,${item.file}`

                fetch(linkSource)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], item.title, {
                            type: 'application/pdf',
                        })
                        console.log(file)
                        var objectURL = URL.createObjectURL(file)
                        item.url = objectURL
                        setPolicyBannerAcceptance(item)
                    })
                if (!res.data.all_accepted) {
                    setPolicyDialog(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function acceptPolicy() {
        const data = {
            employee_id: localStorage.getItem('employee_id'),
            policy_id: policyBannerAcceptance.id,
        }
        console.log(data)
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/accept-policy`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data,
        })
            .then((res) => {
                setPolicyBannerAcceptance()
                getPolicyDailog()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function getQuestionsForPolicy(id) {
        const data = {
            policy_id: id,
        }
        console.log(data)
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/policy-question`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data,
        })
            .then((res) => {
                console.log(res.data.data)
                setPolicyQuizQuestions(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function acceptPolicyWithQuestion() {
        const data = {
            employee_id: localStorage.getItem('employee_id'),
            policy_id: policyQuizQuestions[0].policy_id,
            questions: policyQuizQuestions,
        }
        console.log(data)
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/accept-policy-question`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data,
        })
            .then((res) => {
                console.log(res.data)
                alert(res.data.message)
                setPolicyQuizDialog(false)
                getPolicyDailog()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div class="page-loader">
                <div class="spinner"></div>
                <div class="wavy-wraper">
                    <div class="wavy">
                        <span style={{"--i":"1"}}>M</span>
                        <span style={{"--i":"2"}}>i</span>
                        <span style={{"--i":"3"}}>c</span>
                        <span style={{"--i":"4"}}>r</span>
                        <span style={{"--i":"5"}}>o</span>
                        <span style={{"--i":"6"}}>t</span>
                        <span style={{"--i":"7"}}>e</span>
                        <span style={{"--i":"8"}}>k</span>
                        <span style={{"--i":"9"}}>.</span>
                        <span style={{"--i":"10"}}>.</span>
                        <span style={{"--i":"11"}}>.</span>
                    </div>
                </div>
            </div>
            <div>
                <marquee
                    behavior="sliding"
                    direction="left"
                    onClick={() => {
                        navigate('/policy')
                    }}
                >
                    <div style={{ display: 'inline-flex', cursor: 'pointer' }}>
                        <p>
                            Few new policies has been added for your department
                            ! &#160;
                        </p>{' '}
                        {policyBanner?.map((item, i) => {
                            var str = ` ${i + 1}. ${item.title}(${
                                item.department
                            }) `
                            return (
                                <p
                                    style={{ color: 'blue' }}
                                    className="marque-text"
                                >
                                    {str}&#160;
                                </p>
                            )
                        })}
                    </div>
                </marquee>
            </div>

            {/*  <section class="hero-wrap style1">
                <div class="hero-slider-one">
                    <div class="hero-slide-item">
                        <div class="container">
                            <div class="row align-items-center gx-5">
                                <div class="col-xl-5 col-lg-6 set-width ">
                                    <div class="hero-content">
                                        <h1 style={{minWidth:"37vw"}}>Welcome to Microtek Employee Self Service </h1>
                                        <div class="hero-btn">
                                            <a onClick={(e)=>{
                                              e.preventDefault();
                                              navigate('/aboutus')
                                            }} class="btn read-more-button">Read More</a>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-7 col-lg-6 set-width">
                                    <div class="hero-img-wrap">
                                        <img class="hero-img" src={self} alt="Image"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section> */}
            <section class="product">
                <div>
                    <div class="content-title ptb-30 text-center">
                        <h2>Useful Links</h2>
                    </div>
                    <div
                        style={{ marginBottom: '20px' }}
                        class="product-section"
                    >
                        <ul class="row ps-list">
                            <li class="col-lg-4 col-md-3 col-sm-12">
                                <div class="ps-list-content">
                                    <a
                                        target="_blank"
                                        href="https://internal.microtek.tech/itop"
                                        rel="noopener noreferrer"
                                    >
                                        <span class="material-symbols-outlined">
                                            database
                                        </span>
                                        <h4>CMDB Tool</h4>
                                        <p>
                                            IT Management Tool For Incident ,
                                            change , Asset , Problem Management
                                            within the Organisation
                                        </p>
                                    </a>
                                </div>
                            </li>
                            <li class="col-lg-4 col-md-3 col-sm-12">
                                <div class="ps-list-content">
                                    <a
                                        target="_blank"
                                        href="https://internal.microtek.tech/Self-Declaration/login.php"
                                        rel="noopener noreferrer"
                                    >
                                        <span class="material-symbols-outlined">
                                            app_registration
                                        </span>
                                        <h4>Self Declaration</h4>
                                        <p>
                                            Tool for declaring assets onwned by
                                            employee{' '}
                                        </p>
                                    </a>
                                </div>
                            </li>
                            <li class="col-lg-4 col-md-3 col-sm-12">
                                <div class="ps-list-content">
                                    <a
                                        target="_blank"
                                        href="https://internal.microtek.tech/capex/login.php"
                                        rel="noopener noreferrer"
                                    >
                                        <span class="material-symbols-outlined">
                                            description
                                        </span>
                                        <h4>Capex</h4>
                                        <p>Tool to raise and approve a capEx</p>
                                    </a>
                                </div>
                            </li>
                            <li class="col-lg-4 col-md-3 col-sm-12">
                                <div class="ps-list-content">
                                    <a
                                        target="_blank"
                                        href="https://microtek.peoplestrong.com/altLogin.jsf"
                                        rel="noopener noreferrer"
                                    >
                                        <span class="material-symbols-outlined">
                                            description
                                        </span>
                                        <h4>People Strong Microtek</h4>
                                        <p>
                                            HRMS tool to ease the manual process
                                            for employees
                                        </p>
                                    </a>
                                </div>
                            </li>
                            <li class="col-lg-4 col-md-3 col-sm-12">
                                <div class="ps-list-content">
                                    <a
                                        target="_blank"
                                        href="https://microtek.eisenvault.net/"
                                        rel="noopener noreferrer"
                                    >
                                        <span class="material-symbols-outlined">
                                            description
                                        </span>
                                        <h4>Eisen Vault</h4>
                                        <p>
                                            Document Management System with
                                            security
                                        </p>
                                    </a>
                                </div>
                            </li>
                            <li class="col-lg-4 col-md-3 col-sm-12">
                                <div class="ps-list-content">
                                    <a
                                        href="/#"
                                        target="_blank"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            navigate('/chart')
                                        }}
                                    >
                                        <span class="material-symbols-outlined">
                                            description
                                        </span>
                                        <h4>Org Chart</h4>
                                        <p>
                                            Representation of Employee Hierarchy
                                            within the Organisation
                                        </p>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
            <SlDialog
                label="Remaining Policy for Acceptance"
                open={PolicyDialog}
                onSlAfterHide={() => setPolicyDialog(false)}
                style={{ '--width': '50vw' }}
            >
                <div>
                    {policyBannerAcceptance ? (
                        <div>
                            <h4 style={{ display: 'flex' }}>
                                {policyBannerAcceptance.title}{' '}
                                {`  (${policyBannerAcceptance.department})`}
                                {policyBannerAcceptance.accepted ===
                                'accepted' ? (
                                    <span
                                        style={{
                                            color: 'green',
                                            marginLeft: '10px',
                                        }}
                                        class="material-symbols-rounded"
                                    >
                                        check_circle
                                    </span>
                                ) : (
                                    ''
                                )}
                            </h4>
                            <p>{policyBannerAcceptance.description}</p>
                            <a
                                style={{
                                    marginRight: '20px',
                                    color: 'blue',
                                    display: 'flex',
                                }}
                                id="link"
                                href={policyBannerAcceptance.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span class="material-symbols-outlined">
                                    description
                                </span>
                                View Policy
                            </a>
                            <SlCheckbox
                                className="home-policy-check"
                                checked={!buttonDisabled}
                                onSlChange={(e) => {
                                    console.log(e.target.checked)
                                    if (e.target.checked) {
                                        setButtonDisabled(false)
                                    } else {
                                        setButtonDisabled(true)
                                    }
                                }}
                                style={{ marginTop: '30px' }}
                            >
                                I have read and understood the above policy
                            </SlCheckbox>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                {buttonDisabled ? (
                    ''
                ) : (
                    <SlButton
                        slot="footer"
                        variant="success"
                        onClick={() => {
                            setPolicyQuizDialog(false)
                            setQuestionForReview(0)
                            setButtonDisabled(true)
                            if (policyBannerAcceptance.have_question) {
                                getQuestionsForPolicy(policyBannerAcceptance.id)
                                setPolicyQuizDialog(true)
                            } else {
                                acceptPolicy()
                            }
                        }}
                    >
                        Accept
                    </SlButton>
                )}
                <SlButton
                    slot="footer"
                    variant="warning"
                    onClick={() => setPolicyDialog(false)}
                    style={{ marginLeft: '10px' }}
                >
                    Skip Anyway
                </SlButton>
            </SlDialog>

            <SlDialog
                className="policy-quiz-dialog"
                label="Questionnaire"
                style={{ '--width': '40vw' }}
                open={policyQuizDialog}
                onSlRequestClose={() => setPolicyQuizDialog(false)}
            >
                <div className="policy-question-tag-main">
                    {policyQuizQuestions.map((item, i) => {
                        return (
                            <SlTag
                                size="large"
                                variant={
                                    questionForReview == i
                                        ? 'primary'
                                        : 'neutral'
                                }
                                onClick={(e) => {
                                    setQuestionForReview(i)
                                }}
                            >{`Question ${i + 1}`}</SlTag>
                        )
                    })}
                </div>
                <p style={{ marginTop: '20px' }}>
                    {policyQuizQuestions[questionForReview].question}
                </p>
                <SlRadioGroup
                    label="Select an option"
                    name="a"
                    value={policyQuizQuestions[questionForReview].answer}
                    fieldset
                    onSlChange={(e) => {
                        setPolicyQuizQuestions((current) =>
                            current.map((obj, i) => {
                                if (i === questionForReview) {
                                    return { ...obj, answer: e.target.value }
                                }
                                return obj
                            })
                        )
                    }}
                >
                    <SlRadio
                        value={policyQuizQuestions[questionForReview].option1}
                    >
                        {policyQuizQuestions[questionForReview].option1}
                    </SlRadio>
                    <SlRadio
                        value={policyQuizQuestions[questionForReview].option2}
                    >
                        {policyQuizQuestions[questionForReview].option2}
                    </SlRadio>
                    <SlRadio
                        value={policyQuizQuestions[questionForReview].option3}
                    >
                        {policyQuizQuestions[questionForReview].option3}
                    </SlRadio>
                    <SlRadio
                        value={policyQuizQuestions[questionForReview].option4}
                    >
                        {policyQuizQuestions[questionForReview].option4}
                    </SlRadio>
                </SlRadioGroup>
                <SlButton
                    size="large"
                    className="policy-button"
                    disabled={!(questionForReview > 0)}
                    variant="neutral"
                    style={{ marginRight: '20px' }}
                    slot="footer"
                    onClick={() => {
                        setQuestionForReview(questionForReview - 1)
                    }}
                >
                    Previous
                </SlButton>
                <SlButton
                    size="large"
                    className="policy-button"
                    disabled={
                        !(questionForReview < policyQuizQuestions.length - 1)
                    }
                    variant="primary"
                    style={{ marginRight: '20px' }}
                    slot="footer"
                    onClick={() => {
                        setQuestionForReview(questionForReview + 1)
                    }}
                >
                    Next
                </SlButton>
                <SlButton
                    size="large"
                    className="policy-button"
                    disabled={
                        !(questionForReview >= policyQuizQuestions.length - 1)
                    }
                    slot="footer"
                    variant="success"
                    onClick={() => {
                        console.log(policyQuizQuestions)
                        acceptPolicyWithQuestion()
                    }}
                >
                    Submit
                </SlButton>
            </SlDialog>
        </div>
    )
}

export default Home
