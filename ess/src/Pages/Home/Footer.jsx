import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {

    let navigate = useNavigate();

  return (
    <footer className="footer-wrap pt-30">
    <div className="container">
        {/* <div className="row newsletter mb-30">
            <div className="col-lg-5 col-md-6 d-flex align-items-center">
                <i className="icon-mail-icon pe-2"></i>
                 <span>Get latest updates Subscribe to<br/> Our Newsletter</span>
            </div>
            <div className="col-lg-7 col-md-6 d-flex align-items-center SubsrcribeForm">
                <form>
                    <label for="subscribe-email">
                        <i className="icon-send-mail"></i>
                    <input id="subscribe-email" name="Email" placeholder="Your Mail Address"  type="email"/>
                    </label>
                    <button>Subscribe Now
                    </button> 
                </form>
            </div>
        </div> */}

        <div className="row pb-20">
            <div className="col-lg-5 col-md-4 col-sm-4">
                <div className="footer-widget">
                    <h3 className="footer-widget-title">Corporate Office</h3>
                    <ul className="footer-address list-style">
                        <li className="pb-20">
                            <i className="icon-location-2 fs-3 pe-2"></i>
                            <span>
H-57, Udyog Nagar, <br/> Rohtak Road Delhi-110041, 011-71255500</span>
                        </li>
                       <li className="pb-10">
                        <i className="icon-mail-icon fs-3 pe-2"></i>
                        <a href="mailto:marketing@microtekdirect.com">it.helpdesk@microtekdirect.com</a>
                    </li>
                    </ul>
                </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="footer-widget">
                    <h3 className="footer-widget-title">Useful Link</h3>
                    <ul className="footer-menu list-style">
                        <li onClick={()=>{
                            navigate("/home")
                        }}>
                            <a href='/#' >Home </a>
                        </li>
                        <li onClick={()=>{
                            navigate("/aboutus")
                        }}>
                            <a href='/#' >About Us </a>
                        </li>
                        <li onClick={()=>{
                            navigate("/profile")
                        }}>
                            <a href='/#' >Profile</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4">
                <div className="footer-widget">
                    <a className="footer-logo mb-20">
                        <img src="/assets/img/logo.png" alt="Image" width="150"/>
                    </a>
                    <ul className="social-profile style1 list-style">
                        <li>
                            <a target="_blank" href="https://www.facebook.com/MicrotekOfficial">
                                <i className="icon-facebook-icon"></i>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://twitter.com/MicrotekOfcl">
                                <i className="icon-twitter-icon"></i>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://www.youtube.com/channel/UCbBs6cIkMn5cLg1q8U2TQyQ">
                                <i className="icon-youtube-icon"></i>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://www.linkedin.com/company/microtekofficial" >
                                <i className="icon-linkedin-icon"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <p className="copyright-text"> <a>2022 MICROTEK</a>. All Rights Reserved.</p>
</footer>
  )
}

export default Footer