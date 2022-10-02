import { Component } from 'react';
import { TabTitle } from '../../utils/GeneralFunctions';
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import './home.css';
import userService from '../../services/user.service';
import seniorService from '../../services/senior.service';
import { MdElderly } from "react-icons/md";
import { Navigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
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



class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalbmi: false,
      userNumber: 0,
      seniorNumber: 0,
      seniors: [],
      data: [],

    };
  }

  componentDidMount() {


    seniorService.countInterests().then((res) => {
      this.setState({
        seniors: res.data
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
  }

  mapToObj = () => {
    this.setState({
      data:
        Object.keys(this.state.seniors).map((key, i) => {
          return {
            key: key,
            value: this.state.seniors[key]
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
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
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
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
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
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-capitalize font-weight-bold">New Clients</p>
                          <h5 className="font-weight-bolder mb-0">
                            +3,462
                            <span className="text-danger text-sm font-weight-bolder">-2%</span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                          <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-capitalize font-weight-bold">Sales</p>
                          <h5 className="font-weight-bolder mb-0">
                            $103,430
                            <span className="text-success text-sm font-weight-bolder">+5%</span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                          <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
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
                    {/*<p className="text-sm ms-2"> (<span className="font-weight-bolder">+23%</span>) than last week </p>*/}
                    <div className="container border-radius-lg">
                      <div className="row">
                        {this.state.data.map((s) => (


                          <div className="col-3 py-3 ps-0">
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
                <div className="card z-index-2">
                  <div className="card-header pb-0">
                    <h6>Sales overview</h6>
                    <p className="text-sm">
                      <i className="fa fa-arrow-up text-success"></i>
                      <span className="font-weight-bold">4% more</span> in 2021
                    </p>
                  </div>
                  <div className="card-body p-3">
                    <div className="chart">
                      {Object.keys(this.state.seniors).map((key, i) => (
                        <p key={i}>
                          <span>{key}</span>
                          <span>{this.state.seniors[key]}</span>
                        </p>
                      ))


                      }
                    </div>
                  </div>
                </div>
                </div>
              </div>
              
            </div>
            <div className="row my-4">
              <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div className="col-lg-6 col-7">
                        <h6>Projects</h6>
                        <p className="text-sm mb-0">
                          <i className="fa fa-check text-info" aria-hidden="true"></i>
                          <span className="font-weight-bold ms-1">30 done</span> this month
                        </p>
                      </div>
                      <div className="col-lg-6 col-5 my-auto text-end">
                        <div className="dropdown float-lg-end pe-4">
                          <a className="cursor-pointer" href='/' id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-ellipsis-v text-secondary"></i>
                          </a>
                          <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                            <li><a className="dropdown-item border-radius-md" href=" /">Action</a></li>
                            <li><a className="dropdown-item border-radius-md" href=" /">Another action</a></li>
                            <li><a className="dropdown-item border-radius-md" href=" /">Something else here</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Companies</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Members</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Budget</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Completion</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img src="../assets/img/small-logos/logo-xd.svg" className="avatar avatar-sm me-3" alt="xd" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Soft UI XD Version</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="avatar-group mt-2">
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                  <img src="../assets/img/team-1.jpg" alt="team1" />
                                </a>
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                  <img src="../assets/img/team-2.jpg" alt="team2" />
                                </a>
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                  <img src="../assets/img/team-3.jpg" alt="team3" />
                                </a>
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                  <img src="../assets/img/team-4.jpg" alt="team4" />
                                </a>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-xs font-weight-bold"> $14,000 </span>
                            </td>
                            <td className="align-middle">
                              <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                  <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">60%</span>
                                  </div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-info w-60" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img src="../assets/img/small-logos/logo-atlassian.svg" className="avatar avatar-sm me-3" alt="atlassian" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Add Progress Track</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="avatar-group mt-2">
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                  <img src="../assets/img/team-2.jpg" alt="team5" />
                                </a>
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                  <img src="../assets/img/team-4.jpg" alt="team6" />
                                </a>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-xs font-weight-bold"> $3,000 </span>
                            </td>
                            <td className="align-middle">
                              <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                  <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">10%</span>
                                  </div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-info w-10" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img src="../assets/img/small-logos/logo-slack.svg" className="avatar avatar-sm me-3" alt="team7" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Fix Platform Errors</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="avatar-group mt-2">
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                  <img src="../assets/img/team-3.jpg" alt="team8" />
                                </a>
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                  <img src="../assets/img/team-1.jpg" alt="team9" />
                                </a>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-xs font-weight-bold"> Not set </span>
                            </td>
                            <td className="align-middle">
                              <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                  <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">100%</span>
                                  </div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img src="../assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm me-3" alt="spotify" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Launch our Mobile App</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="avatar-group mt-2">
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                  <img src="../assets/img/team-4.jpg" alt="user1" />
                                </a>
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                  <img src="../assets/img/team-3.jpg" alt="user2" />
                                </a>
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                  <img src="../assets/img/team-4.jpg" alt="user3" />
                                </a>
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                  <img src="../assets/img/team-1.jpg" alt="user4" />
                                </a>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-xs font-weight-bold"> $20,500 </span>
                            </td>
                            <td className="align-middle">
                              <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                  <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">100%</span>
                                  </div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img src="../assets/img/small-logos/logo-jira.svg" className="avatar avatar-sm me-3" alt="jira" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Add the New Pricing Page</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="avatar-group mt-2">
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                  <img src="../assets/img/team-4.jpg" alt="user5" />
                                </a>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-xs font-weight-bold"> $500 </span>
                            </td>
                            <td className="align-middle">
                              <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                  <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">25%</span>
                                  </div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-info w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="25"></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img src="../assets/img/small-logos/logo-invision.svg" className="avatar avatar-sm me-3" alt="invision" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Redesign New Online Shop</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="avatar-group mt-2">
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                  <img src="../assets/img/team-1.jpg" alt="user6" />
                                </a>
                                <a href=" /" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                  <img src="../assets/img/team-4.jpg" alt="user7" />
                                </a>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-xs font-weight-bold"> $2,000 </span>
                            </td>
                            <td className="align-middle">
                              <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                  <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">40%</span>
                                  </div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-info w-40" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="40"></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
                      © <script>
                        document.write(new Date().getFullYear())
                      </script>,
                      made with <i className="fa fa-heart"></i> by
                      <a href="https://www.creative-tim.com" className="font-weight-bold"  >Creative Tim</a>
                      for a better web.
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                      <li className="nav-item">
                        <a href="https://www.creative-tim.com" className="nav-link text-muted"  >Creative Tim</a>
                      </li>
                      <li className="nav-item">
                        <a href="https://www.creative-tim.com/presentation" className="nav-link text-muted"  >About Us</a>
                      </li>
                      <li className="nav-item">
                        <a href="https://creative-tim.com/blog" className="nav-link text-muted"  >Blog</a>
                      </li>
                      <li className="nav-item">
                        <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted"  >License</a>
                      </li>
                    </ul>
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