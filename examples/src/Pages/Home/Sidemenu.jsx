import React from 'react'
import './Sidemenu.css'
function Sidemenu() {
  return (
    <div className="sidemenu-main">
      <div className="sidemenu-header">
        <h2>Microtek</h2>
        <span class="material-symbols-outlined">menu</span>
      </div>
      <div className="sidemenu-tab-links">
        <h3>General</h3>
        <div className="sidemenu-tab-links-main">
          <div className="sidemenu-link">
            <span class="material-symbols-outlined sidemnu-link-icon">
              display_settings
            </span>
            <h3>App</h3>
          </div>
          <div className="sidemenu-link">
            <span class="material-symbols-outlined">monitoring</span>
            <h3>Org Chart</h3>
          </div>
          <div className="sidemenu-link">
            <span class="material-symbols-outlined">insights</span>
            <h3>Analytics</h3>
          </div>
          <div className="sidemenu-link">
            <span class="material-symbols-outlined">account_balance</span>
            <h3>Banking</h3>
          </div>
          <div className="sidemenu-link">
            <span class="material-symbols-outlined">description</span>
            <h3>Invoice</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidemenu
