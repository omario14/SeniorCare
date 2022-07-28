import React from 'react'
import '../AddSenior/AddSenior.css'

export default function SeniorDetails({senior}) {
  return (
    <div className="container-fluid py-4">
           <div className="row my-4">
              <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div className="col-lg-6 col-7">
                        <h6>{senior.name}</h6>
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
                  <div className="card-body pb-2">
                    <div className="table-responsive" style={{overflowX:"hidden"}}>
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
    </div>
  )
}
