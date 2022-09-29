import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {

    let navigate = useNavigate();

  return (
    <footer class="footer-wrap pt-30">
    <div class="container">
        <div class="row newsletter mb-30">
            <div class="col-lg-5 col-md-6 d-flex align-items-center">
                <i class="icon-mail-icon pe-2"></i>
                 <span>Get latest updates Subscribe to<br/> Our Newsletter</span>
            </div>
            <div class="col-lg-7 col-md-6 d-flex align-items-center SubsrcribeForm">
                <form>
                    <label for="subscribe-email">
                        <i class="icon-send-mail"></i>
                    <input id="subscribe-email" name="Email" placeholder="Your Mail Address"  type="email"/>
                    </label>
                    <button>Subscribe Now
                    </button> 
                </form>
            </div>
        </div>

        <div class="row pb-20">
            <div class="col-lg-5 col-md-4 col-sm-4">
                <div class="footer-widget">
                    <h3 class="footer-widget-title">Corporate Office</h3>
                    <ul class="footer-address list-style">
                        <li class="pb-20">
                            <i class="icon-location-2 fs-3 pe-2"></i>
                            <span>
H-57, Udyog Nagar, <br/> Rohtak Road Delhi-110041, 011-71255500</span>
                        </li>
                       <li class="pb-10">
                        <i class="icon-mail-icon fs-3 pe-2"></i>
                        <a href="mailto:marketing@microtekdirect.com">marketing@microtekdirect.com</a>
                    </li>
                    </ul>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4">
                <div class="footer-widget">
                    <h3 class="footer-widget-title">Useful Link</h3>
                    <ul class="footer-menu list-style">
                        <li onClick={()=>{
                            navigate("/home")
                        }}>
                            <a >Home </a>
                        </li>
                        <li onClick={()=>{
                            navigate("/aboutus")
                        }}>
                            <a>About Us </a>
                        </li>
                        <li onClick={()=>{
                            navigate("/profile")
                        }}>
                            <a>Profile</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-4">
                <div class="footer-widget">
                    <a class="footer-logo mb-20">
                        <img src="/assets/img/logo.png" alt="Image" width="150"/>
                    </a>
                    <ul class="social-profile style1 list-style">
                        <li>
                            <a href="https://www.facebook.com/MicrotekOfficial">
                                <i class="icon-facebook-icon"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/MicrotekOfcl">
                                <i class="icon-twitter-icon"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/channel/UCbBs6cIkMn5cLg1q8U2TQyQ">
                                <i class="icon-youtube-icon"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/company/microtekofficial">
                                <i class="icon-linkedin-icon"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <p class="copyright-text"> <a>2022 MICROTEK</a>. All Rights Reserved.</p>
</footer>
  )
}

export default Footer