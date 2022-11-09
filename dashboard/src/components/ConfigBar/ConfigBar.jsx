import React from 'react'
import './ConfigBar.css'
export default function ConfigBar({ toggleConfig, setToggleConfigFn, theme, toggleTheme, toggleBg, bg }) {

  return (
    <div>
      <div className={toggleConfig === false ? "fixed-plugin" : "fixed-plugin show"}>
        <a onClick={() => { setToggleConfigFn() }} className="fixed-plugin-button text-dark position-fixed px-3 py-2">
          <i className="fa fa-cog py-2"> </i>
        </a>
        <div className="card shadow-lg ">
          <div className="card-header pb-0 pt-3 ">
            <div className="float-start">
              <h5 className="mt-3 mb-0">Seniguard Configurator</h5>
              <p>Dashboard options.</p>
            </div>
            <div className="float-end mt-4">
              <button onClick={() => { setToggleConfigFn() }} className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                <i className="fa fa-close"></i>
              </button>
            </div>

          </div>
          <hr className="horizontal dark my-1" />
          <div className="card-body pt-sm-3 pt-0">

            <div>
              <h6 className="mb-0">Sidebar Colors</h6>
            </div>
            <a href="/#" className="switch-trigger background-color">
              <div className="badge-colors my-2 text-start">
                <span className="badge filter bg-gradient-primary active" data-color="primary"></span>
                <span className="badge filter bg-gradient-dark" data-color="dark" ></span>
                <span className="badge filter bg-gradient-info" data-color="info"></span>
                <span className="badge filter bg-gradient-success" data-color="success"  ></span>
                <span className="badge filter bg-gradient-warning" data-color="warning"  ></span>
                <span className="badge filter bg-gradient-danger" data-color="danger"  ></span>
              </div>
            </a>
            <div className="mt-3">
              <h6 className="mb-0">Sidenav Type</h6>
              <p className="text-sm">Choose between 2 different sidenav types.</p>
            </div>
            <div className="d-flex">
              <button className={bg === "bg-transparent" ? "btn bg-gradient-primary w-100 px-3 mb-2 active" : "btn bg-gradient-primary w-100 px-3 mb-2 "} onClick={(e) => { e.preventDefault();toggleBg("bg-transparent") }}>Transparent</button>
              <button className={bg === "bg-white" ? "btn bg-gradient-primary w-100 px-3 mb-2 ms-2 active" : "btn bg-gradient-primary w-100 px-3 mb-2 ms-2 "}  onClick={(e) => { e.preventDefault();toggleBg("bg-white") }}>White</button>
            </div>
            <p className="text-sm d-xl-none d-block mt-2">You can change the sidenav type just on desktop view.</p>

            <div className="mt-3">
              <h6 className="mb-0 text-capitalize">{theme} Mode</h6>
            </div>
            <div className="form-check form-switch ps-0"  style={{transform:"scale(0.4)"}}>
              
              <input  type="checkbox" id="toggleDarkMode" className="toggleDarkMode--checkbox" checked={theme === "dark" ? true : false} onChange={() => { toggleTheme() }} />
              <label  htmlFor="toggleDarkMode" className="toggleDarkMode--label">
                <span  className="toggleDarkMode--label-background"></span>
              </label>

            </div>
            <hr className="horizontal dark my-sm-4" />
          
          </div>
        </div>
      </div>
    </div>
  )
}
