import React from 'react'
import './DownloadPage.css';
import logo from './img/logo2.png'
import apk from "./assets/app.apk"
function DowloadPage() {
  return (
    <div className='download-main'>
       <div className='download-inner'>
       <img src={logo} alt="" />
        <h1>Download</h1>
        <h3>mLogin ( Attendence App )</h3>
        <button><a href={apk}  download="mLogin">Download for Android</a></button>
       </div>
    </div>
  )
}

export default DowloadPage