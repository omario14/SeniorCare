import { Component } from 'react';
import { TabTitle } from '../../utils/GeneralFunctions';
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import './home.css';
import userService from '../../services/user.service';
import seniorService from '../../services/senior.service';
import { MdElderly } from "react-icons/md";
import { Navigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge, Button, Tooltip } from '@mui/material';
import BasicModal from './bmiCalculatorModal';
import { FaBookReader, FaChess, FaMusic, FaTv } from "react-icons/fa";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import WeatherWidget from './WeatherWidget';
import BmiChart from './BmiChart';
import BirthDay from './BirthDay';
import chefService from '../../services/chef.service';
import { withStyles } from '@material-ui/styles';
import { GiMeal } from 'react-icons/gi';

const BlueOnGreenTooltip = withStyles({
  tooltip: {
    color: "#1a2228",
    backgroundColor: "rgba(250, 250, 255, 1)",
    textTransform: "uppercase"
  }

})(Tooltip);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalbmi: false,
      userNumber: 0,
      seniorNumber: 0,
      countInterestsList: [],
      data: [],
      menu: [],
      toggleConfig: false


    };
  }

  componentDidMount() {

    seniorService.countInterests().then((res) => {
      this.setState({
        countInterestsList: res.data
      })
      this.mapToObj();
    })

    userService.getUserNumber().then((res) => {
      this.setState({
        userNumber: res.data,
      })
    })
    seniorService.getSeniorNumber().then((res) => {
      this.setState({
        seniorNumber: res.data,
      })
    })
    chefService.getAllMenus().then((result) => {
      this.setState({
        menu: result.data,
      })
    });
  }

  mapToObj = () => {
    this.setState({
      data:
        Object.keys(this.state.countInterestsList).map((key, i) => {
          return {
            key: key,
            value: this.state.countInterestsList[key]
          }
        })
    })
  }

  iconCOI = (c) => {

    switch (c) {
      case "reading":

        return <FaBookReader color="white" size={14} />

      case "listening":

        return <FaMusic color="white" size={14} />

      case "playing":

        return <FaChess color="white" size={14} />

      case "watching":

        return <FaTv color="white" size={14} />


      default:
        break;
    }
  }
  render() {

    const { user: currentUser, t } = this.props;
    TabTitle(t("dashboard"));
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    const style = { color: "white", fontSize: "1.8em" }
    return (
      <div className='home'>
        <BasicModal open={this.state.modalbmi} closeFn={() => { this.setState({ modalbmi: false }) }} />
        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">


          <div className="container-fluid py-4">
            <div className="row ">
              <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-capitalize font-weight-bold">STAFF</p>
                          <h5 className="font-weight-bolder mb-0">
                            {this.state.userNumber}
                            &nbsp;&nbsp;
                            <span className="text-success text-sm font-weight-bolder">Users</span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">

                          <BsFillFileEarmarkPersonFill className="text-lg opacity-10 mt-3" aria-hidden="true" style={style} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-capitalize font-weight-bold">SENIOR</p>
                          <h5 className="font-weight-bolder mb-0">
                            {this.state.seniorNumber}
                            &nbsp;&nbsp;
                            <span className="text-success text-sm font-weight-bolder">Seniors</span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                          <MdElderly style={style} className="text-lg opacity-10 mt-3" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-capitalize font-weight-bold">Menus : {this.state.menu.length}</p>
                          <h5 className="font-weight-bolder mb-0">
                            <NavLink to="/food">
                            {this.state.menu.filter((item) => (item.date === new Date().toISOString().split("T")[0])).length !== 0 ?
                              <>
                                <span className="text-xs text-uppercase " style={{ color: 'green', cursor: "pointer" }}> Today's menu is ready </span>
                                <BlueOnGreenTooltip title="Today's menu is ready" placement="top">
                                  <Badge className="ping mb-2  ms-3" style={{ color: 'green', cursor: "pointer" }}  >
                                  </Badge>
                                
                                </BlueOnGreenTooltip>
                              </>

                              :
                              <>
                                <span className="text-xs text-uppercase " style={{ color: 'red', cursor: "pointer" }}> Today's menu is not ready yet </span>
                                <BlueOnGreenTooltip title="Today's menu is not ready yet" placement="top">
                                  <Badge className="ping mb-2 ms-3" style={{ color: 'red', cursor: "pointer" }}  >

                                  </Badge>

                                </BlueOnGreenTooltip>
                              </>
                            }
                            </NavLink>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                          <GiMeal style={style} className="text-lg opacity-10 mt-3" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="row mt-4">
              <div className="col-lg-7 mb-lg-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="d-flex flex-column h-100">

                          <h5 className="font-weight-bolder">BMI Calculator</h5>
                          <p className="mb-5">(BMI) is a person’s weight in kilograms divided by the square of height in meters. It is an inexpensive and easy-to-perform method of screening for weight categories that may lead to health problems.
                          </p>
                          <Button className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto" onClick={() => { this.setState({ modalbmi: true }) }}>
                            Calculate
                            <i className="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                          </Button>
                        </div>
                      </div>
                      <div className="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                        <div className="bg-gradient-primary border-radius-lg h-100" onClick={() => { this.setState({ modalbmi: true }) }}>
                          <img src="../assets/img/shapes/waves-white.svg" className="position-absolute h-100 w-50 top-0 d-lg-block d-none" alt="waves" />

                          <div className="position-relative d-flex align-items-center justify-content-center h-100 scaleImg">
                            <img className="w-50 position-relative z-index-2 pt-4" src="../assets/img/illustrations/bmi1.png" alt="scaleImg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="card h-100 p-3">
                  <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100" style={{ backgroundImage: "url('../assets/img/calendar1.jpg')" }}>
                    <span className="mask bg-gradient-dark"></span>
                    <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                      <h5 className="text-white font-weight-bolder mb-4 pt-2">Calendar</h5>
                      <p className="text-white">Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the opportunity first.</p>
                      <NavLink className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto" to="/calendar">
                        Read More
                        <i className="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-5 mb-lg-0 mb-4">
                <div className="card z-index-2">
                  <div className="card-body p-1">






                    <RadarChart
                      cx={250}
                      cy={200}
                      outerRadius={150}
                      width={500}
                      height={500}
                      data={this.state.data}
                    >

                      <PolarGrid />

                      <PolarAngleAxis dataKey="key" />

                      <PolarRadiusAxis />

                      <Radar
                        name="centreDinteret"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />


                    </RadarChart>



                    <h6 className="ms-2 mt-0 mb-0">What seniors most want to do </h6>

                    <div className="container border-radius-lg">
                      <div className="row">
                        {this.state.data.map((s, index) => (


                          <div key={index} className="col-3 py-3 ps-0">
                            <div className="d-flex mb-2">
                              <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-info text-center me-2 d-flex align-items-center justify-content-center">
                                {this.iconCOI(s.key)}
                              </div>
                              <p className="text-xs mt-1 mb-0 font-weight-bold text-capitalize">{s.key}</p>
                            </div>
                            <h4 className="font-weight-bolder">{s.value}</h4>
                            <div className="progress w-75">
                              <div className={`progress-bar bg-dark w-${s.value * 10}`} role="progressbar" aria-valuenow={s.value} aria-valuemin="0" aria-valuemax={this.state.data.length}></div>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="row">
                  <WeatherWidget />
                </div>
                <div className="row">
                  <BmiChart />

                </div>
              </div>

            </div>
            <div className="row my-4">
              <div className="col-lg-8 col-md-6 mb-md-0 mb-4">

                <BirthDay />


              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h6>Orders overview</h6>
                    <p className="text-sm">
                      <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                      <span className="font-weight-bold">24%</span> this month
                    </p>
                  </div>
                  <div className="card-body p-3">
                    <div className="timeline timeline-one-side">
                      <div className="timeline-block mb-3">
                        <span className="timeline-step">
                          <i className="ni ni-bell-55 text-success text-gradient"></i>
                        </span>
                        <div className="timeline-content">
                          <h6 className="text-dark text-sm font-weight-bold mb-0">$2400, Design changes</h6>
                          <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">22 DEC 7:20 PM</p>
                        </div>
                      </div>
                      <div className="timeline-block mb-3">
                        <span className="timeline-step">
                          <i className="ni ni-html5 text-danger text-gradient"></i>
                        </span>
                        <div className="timeline-content">
                          <h6 className="text-dark text-sm font-weight-bold mb-0">New order #1832412</h6>
                          <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 11 PM</p>
                        </div>
                      </div>
                      <div className="timeline-block mb-3">
                        <span className="timeline-step">
                          <i className="ni ni-cart text-info text-gradient"></i>
                        </span>
                        <div className="timeline-content">
                          <h6 className="text-dark text-sm font-weight-bold mb-0">Server payments for April</h6>
                          <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 9:34 PM</p>
                        </div>
                      </div>
                      <div className="timeline-block mb-3">
                        <span className="timeline-step">
                          <i className="ni ni-credit-card text-warning text-gradient"></i>
                        </span>
                        <div className="timeline-content">
                          <h6 className="text-dark text-sm font-weight-bold mb-0">New card added for order #4395133</h6>
                          <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">20 DEC 2:20 AM</p>
                        </div>
                      </div>
                      <div className="timeline-block mb-3">
                        <span className="timeline-step">
                          <i className="ni ni-key-25 text-primary text-gradient"></i>
                        </span>
                        <div className="timeline-content">
                          <h6 className="text-dark text-sm font-weight-bold mb-0">Unlock packages for development</h6>
                          <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">18 DEC 4:54 AM</p>
                        </div>
                      </div>
                      <div className="timeline-block">
                        <span className="timeline-step">
                          <i className="ni ni-money-coins text-dark text-gradient"></i>
                        </span>
                        <div className="timeline-content">
                          <h6 className="text-dark text-sm font-weight-bold mb-0">New order #9583120</h6>
                          <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">17 DEC</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="footer pt-3  ">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                  <div className="col-lg-6 mb-lg-0 mb-4">
                    <div className="copyright text-center text-sm text-muted text-lg-start">

                      © {new Date().getFullYear()},
                      made with <i className="fa fa-heart"></i> by
                      <a href="https://www.creative-tim.com" className="font-weight-bold"  >BenAmor Omar</a>
                      for a better web.
                    </div>
                  </div>
                  
                </div>
              </div>
            </footer>
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

export default connect(mapStateToProps)(Home);