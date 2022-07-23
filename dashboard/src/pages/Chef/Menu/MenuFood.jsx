import React, { useState } from 'react';
import { Button, ButtonGroup } from "@mui/material";
import { GiHealthPotion, GiHotMeal, GiReturnArrow } from 'react-icons/gi';
import './MenuFood.css';
import { useEffect } from 'react';
import chefService from '../../../services/chef.service';
import { format } from 'date-fns'
import { MdDinnerDining, MdFreeBreakfast } from 'react-icons/md';
import CustomizedMenus from '../MenuActions';
import AddMealstoMenu from './AddMealstoMenu';


export default function MenuFood(props) {

    const [loading, setLoading] = useState(false);
    const [menus, setMenus] = useState([]);
    const [meal, setMeals] = useState([]);
    const [mealSelect, setMealSelect] = useState(true);


    const retrieveMenus = () => {
        try {

            chefService.getAllMenus().then((result) => {

                setMenus(result.data);
            });

            setLoading(true);

        } catch (e) {
            console.log(e);
        }
    };

    const retrieveMeals = () => {
        chefService.getAllMeals()
            .then((res) => {
                setMeals(res.data.map((d) => {

                    return {
                        checkedBreakfast: d.checkedBreakfast,
                        checkedLunch: d.checkedLunch,
                        checkedDinner: d.checkedDinner,
                        id: d.id,
                        label: d.label,
                        description: d.description,
                        image:d.image,
                        type: d.type,
                    };

                }))

            });

    }

    useEffect(() => {
        retrieveMenus();
        retrieveMeals();

        return () => {
            setMeals([])
            setMenus([]);
        };
    }, []);





    const removeMenu = (menu) => {

        const m = menus.filter(item => item.id !== menu.id);
        chefService.removeMenu(menu.id)
            .then(() => {

                setMenus(m);
            }

            )

    }







    return (

<>

            { mealSelect ? 
            
            <section className="timeline_area section_padding_130">
            
            <div style={{
                position: "absolute",
                top: "4px",
                left: "15px"
            }}>


                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={() => props.addMeal("mealCard")}>
                        <GiReturnArrow /> &nbsp;&nbsp; Return
                    </Button>
                    <Button onClick={() => setMealSelect(false)}>
                        <GiHealthPotion /> &nbsp;&nbsp; Add New Menu Plan
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

                        {menus.length !== 0 ?
                            <>
                                {menus.map((menu, i) => (


                                    <div key={i} className="single-timeline-area">
                                        <div className="timeline-date wow fadeInLeft" data-wow-delay="0.1s" style={{ visibility: "visible", animationDelay: "0.1s", animationName: "fadeInLeft" }}>
                                            <p>{format(new Date(menu.date), `eeee, PP`
                                            )} </p>
                                            <div id="app-cover">
                                                <input onClick={(e) => removeMenu(menu, e)} className="binCheckbox" type="checkbox" id="checkbox" />
                                                <div id="bin-icon">
                                                    <div id="lid"></div>
                                                    <div id="box">
                                                        <div id="box-inner">
                                                            <div id="bin-lines"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="layer"></div>
                                            </div>

                                        </div>
                                        <div className="row">

                                            <div className="col-12 col-md-6 col-lg-4">
                                                <div className="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style={{ visibility: "visible", animationDelay: "0.3s", animationName: "fadeInLeft" }}>
                                                    <div className="timeline-icon"><i className='fa' aria-hidden="true"><MdFreeBreakfast /></i></div>
                                                    <div className="timeline-text">
                                                        <h6 className='mb-4'>BREAKFAST</h6>
                                                        {menu.breakfastMenu.map((breakfast, index) => (
                                                            <>
                                                                <div key={index} className="d-flex justify-content-start mb-5" >
                                                                    <div className="img_cont_msg" >
                                                                        <img src={`http://localhost:8080/files/${breakfast.image.id}`} alt="imageMeal" className=" user_img_msg" />
                                                                    </div>
                                                                    <div className="msg_cotainer">
                                                                        {breakfast.label}

                                                                    </div>
                                                                </div>

                                                            </>
                                                        ))}
                                                    </div>
                                                    <div style={{ position: "absolute", right: "5PX", top: "5PX" }}>
                                                        <CustomizedMenus mealSelect={"BREAKFAST"} setMealSelect={setMealSelect} />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6 col-lg-4">
                                                <div className="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style={{ visibility: "visible", animationDelay: "0.3s", animationName: "fadeInLeft" }}>
                                                    <div className="timeline-icon"><i className="fa " aria-hidden="true"><GiHotMeal /></i></div>
                                                    <div className="timeline-text">

                                                        <h6 className='mb-4'>LUNCH</h6>
                                                        {menu.lunchMenu.map((lunch, index) => (
                                                            <>
                                                                <div key={index} className="d-flex justify-content-start mb-5" >
                                                                    <div className="img_cont_msg" >
                                                                        <img src={`http://localhost:8080/files/${lunch.image.id}`} alt="imageMeal" className=" user_img_msg" />
                                                                    </div>
                                                                    <div className="msg_cotainer">
                                                                        {lunch.label}

                                                                    </div>
                                                                </div>

                                                            </>
                                                        ))}


                                                    </div>
                                                    <div style={{ position: "absolute", right: "5PX", top: "5PX" }}>
                                                        <CustomizedMenus mealSelect={"LUNCH"} setMealSelect={setMealSelect} />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6 col-lg-4">
                                                <div className="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style={{ visibility: "visible", animationDelay: "0.3s", animationName: "fadeInLeft" }}>
                                                    <div className="timeline-icon"><i className="fa " aria-hidden="true"><MdDinnerDining /></i></div>
                                                    <div className="timeline-text">

                                                        <h6 className='mb-4'>DINNER</h6>
                                                        {menu.dinnerMenu.map((dinner, index) => (
                                                            <>


                                                                <div key={index} className="d-flex justify-content-start mb-5" >
                                                                    <div className="img_cont_msg" >
                                                                        <img src={`http://localhost:8080/files/${dinner.image.id}`} alt="imageMeal" className=" user_img_msg" />
                                                                    </div>
                                                                    <div className="msg_cotainer">
                                                                        {dinner.label}

                                                                    </div>
                                                                </div>

                                                            </>
                                                        ))}
                                                        <div className='mt-5' style={{ position: "absolute", alignItems: "center", bottom: "5PX" }}>

                                                        </div>
                                                    </div>
                                                    <div style={{ position: "absolute", right: "5PX", top: "5PX" }}>
                                                        <CustomizedMenus mealSelect={"DINNER"} setMealSelect={setMealSelect} />
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
                                    <p>New Plan</p>
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

            </section>
            
        :
       
        
            <AddMealstoMenu setMenu={setMenus} menus={menus}  meals={meal} setMealSelect={setMealSelect} />
   
        
        
    
    }
   
      </>

    )
}
