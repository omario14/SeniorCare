import { Badge, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Notifications({ socket }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        console.log("nottif", notifications)
        if (socket) {
            socket.on("getNotification", (data) => {
                setNotifications((prev) => [...prev, data]);
            });
        }
    }, [socket]);

    const handleRead = () => {
        setNotifications([]);
       
      };

    return (
        <div>
            <a
                href="/"
                className="nav-link text-body p-0"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                
                    <Badge color="secondary" invisible={notifications.length>0 ? false:true}  variant="dot">
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
                    {notifications.map((n) => (
                    <li className="mb-2">
                        <a
                            className="dropdown-item border-radius-md"
                            href="/"
                        >
                            <div className="d-flex py-1">
                                <div className="my-auto">
                                    <img
                                        src="../assets/img/team-2.jpg"
                                        className="avatar avatar-sm  me-3 "
                                        alt="img11"
                                    />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="text-sm font-weight-normal mb-1">
                                        <span className="font-weight-bold">
                                        {n.senderName}
                                        </span>{" "}
                                        from {n.receiverName}
                                    </h6>
                                    <p className="text-xs text-secondary mb-0">
                                        <i className="fa fa-clock me-1"></i>
                                        13 minutes ago
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}

                <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
          </> ):(<Typography m={4} color="InfoText">
                  there is no notifications
                    </Typography>           
            )}
            </ul></div>
    )
}
