import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { TabTitle } from "../../utils/GeneralFunctions";
import './Food.css';
import './Food.scss';
import chefService from "../../services/chef.service";
import { Alert, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { Badge } from "react-bootstrap";
import { RiCake3Line } from "react-icons/ri";
import { MdDinnerDining } from "react-icons/md";
import { GiHotMeal } from "react-icons/gi";
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
                                        {this.state.menu.filter((m) => m.date === this.state.select).length !== 0 &&
                                            <>
                                                <button className={this.state.activeType === "breakfastMenu" ? 'button-value active' : 'button-value'} onClick={() => this.setState({ activeType: "breakfastMenu" })}>BreakFast <RiCake3Line /></button>
                                                <button className={this.state.activeType === "lunchMenu" ? 'button-value active' : 'button-value'} onClick={() => this.setState({ activeType: "lunchMenu" })}>Lunch <MdDinnerDining /></button>
                                                <button className={this.state.activeType === "dinnerMenu" ? 'button-value active' : 'button-value'} onClick={() => this.setState({ activeType: "dinnerMenu" })}>Dinner <GiHotMeal /></button>
                                            </>}
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
                                {this.state.menu.filter((m) => m.date === this.state.select).length !== 0 ?
                                    (
                                        this.state.menu.filter((m) => m.date === this.state.select).map((menu) => (
                                            <>

                                                {this.state.activeType === "breakfastMenu" &&

                                                    (menu.breakfastMenu.length !== 0 ?
                                                        (
                                                            menu.breakfastMenu.map((breakfast) => (
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
                                                                            src={process.env.REACT_APP_API_URL + `/files/${breakfast.image.id}`}
                                                                            alt="mealpic"
                                                                            className="menuImg"

                                                                        />
                                                                    )}

                                                                    <div className="foodContainer__text text-start " style={{ maxWidth: "850px" }}>
                                                                        <h1 className="text-start text-capitalize">{breakfast.label}</h1>




                                                                        <p className="text-capitalize text-sm">
                                                                            {breakfast.description}
                                                                        </p>

                                                                        <div className="foodContainer__text__timing scrollyb" style={{ maxWidth: "830px", overflowX: "auto" }}>
                                                                            {breakfast.ingredients.map((ing) => (



                                                                                <div className="foodContainer__text__timing_time"  >
                                                                                    <h2 className="text-capitalize text-nowrap">♦{ing.label} &nbsp; </h2>

                                                                                </div>
                                                                            ))}

                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            ))
                                                        )

                                                        :
                                                        (
                                                            <div className="messageEmpty d-flex">
                                                                <Alert variant={false} iconMapping={{
                                                                    success: <RiCake3Line fontSize="1.629rem" color="#6759ff" />,
                                                                }} sx={{ color: "#6759ff", marginTop: "70px", padding: "15px", paddingLeft: "15%", height: "70px", width: '100%', fontSize: "1.629rem", fontFamily: "fantasy" }} > <p>ooops there is no breakfast for this menu !</p> </Alert>
                                                                <img src={"../../../../assets/img/illustrations/woolly-man-sits-and-holds-a-mug-of-milk-1.png"} alt="woolymanimg" />
                                                            </div>
                                                        )
                                                    )
                                                }
                                                {this.state.activeType === "lunchMenu" &&

                                                    (menu.lunchMenu.length !== 0 ?


                                                        (
                                                            menu.lunchMenu.map((lunchMenu) => (
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
                                                                            src={process.env.REACT_APP_API_URL + `/files/${lunchMenu.image.id}`}
                                                                            alt="mealpic"
                                                                            className="menuImg"

                                                                        />
                                                                    )}

                                                                    <div className="foodContainer__text text-start " style={{ maxWidth: "850px" }}>
                                                                        <h1 className="text-start text-capitalize">{lunchMenu.label}</h1>




                                                                        <p className="text-capitalize text-sm">
                                                                            {lunchMenu.description}
                                                                        </p>

                                                                        <div className="foodContainer__text__timing scrollyb" style={{ maxWidth: "830px", overflowX: "auto" }}>
                                                                            {lunchMenu.ingredients.map((ing) => (



                                                                                <div className="foodContainer__text__timing_time"  >
                                                                                    <h2 className="text-capitalize text-nowrap">♦{ing.label} &nbsp; </h2>

                                                                                </div>
                                                                            ))}

                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            ))
                                                        )
                                                        :
                                                        (
                                                            <div className="messageEmpty d-flex">
                                                                <Alert variant={false} iconMapping={{
                                                                    success: <MdDinnerDining fontSize="1.629rem" color="#6759ff" />,
                                                                }} sx={{ color: "#6759ff", marginTop: "70px", padding: "15px", paddingLeft: "15%", height: "70px", width: '100%', fontSize: "1.629rem", fontFamily: "fantasy" }} > <p>ooops there is no lunch for this menu !</p> </Alert>
                                                                <img src={"../../../../assets/img/illustrations/woolly-man-sits-and-holds-a-mug-of-milk-1.png"}  alt="woolymanimg" />
                                                            </div>
                                                        ))
                                                }
                                                {this.state.activeType === "dinnerMenu" &&

                                                    (menu.dinnerMenu.length !== 0 ?
                                                        (
                                                            menu.dinnerMenu.map((dinnerMenu) => (
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
                                                                            src={process.env.REACT_APP_API_URL + `/files/${dinnerMenu.image.id}`}
                                                                            alt="mealpic"
                                                                            className="menuImg"

                                                                        />
                                                                    )}

                                                                    <div className="foodContainer__text text-start " style={{ maxWidth: "850px" }}>
                                                                        <h1 className="text-start text-capitalize">{dinnerMenu.label}</h1>




                                                                        <p className="text-capitalize text-sm">
                                                                            {dinnerMenu.description}
                                                                        </p>

                                                                        <div className="foodContainer__text__timing scrollyb" style={{ maxWidth: "830px", overflowX: "auto" }}>
                                                                            {dinnerMenu.ingredients.map((ing) => (



                                                                                <div className="foodContainer__text__timing_time"  >
                                                                                    <h2 className="text-capitalize text-nowrap">♦{ing.label} &nbsp; </h2>

                                                                                </div>
                                                                            ))}

                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            )))
                                                        :
                                                        (
                                                            <div className="messageEmpty d-flex">
                                                                <Alert variant={false} iconMapping={{
                                                                    success: <GiHotMeal fontSize="1.629rem" color="#6759ff" />,
                                                                }} sx={{ color: "#6759ff", marginTop: "70px", padding: "15px", paddingLeft: "15%", height: "70px", width: '100%', fontSize: "1.629rem", fontFamily: "fantasy" }} > <p>ooops there is no dinner for this menu !</p> </Alert>
                                                                <img src={"../../../../assets/img/illustrations/woolly-man-sits-and-holds-a-mug-of-milk-1.png"}  alt="woolymanimg" />
                                                            </div>
                                                        ))}
                                            </>

                                        ))
                                    )
                                    :
                                    (
                                        <div className="messageEmpty d-flex">
                                            <Alert variant={false} iconMapping={{
                                                success: <GiHotMeal fontSize="1.629rem" color="#6759ff" />,
                                            }} sx={{ color: "#6759ff", marginTop: "70px", padding: "15px", paddingLeft: "15%", height: "70px", width: '100%', fontSize: "1.629rem", fontFamily: "fantasy" }} > <p>Menu is not ready yet for this day. <br /> Try to change the date</p> </Alert>
                                            <img src={"../../../../assets/img/illustrations/woolly-man-sits-and-holds-a-mug-of-milk-1.png"} alt="woolymanimg"/>
                                        </div>
                                    )
                                }

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
