import React, { useEffect } from 'react'
import vision from "./assets/vison.svg"
import Footer from './Home/Footer'
function AboutUs() {
    
  return (
    <div style={{overflowX:"hidden" , minHeight:"101vh"}}>
         <section style={{marginTop:"50px"}} className="vision pb-100">
                <div className="container-fluid px-lg-0">
                    <div className="row">
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}} className="col-lg-6 content pe-lg-0" >
                            <div className="content-title offset-lg-2">
                                <span  style={{fontSize:"26px" , marginBottom:"3vh"}}>Vision &amp; Mission</span>
                                <h2 style={{fontSize:"20px"}} >Be a market leader for all our products</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loo make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                <div className="ptb-30"><a className="btn">Read More</a></div>
                         </div>
                        </div>
                        <div className="col-lg-6 ps-lg-0">
                            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}} className="img">
                                <img src={vision}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-wrap style1 ptb-100" >
                <div className="container">
                        <div >
                            <div className="about-content">
                                <div className="content-title">
                                    <span>About Microtek</span>
                                    <h2>Read Something About Microtek</h2>
                                    <p>Microtek ,we are in the business of bringing happiness and transforming the quality of life since 1986. Nowadays Microtek group has grown into a global leading company in new energy and healthcare areas, having more than 6000+ employees and 20 subsidiaries worldwidely . Our purpose is to enliven and energize lives, create comfort, well-being and safety for all. We fulfil our consumer's needs, empowering and enabling them to realize their dreams.</p>
                                    <p>Microtek(Shenzhen) Technology is one of the subsidiaries of Microtek group, providing excellent products& solutions for OR/ ICU and Home Care ,having more than 100 engineers in R&D and 200K square meters manufacture sites in Shenzhen China. Our products have been selling to 100+ countries and regions around the world, moving rapidly with high quality & excellent services. Products are qualified with CE /ISO13485/FDA .</p>
                                </div>
                                <div className="d-lg-flex d-sm-flex  justify-content-center pb-20">
                                    <div className="px-lg-5 px-3 pb-3 pb-lg-0">
                                        <div className="d-flex align-items-center">
                                            <div className="cspt-ihbox-icon-wrapper">
                                                <i className="icon-call-icon"></i>
                                            </div>
                                            <div className="">
                                            <h4 className="cspt-element-heading">Call Us:</h4>
                                            <h2 className="cspt-element-title"> <a href="tel:+86-075527083814">+86-0755 2708 3814</a></h2>
                                            </div>
                                          </div>

                                    </div>
                                    <div className="px-lg-5 px-3 d-none d-sm-block">
                                        <span className="elementor-divider-separator">
                                        <span className="elementor-divider__text elementor-divider__element">
                                        OR </span>
                                        </span>
                                    </div>
                                    <div className="px-lg-5 px-3 pb-3 pb-lg-0">
                                        <div className="d-flex align-items-center">
                                            <div className="cspt-ihbox-icon-wrapper">
                                                <i className="icon-mail-icon"></i>
                                            </div>
                                            <div className="">
                                            <h4 className="cspt-element-heading">Mail Us:</h4>
                                            <h2 className="cspt-element-title"> <a href="mailto:marketing@microtekdirect.com">marketing@microtekdirect.com</a></h2>
                                            </div>
                                          </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
            <Footer />
    </div>
  )
}

export default AboutUs