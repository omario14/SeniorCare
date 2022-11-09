import React, { Component } from "react";

import "./TopBar.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { history } from '../../helpers/history';

import Notifications from "./Notifications";
import SelectLanguage from "./SelectLanguage";

class TopBar extends Component {

  

 constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      notification:[],
      
    };
    
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }
  componentDidMount() {
    const user = this.props.user;
    
    if (user) {
      this.setState({
        currentUser: user,
       
      });
    }
  }

  logOut() {
    
    this.props.dispatch(logout());
    //this.props.socket.emit("disconnect");
   
  }
   
 
  render(){
      // Toggle Sidenav

const iconSidenav = document.getElementById('iconSidenav');

let body = document.getElementsByTagName('body')[0];
let className = 'g-sidenav-pinned';



function toggleSidenav() {
  if (body.classList.contains(className)) {
    body.classList.remove(className);
   
   

  } else {
    body.classList.add(className);
    
  
  }

  }


  const { currentUser , } = this.state;
  const {t,dir,setToggleConfigFn}=this.props;
  const socket = this.props.socket;
  return (
    
    <div className="topbar">
      
          
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"

            >
              <div className="container-fluid py-1 px-3" >
                <nav aria-label="breadcrumb" >
                  <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5"  dir={dir}>
                    <li className={dir==="rtl"?"breadcrumb-itemrtl text-sm mx-2":"breadcrumb-item text-sm"}>
                      <a className="opacity-5 text-dark" href="/">
                      {t("pages")}
                      </a>
                    </li>
                    <li
                      className={dir==="rtl"?"breadcrumb-itemrtl text-sm text-dark active font-weight-bolder mb-0 text-capitalize":"breadcrumb-item text-sm text-dark active font-weight-bolder mb-0 text-capitalize" }
                      aria-current="page"
                      
                    >
                      
                      {this.props.title}
                    </li>
                  </ol>
                </nav>
                <div
                  className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                  id="navbar"
                >
                  <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                    <SelectLanguage/>
                  </div>
                  <ul className="navbar-nav  justify-content-end">
                  {currentUser ? (
                  <li className="nav-item d-flex align-items-center">
                      <NavLink
                        to="/login"
                        onClick={this.logOut}
                        className="nav-link text-body font-weight-bold px-0"
                      >
                        <i className="fa fa-user me-sm-1"></i>
                        <span className="d-sm-inline d-none">{t("logout")}</span>
                      </NavLink>
                    </li>
                    ) : (
                    <li className="nav-item d-flex align-items-center">
                      <NavLink
                        to="/login"
                        className="nav-link text-body font-weight-bold px-0"
                      >
                        <i className="fa fa-user me-sm-1"></i>
                        <span className="d-sm-inline d-none">Sign In</span>
                      </NavLink>
                    </li>
                     )}
                    <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                      

                      
                      <a href="#"
                        
                        onClick={toggleSidenav}
                        className="nav-link text-body p-0"
                        id="iconNavbarSidenav"
                      >
                        <div className="sidenav-toggler-inner">
                          <i className="sidenav-toggler-line"></i>
                          <i className="sidenav-toggler-line"></i>
                          <i className="sidenav-toggler-line"></i>
                        </div>
                      </a>
                     
                    </li>
                    <li className="nav-item px-3 d-flex align-items-center">
                      <a href="#/" onClick={()=>{setToggleConfigFn()}} className="nav-link text-body p-0">
                        <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                      </a>
                    </li>
                   
                    <li className="nav-item dropdown pe-2 d-flex align-items-center">
                   
                      <Notifications socket={socket}/>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </nav>
          
        </div>
     
  );
}}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(TopBar);
