import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { TabTitle } from "../../utils/GeneralFunctions";
import './Food.css';
import './Food.scss';
import chefService from "../../services/chef.service";
import { FormControl, InputLabel, ListItemAvatar, ListItemText, MenuItem, Select } from "@mui/material";

import { FcCalendar } from "react-icons/fc";
import { Badge } from "react-bootstrap";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


class Food extends Component {
    constructor(props) {
        super(props);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.state = {
            activeType: "breakfastMenu",
            filtered: [],
            menu: [],
            meals: [],
            searchTerm: "",
            loading: false,
            select: new Date().toISOString().split("T")[0],
        }

    }
    componentDidMount = () => {
        try {
            this.setState({
                loading: true,
            })
            chefService.getAllMenus().then((result) => {
                this.setState({
                    menu: result.data,
                    loading: false,
                })
            });

        } catch (e) {
            console.log(e);
        }
    }

    onChangeSelect = (event) => {
        this.setState({
            select: event.target.value
        })
    }



    render() {
        TabTitle(this.props.title);
        const { user: currentUser } = this.props;
        if (!currentUser) {
            return <Navigate to="/login" />
        } else if (currentUser.roles[0].name !== "ROLE_ACCOMPAGNANT") {
            return <Navigate to="/notFound" />;
        }


        return (
            <div className="food">
                <main className="main-content  position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">

                    <div className="container-fluid py-4">
                        <div className="container" data-aos="fade-up">
                            <div className="row" data-aos="fade-up" data-aos-delay="100">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div id="buttons" >

                                        <button className={this.state.activeType === "breakfastMenu" ? 'button-value active' : 'button-value'} onClick={() => this.setState({ activeType: "breakfastMenu" })}>BreakFast</button>
                                        <button className={this.state.activeType === "lunchMenu" ? 'button-value active' : 'button-value'} onClick={() => this.setState({ activeType: "lunchMenu" })}>Lunch</button>
                                        <button className={this.state.activeType === "dinnerMenu" ? 'button-value active' : 'button-value'} onClick={() => this.setState({ activeType: "dinnerMenu" })}>Dinner</button>
                                        <FormControl sx={{ m: 1, minWidth: 170 }}>
                                            <InputLabel id="demo-simple-select-helper-label">Date</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={this.state.select}
                                                label="select"
                                                onChange={this.onChangeSelect}

                                                MenuProps={MenuProps}
                                            >

                                                {this.state.menu && this.state.menu.sort((a, b) =>
                                                    a.date < b.date ? 1 : -1
                                                ).map((s, i) => (


                                                    <MenuItem key={i} value={s.date}>
                                                        <ListItemText > {s.date} {s.date === new Date().toISOString().split("T")[0] && <Badge bg="blue" > Today</Badge>}</ListItemText>
                                                    </MenuItem>

                                                ))}
                                            </Select>

                                        </FormControl>
                                    </div>


                                </div>
                            </div>
                        </div>

                        {!this.state.loading ? (

                            <div className="container-fluid py-4">
                                {this.state.menu.filter((m) => m.date === this.state.select).map((menu) => (
                                    <>

                                        {this.state.activeType === "breakfastMenu" && menu.breakfastMenu.map((breakfast) => (
                                            <div className="foodContainer mb-5 mt-5">
                                                {breakfast.image === null ? (
                                                    <img
                                                        src={
                                                            "../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif"
                                                        }
                                                        alt="mealpic"
                                                        className="menuImg"

                                                    />
                                                ) : (
                                                    <img
                                                        src={`http://localhost:8080/files/${breakfast.image.id}`}
                                                        alt="mealpic"
                                                        className="menuImg"

                                                    />
                                                )}

                                                <div className="foodContainer__text">
                                                    <h1>{breakfast.label}</h1>




                                                    <p>
                                                        {breakfast.description}
                                                    </p>

                                                    <div className="foodContainer__text__timing">
                                                        {breakfast.ingredients.map((ing) => (


                                                            <div className="foodContainer__text__timing_time">
                                                                <h2 className="text-capitalize">{ing.label}</h2>
                                                                <p className="text-capitalize">{ing.description}</p>
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <button className="btn">view recipe <i className="fa fa-arrow-right"></i></button>
                                                </div>
                                            </div>

                                        ))}
                                        {this.state.activeType === "lunchMenu" && menu.lunchMenu.map((lunchMenu) => (
                                            <div className="foodContainer mb-5 mt-5">
                                                {lunchMenu.image === null ? (
                                                    <img
                                                        src={
                                                            "../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif"
                                                        }
                                                        alt="mealpic"
                                                        className="menuImg"

                                                    />
                                                ) : (
                                                    <img
                                                        src={`http://localhost:8080/files/${lunchMenu.image.id}`}
                                                        alt="mealpic"
                                                        className="menuImg"

                                                    />
                                                )}

                                                <div className="foodContainer__text">
                                                    <h1>{lunchMenu.label}</h1>




                                                    <p>
                                                        {lunchMenu.description}
                                                    </p>

                                                    <div className="foodContainer__text__timing">
                                                        {lunchMenu.ingredients.map((ing) => (


                                                            <div className="foodContainer__text__timing_time">
                                                                <h2 className="text-capitalize">{ing.label}</h2>
                                                                <p className="text-capitalize">{ing.description}</p>
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <button className="btn">view recipe <i className="fa fa-arrow-right"></i></button>
                                                </div>
                                            </div>

                                        ))}
                                        {this.state.activeType === "dinnerMenu" && menu.dinnerMenu.map((dinnerMenu) => (
                                            <div className="foodContainer mb-5 mt-5">
                                                {dinnerMenu.image === null ? (
                                                    <img
                                                        src={
                                                            "../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif"
                                                        }
                                                        alt="mealpic"
                                                        className="menuImg"

                                                    />
                                                ) : (
                                                    <img
                                                        src={`http://localhost:8080/files/${dinnerMenu.image.id}`}
                                                        alt="mealpic"
                                                        className="menuImg"

                                                    />
                                                )}

                                                <div className="foodContainer__text">
                                                    <h1>{dinnerMenu.label}</h1>




                                                    <p>
                                                        {dinnerMenu.description}
                                                    </p>

                                                    <div className="foodContainer__text__timing">
                                                        {dinnerMenu.ingredients.map((ing) => (


                                                            <div className="foodContainer__text__timing_time">
                                                                <h2 className="text-capitalize">{ing.label}</h2>
                                                                <p className="text-capitalize">{ing.description}</p>
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <button className="btn">view recipe <i className="fa fa-arrow-right"></i></button>
                                                </div>
                                            </div>

                                        ))}
                                    </>
                                ))}

                            </div>

                        ) : (
                            <div className="mt-5">
                                <ul className="o-vertical-spacing o-vertical-spacing--l">
                                    <li className="blog-post o-media">
                                        <div className="o-media__figure">
                                            <span
                                                className="skeleton-box"
                                                style={{ width: "100px", height: "80px" }}
                                            ></span>
                                        </div>
                                        <div className="o-media__body">
                                            <div className="o-vertical-spacing">
                                                <h3 className="blog-post__headline">
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "55%" }}
                                                    ></span>
                                                </h3>
                                                <p>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "80%" }}
                                                    ></span>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "90%" }}
                                                    ></span>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "83%" }}
                                                    ></span>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "80%" }}
                                                    ></span>
                                                </p>
                                                <div className="blog-post__meta">
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "70px" }}
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="blog-post o-media">
                                        <div className="o-media__figure">
                                            <span
                                                className="skeleton-box"
                                                style={{ width: "100px", height: "80px" }}
                                            ></span>
                                        </div>
                                        <div className="o-media__body">
                                            <div className="o-vertical-spacing">
                                                <h3 className="blog-post__headline">
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "55%" }}
                                                    ></span>
                                                </h3>
                                                <p>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "80%" }}
                                                    ></span>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "90%" }}
                                                    ></span>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "83%" }}
                                                    ></span>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "80%" }}
                                                    ></span>
                                                </p>
                                                <div className="blog-post__meta">
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "70px" }}
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="blog-post o-media">
                                        <div className="o-media__figure">
                                            <span
                                                className="skeleton-box"
                                                style={{ width: "100px", height: "80px" }}
                                            ></span>
                                        </div>
                                        <div className="o-media__body">
                                            <div className="o-vertical-spacing">
                                                <h3 className="blog-post__headline">
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "55%" }}
                                                    ></span>
                                                </h3>
                                                <p>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "80%" }}
                                                    ></span>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "90%" }}
                                                    ></span>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "83%" }}
                                                    ></span>
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "80%" }}
                                                    ></span>
                                                </p>
                                                <div className="blog-post__meta">
                                                    <span
                                                        className="skeleton-box"
                                                        style={{ width: "70px" }}
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}
export default connect(mapStateToProps)(Food);
