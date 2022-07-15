import React, { useState } from 'react';
import { Button, ButtonGroup } from "@mui/material";
import { GiReturnArrow } from 'react-icons/gi';
import './MenuFood.css';
import { useEffect } from 'react';
import chefService from '../../../services/chef.service';

export default function MenuFood(props) {

    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState([]);

    const retrieveMeals = () => {
        try {

            chefService.getAllMenus().then((result) => {
                console.log("menus", result);
                setMenu(result.data);
            });

            setLoading(true);
            console.log("menudata", menu);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        retrieveMeals();
        return () => {
            console.log("aaaafedfdf", menu);
            setMenu([]);
        };
    }, []);



    return (


        <section className="timeline_area section_padding_130">

            <div className="container">
                <div style={{
                    position: "absolute",
                    top: "4px",
                    left: "4px"
                }}>


                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button onClick={() => props.addMeal("mealCard")}>
                            <GiReturnArrow /> &nbsp;&nbsp; Return
                        </Button>

                    </ButtonGroup>


                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-lg-6">

                        <div className="section_heading text-center">
                            <h6>Our History</h6>
                            <h3>A brief stories of our 2 years company journey</h3>
                            <div className="line"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="apland-timeline-area">

                            {menu.length !== 0 ?
                                <>
                                    {menu.map((menu, i)=>(


                                    <div key={i} className="single-timeline-area">
                                        <div className="timeline-date wow fadeInLeft" data-wow-delay="0.1s" style={{ visibility: "visible", animationDelay: "0.1s", animationName: "fadeInLeft" }}>
                                            <p>{menu.date.getDay()}</p>
                                        </div>
                                        <div className="row">
                                       
                                            <div className="col-12 col-md-6 col-lg-4">
                                                <div className="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style={{ visibility: "visible", animationDelay: "0.3s", animationName: "fadeInLeft" }}>
                                                    <div className="timeline-icon"><i className="fa fa-address-card" aria-hidden="true"></i></div>
                                                    <div className="timeline-text">
                                                        
                                                        <h6>BREAKFAST</h6>
                                                        {menu.breakfastMenu.map((breakfast, index)=>( 
                                                      <p key={index}>{breakfast.label}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6 col-lg-4">
                                                <div className="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style={{ visibility: "visible", animationDelay: "0.3s", animationName: "fadeInLeft" }}>
                                                    <div className="timeline-icon"><i className="fa fa-address-card" aria-hidden="true"></i></div>
                                                    <div className="timeline-text">
                                                        
                                                        <h6>BREAKFAST</h6>
                                                        {menu.lunchMenu.map((lunch, index)=>( 
                                                        <p key={index}>{lunch.label}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6 col-lg-4">
                                                <div className="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style={{ visibility: "visible", animationDelay: "0.3s", animationName: "fadeInLeft" }}>
                                                    <div className="timeline-icon"><i className="fa fa-address-card" aria-hidden="true"></i></div>
                                                    <div className="timeline-text">
                                                        
                                                        <h6>BREAKFAST</h6>
                                                        {menu.dinnerMenu.map((dinner, index)=>( 
                                                       <p key={index}>{dinner.label}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                       
                                        </div>
                                    </div>
                                    ))}
                                </>
                                :


                                <div className="single-timeline-area">
                                    <div className="timeline-date wow fadeInLeft" data-wow-delay="0.1s" style={{ visibility: "visible", animationDelay: "0.1s", animationName: "fadeInLeft" }}>
                                        <p>Near Future</p>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-4">
                                            <div className="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style={{ visibility: "visible", animationDelay: "0.3s", animationName: "fadeInLeft" }}>
                                                <div className="timeline-icon"><i className="fa fa-address-card" aria-hidden="true"></i></div>
                                                <div className="timeline-text">
                                                    <h6>Updated 5.0</h6>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4">
                                            <div className="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.5s" style={{ visibility: "visible", animationDelay: "0.5s", animationName: "fadeInLeft" }}>
                                                <div className="timeline-icon"><i className="fa fa-archive" aria-hidden="true"></i></div>
                                                <div className="timeline-text">
                                                    <h6>Fixed bug</h6>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4">
                                            <div className="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.7s" style={{ visibility: "visible", animationDelay: "0.7s", animationName: "fadeInLeft" }}>
                                                <div className="timeline-icon"><i className="fa fa-address-book" aria-hidden="true"></i></div>
                                                <div className="timeline-text">
                                                    <h6>Reach 1k Users</h6>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
