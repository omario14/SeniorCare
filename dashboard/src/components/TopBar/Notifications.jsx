import { Badge, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import notifSound from "../../utils/audioClips/notif1.mp3";
import {Howl,Howler} from "howler";
import { NavLink } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
export default function Notifications({ socket }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        
        if (socket) {
            console.log(socket," socket ")
            socket.on("getNotification", (data) => {
                setNotifications((prev) => [...prev, data]);
                SoundPlay(notifSound);
            });
        }
    }, [socket]);

    const handleRead = () => {
        setNotifications([]);
       
      };

    const SoundPlay = (src)=>{
        const sound = new Howl({
            src
        })
        sound.play();
    }

    Howler.volume(1.0)

    return (
        <div>
            <a
                href="/"
                className="nav-link text-body p-0"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                
                    <Badge className={notifications.length>0 ?"ping":""} style={notifications.length>0 ? {color:'#6f42c1'}:{}} invisible={notifications.length>0 ? false:true}  >
                        <i className="fa fa-bell cursor-pointer"></i>
                    </Badge>
                
            </a>
 
            <ul
                className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                aria-labelledby="dropdownMenuButton"
                style={{ zIndex: "9999" }}
            >
                {notifications.length>0 ? (
                    <>
                    {notifications.filter((item)=>item.sid===socket.id).map((n,ind) => (
                    <li className="mb-2" key={ind}>
                        <NavLink to={n.type==="Menu" && "/food"}
                            className="dropdown-item border-radius-md"
                            
                        >
                            <div className="d-flex py-1">
                                <div className="my-auto">
                                    <img
                                        src={`../assets/img/${n.type}.png`}
                                        className="avatar avatar-sm  me-3 "
                                        alt="img11"
                                    />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="text-sm font-weight-normal mb-1">
                                        <span className="font-weight-bold">
                                        {n.content}
                                        </span>{" "}
                                        
                                       
                                    </h6>
                                    <p className="text-xs text-info mb-0">
                                    From {n.senderName}
                                    </p>
                                    <p className="text-xs text-secondary mb-0">
                                        <i className="fa fa-clock me-1"></i>
                                       
                                        <ReactTimeAgo date={n.time} locale="en-US" timeStyle="round-minute"/>
                                       
                                    </p>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                ))}
                <div className='flex'>
                <button className="nButton" onClick={handleRead}> 
            Mark as read
          </button>
          <NavLink className="btn-link text-link" style={{color:"blue"}} to="/profile">See all notifications</NavLink></div>
          </> ):(<><Typography m={4} color="InfoText">
                  there is no notifications
                    </Typography>    
                    <NavLink className="btn-link text-link text-center mb-0" style={{color:"blue"}} to="/profile">See all notifications</NavLink>   
                    </>    
            )}
            </ul></div>
    )
}
