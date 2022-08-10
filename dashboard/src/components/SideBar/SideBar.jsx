import "./SideBar.css";
import { MdElderly ,MdNoFood } from "react-icons/md";
import { BiHealth , BiCalendar } from "react-icons/bi";
import {GiMeal,GiMeatCleaver} from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { RiUser2Fill } from "react-icons/ri";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function SideBar({setTitle}) {
  const [showAccompagnantBoard, setShowAccompagnantBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showChefBoard, setShowChefBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);


  useEffect(() => {
    console.log("user",currentUser.roles[0].name)
    if (currentUser) {
      setShowAccompagnantBoard(currentUser.roles[0].name==="ROLE_ACCOMPAGNANT");
      setShowAdminBoard(currentUser.roles[0].name==="ROLE_ADMIN");
      setShowChefBoard(currentUser.roles[0].name==="ROLE_CHEF");
    }
  }, [currentUser]);


  const onButtonClick=(title)=>{
    setTitle(title); 
  }

  
   // Toggle Sidenav

const iconSidenav = document.getElementById('iconSidenav');
const sidenav = document.getElementById('sidenav-main');
let body = document.getElementsByTagName('body')[0];
let className = 'g-sidenav-pinned';



function toggleSidenav() {
  if (body.classList.contains(className)) {
    body.classList.remove(className);
    setTimeout(function() {
      sidenav.classList.remove("bg-white");
    }, 10000);
   

  } else {
    body.classList.add(className);
    sidenav.classList.add("bg-white");
    sidenav.classList.remove("bg-transparent");
    iconSidenav.classList.remove('d-none');
  }
}
 
  return (
    
    <div className="sideBar" >
       
      
      <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps ps--active-y bg-white "
       
        id="sidenav-main"
      >
         <div className="sidenav-header" onClick={toggleSidenav}>
        <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                    <a className="navbar-brand m-0" href="/"  >
                        <img src="../../../../assets/img/logos/utssLogo.png" className="navbar-brand-img h-75" alt="main_logo" />
                        
                    </a>
                    </div>
       
        <hr className="horizontal dark mt-0" />
        <div
          className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100"
          id="sidenav-collapse-main"
        >
          {showAccompagnantBoard && (
          <ul className="navbar-nav">
            
            <li className="nav-item">
              
            <NavLink  to="/" onClick={()=>onButtonClick('Home')}  className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                 <div> <FaHome className="color-backgroundIcon" size="1.5em" /></div>
                </div>
                <span className="nav-link-text ms-1 text-uppercase">Dashboard</span>
            </NavLink>
              
            </li>             
            <li className="nav-item">
            
              
              <NavLink to="/senior"  onClick={()=>onButtonClick('Senior')}  className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                
                <div><MdElderly className="color-backgroundIcon" size="1.5em" /></div>
                
                </div>
                
                <span className="nav-link-text ms-1 text-uppercase">Seniors</span>
                
            </NavLink>
              
              
            </li>     
            <li className="nav-item">
            <NavLink to="/health" onClick={()=>onButtonClick('Health')}  className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  
                <div  ><BiHealth className="color-backgroundIcon" size="1.5em" /></div>
                
                </div>
                <span className="nav-link-text ms-1 text-uppercase">Health</span>
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/food"  onClick={()=>onButtonClick('Food')}  className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  
                <div  ><MdNoFood className="color-backgroundIcon" size="1.5em" /></div>
                </div>
                <span className="nav-link-text ms-1 text-uppercase">Food</span>
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/calendar" onClick={()=>onButtonClick('Calendar')} className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <div> <BiCalendar className="color-backgroundIcon" size="1.5em"/></div>
                </div>
                <span className="nav-link-text ms-1 text-uppercase">Calendar</span>
            </NavLink>
            </li>
            <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                Account pages
              </h6>
            </li>
            <li className="nav-item">
            <NavLink to="/profile" onClick={()=>onButtonClick('Profile')} className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <svg
                    width="12px"
                    height="12px"
                    viewBox="0 0 46 42"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>customer-support</title>
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        transform="translate(-1717.000000, -291.000000)"
                        fill="#FFFFFF"
                        fillRule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(1.000000, 0.000000)">
                            <path
                              className="color-background opacity-6"
                              d="M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z"
                            ></path>
                            <path
                              className="color-background"
                              d="M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z"
                            ></path>
                            <path
                              className="color-background"
                              d="M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="nav-link-text ms-1 ">Profile</span>
            </NavLink>
            </li>
          
          </ul>
          )}
          {showAdminBoard && (
          <ul className="navbar-nav">
            
            <li className="nav-item">
              
            <NavLink  to="/" onClick={()=>onButtonClick('Home')}  className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                 <div> <FaHome className="color-backgroundIcon" size="1.5em" /></div>
                </div>
                <span className="nav-link-text ms-1 text-uppercase">Dashboard</span>
            </NavLink>
              
            </li>             
            <li className="nav-item">
            
              
              <NavLink to="/staff"  onClick={()=>onButtonClick('Senior')}  className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                
                <div><RiUser2Fill className="color-backgroundIcon" size="1.5em" /></div>
                
                </div>
                
                <span className="nav-link-text ms-1 text-uppercase">Staff</span>
                
            </NavLink>
              
              
            </li>     
          
            <li className="nav-item">
            <NavLink to="/calendar" onClick={()=>onButtonClick('Calendar')} className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <div> <BiCalendar className="color-backgroundIcon" size="1.5em"/></div>
                </div>
                <span className="nav-link-text ms-1 text-uppercase">Calendar</span>
            </NavLink>
            </li>
            <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                Account pages
              </h6>
            </li>
            <li className="nav-item">
            <NavLink to="/profile" onClick={()=>onButtonClick('Profile')} className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <svg
                    width="12px"
                    height="12px"
                    viewBox="0 0 46 42"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>customer-support</title>
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        transform="translate(-1717.000000, -291.000000)"
                        fill="#FFFFFF"
                        fillRule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(1.000000, 0.000000)">
                            <path
                              className="color-background opacity-6"
                              d="M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z"
                            ></path>
                            <path
                              className="color-background"
                              d="M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z"
                            ></path>
                            <path
                              className="color-background"
                              d="M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="nav-link-text ms-1 ">Profile</span>
            </NavLink>
            </li>
            
          </ul>
          )}
          {showChefBoard && (
          <ul className="navbar-nav">
            
            <li className="nav-item">
              
            <NavLink  to="/" onClick={()=>onButtonClick('Home')}  className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                 <div> <FaHome className="color-backgroundIcon" size="1.5em" /></div>
                </div>
                <span className="nav-link-text ms-1 text-uppercase">Dashboard</span>
            </NavLink>
              
            </li>             
            <li className="nav-item">
            
              
              <NavLink to="/meal"  onClick={()=>onButtonClick('Meal')}  className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                
                <div><GiMeal className="color-backgroundIcon" size="1.5em" /></div>
                
                </div>
                
                <span className="nav-link-text ms-1 text-uppercase">Meal</span>
                
            </NavLink>
            
              
            </li>     
            <li className="nav-item">
            
              
            <NavLink to="/ingredients"  onClick={()=>onButtonClick('Ingredients')}  className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
              
              <div><GiMeatCleaver className="color-backgroundIcon" size="1.5em" /></div>
              
              </div>
              
              <span className="nav-link-text ms-1 text-uppercase">Ingredients</span>
              
          </NavLink>
          
            
          </li>     
          
         
            <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                Account pages
              </h6>
            </li>
            <li className="nav-item">
            <NavLink to="/profile" onClick={()=>onButtonClick('Profile')} className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <svg
                    width="12px"
                    height="12px"
                    viewBox="0 0 46 42"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>customer-support</title>
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        transform="translate(-1717.000000, -291.000000)"
                        fill="#FFFFFF"
                        fillRule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(1.000000, 0.000000)">
                            <path
                              className="color-background opacity-6"
                              d="M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z"
                            ></path>
                            <path
                              className="color-background"
                              d="M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z"
                            ></path>
                            <path
                              className="color-background"
                              d="M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="nav-link-text ms-1 ">Profile</span>
            </NavLink>
            </li>
           
          </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
