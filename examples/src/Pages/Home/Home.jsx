import React from 'react'
import Navbar from './Navbar'
import Sidemenu from './Sidemenu'
import './Home.css'

function Home() {
  return (
    <div className='home-main'>
        <Sidemenu/>
        <div className='home-main-right'>
            <Navbar/>
            <div className='home-main-container'>

            </div>
        </div>        
    </div>
  )
}

export default Home