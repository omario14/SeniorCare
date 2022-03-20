import React from "react";

import './TopBar.css'

export default function TopBar({title}) {
    
    
  return (
    <div className="topbar">
       <div className="topbarWrapper">
        <div className="topLeft">
        <div className="sidenav-header">
                    <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                    <a className="navbar-brand m-0" href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html" >
                        <img src="../../../../assets/img/logos/utssLogo.png" className="navbar-brand-img h-75" alt="main_logo" />
                        
                    </a>
                </div>
               
        </div>

        <div className="topRight">
            
          
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">


<nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
    <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="/">Pages</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{title}</li>
            </ol>
            <h6 className="font-weight-bolder mb-0">Dashboard</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group">
                    <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" placeholder="Type here..."/>
                </div>
            </div>
            <ul className="navbar-nav  justify-content-end">
                <li className="nav-item d-flex align-items-center">
                    <a href="/" className="nav-link text-body font-weight-bold px-0">
                        <i className="fa fa-user me-sm-1"></i>
                        <span className="d-sm-inline d-none">Sign In</span>
                    </a>
                </li>
                <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                    <a href="/" className="nav-link text-body p-0" id="iconNavbarSidenav">
                        <div className="sidenav-toggler-inner">
                            <i className="sidenav-toggler-line"></i>
                            <i className="sidenav-toggler-line"></i>
                            <i className="sidenav-toggler-line"></i>
                        </div>
                    </a>
                </li>
                <li className="nav-item px-3 d-flex align-items-center">
                    <a href="/" className="nav-link text-body p-0">
                        <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                    </a>
                </li>
                <li className="nav-item dropdown pe-2 d-flex align-items-center">
                    <a href="/" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-bell cursor-pointer"></i>
                    </a>
                    <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                        <li className="mb-2">
                            <a className="dropdown-item border-radius-md" href="/">
                                <div className="d-flex py-1">
                                    <div className="my-auto">
                                        <img src="../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " alt="img11"/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <h6 className="text-sm font-weight-normal mb-1">
                                            <span className="font-weight-bold">New message</span> from Laur
                                        </h6>
                                        <p className="text-xs text-secondary mb-0">
                                            <i className="fa fa-clock me-1"></i>
                                            13 minutes ago
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="mb-2">
                            <a className="dropdown-item border-radius-md" href="/">
                                <div className="d-flex py-1">
                                    <div className="my-auto">
                                        <img src="../assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm bg-gradient-dark  me-3 " alt='img12' />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <h6 className="text-sm font-weight-normal mb-1">
                                            <span className="font-weight-bold">New album</span> by Travis Scott
                                        </h6>
                                        <p className="text-xs text-secondary mb-0">
                                            <i className="fa fa-clock me-1"></i>
                                            1 day
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item border-radius-md" href="/">
                                <div className="d-flex py-1">
                                    <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                                        <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                            <title>credit-card</title>
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                    <g transform="translate(1716.000000, 291.000000)">
                                                        <g transform="translate(453.000000, 454.000000)">
                                                            <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                                            <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <h6 className="text-sm font-weight-normal mb-1">
                                            Payment successfully completed
                                        </h6>
                                        <p className="text-xs text-secondary mb-0">
                                            <i className="fa fa-clock me-1"></i>
                                            2 days
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>


</main>    
        
        </div>
       
      </div>
      
    </div>
  );
}
