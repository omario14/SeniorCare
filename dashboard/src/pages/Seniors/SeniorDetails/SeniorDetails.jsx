import { Button, ButtonGroup } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { GiReturnArrow } from 'react-icons/gi'
import seniorService from '../../../services/senior.service'
import '../AddSenior/AddSenior.css'
import './SeniorDetails.css'
import { BiSortAlt2 } from 'react-icons/bi';
import { Badge } from 'react-bootstrap'
import MedsArch from './MedsArch'
import Skeleton from 'react-loading-skeleton'

export default function SeniorDetails({ senior, addSeniorPage,socket, user }) {
  const [seniorArch, setSeniorArch] = useState([]);
  const [seniorArchsrtd, setSeniorArchsrtd] = useState([]);
  const [order, setOrder] = useState("DSC");
  const [bmi,setBmi]=useState('');
  const [msg,setMsg]=useState('');

  
  

  const myRef = useRef(null);



  const retrieveArch = (senior) => {
    seniorService.getArchiveBySenior(senior.senior.id)
      .then((res) => {
        setSeniorArch(res.data)
        setSeniorArchsrtd(res.data)
      });


  }







  useEffect(() => {
    retrieveArch({ senior });
  
    seniorService.calculBmi(senior.weight,senior.height)
    .then((res)=>{
      let bmin = res.data;
      setBmi(bmin.toFixed(1))
    if(bmin < 18.5) {
        setMsg("Underweight");
    }
    if(bmin >= 18.5 && bmin < 24.9) {
      setMsg("Normal weight");
    }
    if(bmin >= 25 && bmin < 29.9) {
      setMsg("Overweight");
    }
    if(bmin >= 30) {
      setMsg("Obesity");
    }
    })

  }, []);

  const sorting = (col) => {

    if (order === "ASC") {
      const sorted = [...seniorArch].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );

      setSeniorArch(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...seniorArch].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );

      setSeniorArch(sorted);
      setOrder("ASC");
    }
  }




  return (
    <>
      <div className='timeline_area section_padding_130' >
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "26px",
          }}
        >
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => addSeniorPage()}>
              <GiReturnArrow /> &nbsp;&nbsp; Return
            </Button>
          </ButtonGroup>
        </div>
        <div className="container-fluid py-5">

          <div className="row my-4">
            <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
              <div className="card">
                <div className="card-header pb-0">
                  <div className="row">

                    <div className="col-lg-6 col-7" style={{ display: "flex", justifyContent: "space-evenly" }}>
                      <div className="avatar avatar-xl position-relative">
                        {senior.file === null ?
                          <>

                            <img
                              src="..\..\..\assets\img\images\avatarNoimage.jpg"
                              alt="profile_image"
                              className="w-100 border-radius-lg shadow-sm"
                            />


                          </>
                          :
                          <img
                            src={process.env.REACT_APP_API_URL+`/files/${senior.file}`}
                            alt="profile_image"
                            className="w-100 border-radius-lg shadow-sm"
                          />

                        }

                      </div>
                      <div className='mt-2'>
                        <h6 className='text-capitalize'>{senior.name}</h6>
                        <p className="text-sm mb-0">
                          <i className="fa fa-check text-info" aria-hidden="true"></i>
                          <span className="font-weight-bold ms-1">{senior.name}'s BMI is : </span> {bmi && bmi}  <Badge pill bg="light" text="dark"><span> {msg}</span></Badge>
                         
                        </p>
                        
                      </div>

                    </div>
                    
                  </div>
                  <div className="row my-3">
                    <div className="panel">

                      <div className="panel-body bio-graph-info">

                        <div className="row">
                          <div className="bio-row text-capitalize">
                            <p><span>First Name </span>: {senior.name}</p>
                          </div>
                          <div className="bio-row text-capitalize" >
                            <p><span>Last Name </span>: {senior.lastname}</p>
                          </div>
                          <div className="bio-row text-capitalize">
                            <p><span>CIN </span>: {senior.cin}</p>
                          </div>
                          <div className="bio-row text-capitalize">
                            <p><span>Birthday</span>: {senior.dateOfBirth}</p>
                          </div>
                          <div className="bio-row text-capitalize">
                            <p><span>Adress </span>: {senior.adress}</p>
                          </div>
                          <div className="bio-row text-capitalize">
                            <p><span>Gender </span>: {senior.sex}</p>
                          </div>
                          <div className="bio-row text-capitalize">
                            <p><span>Phone </span>: {senior.telephone}</p>
                          </div>
                          <div className="bio-row text-capitalize">
                            <p><span>Civil Status </span>: {senior.famillySituation}</p>
                          </div>
                          <div className="bio-row text-capitalize">
                            <p><span>Interest</span>: {senior.centerOfInterest}</p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
            <div className="col-lg-4 col-md-6" >

              <div className="card  " style={{ overflowY: "auto", maxHeight: "60vh" }}>
                {seniorArchsrtd.map((arch, index) => (
                  <div key={index} style={{
                    height: "80vh",

                    top: "800px",
                    left: "0px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",

                  }}>
                    <div className="card-header pb-0 text-uppercase">
                      <h6>{arch.idArch} </h6>
                      <p className="text-sm text-center">

                        <span className="font-weight-bold  ">{arch.date} {arch.date === new Date().toISOString().split("T")[0] && <Badge bg="blue" > Today</Badge>}</span>
                      </p>
                    </div>




                    <div className="card-body medsCardBody p-3 mb-3" >
                      <div className="timeline timeline-one-side">





                        <div className="timeline-block mb-3" >

                          <MedsArch socket={socket} user={user} arch={arch} myRef={myRef} />


                        </div>



                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
            <div className='row my-4'>
              <div className='column'>
                <div className='card'>
                  <div className="card-body pb-2">
                    <div className="table-responsive" style={{ overflowX: "hidden" }}>
                      <table className="table align-items-center mb-0" >
                        <thead className='theadarchTable' >
                          <tr style={{ cursor: "pointer" }}>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" onClick={() => sorting("idArch")}>

                              {
                                order === "ASC" ?
                                  <BiSortAlt2 size={20} />
                                  :
                                  <BiSortAlt2 size={20} style={{ transform: "scaleY(-1)" }} />

                              }

                              Archive</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center" onClick={() => sorting("date")}>
                              Date</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center" onClick={() => sorting("meals")}>
                              Meals</th>

                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Medications</th>

                          </tr>
                        </thead>
                        <tbody style={{ overflowY: "auto", maxHeight: "20vh" }}>

                          {seniorArch.length === 0 ?
                            <tr>
                              <td colSpan="10">
                                <Skeleton count={5} />

                              </td>
                            </tr>
                            :
                            seniorArch.map((arch, index) =>

                              <tr key={index} style={arch.date === new Date().toISOString().split("T")[0] ? { border: "1pt solid #1471c9", background: "rgb(0,128,128,0.2)" } : {}}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-primary text-center me-2 d-flex align-items-center justify-content-center">
                                      <svg width="10px" height="10px" viewBox="0 0 40 44" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                        <title>document</title>
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                          <g transform="translate(-1870.000000, -591.000000)" fill="#FFFFFF" fillRule="nonzero">
                                            <g transform="translate(1716.000000, 291.000000)">
                                              <g transform="translate(154.000000, 300.000000)">
                                                <path className="color-background" d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z" opacity="0.603585379"></path>
                                                <path className="color-background" d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z"></path>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </svg>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">{arch.idArch}</h6>
                                    </div>
                                  </div>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <span className={arch.date === new Date().toISOString().split("T")[0] ? "text-xl text-dark font-weight-bold" : "text-xl font-weight-bold text-info"}>  {arch.date}</span>
                                </td>
                                <td >
                                  <div className="align-middle text-center text-sm d-flex    justify-content-center" style={{ alignItems: "center" }} >


                                    <input
                                      id={arch.idArch + "BREAKFAST"}
                                      checked={arch.checkedBreakfast}
                                      value={arch.idArch}
                                      name="customCheckbox"
                                      type="checkbox"
                                      className="align-middle-inputDetails   "
                                      readOnly
                                    />
                                    <label htmlFor={arch.idArch + "BREAKFAST"} className="align-middle-labelDetails text-secondary">BREAKFAST </label>
                                    <input
                                      id={arch.idArch + "LUNCH"}
                                      checked={arch.checkedLunch}
                                      value={arch.idArch}
                                      name="customCheckbox"
                                      type="checkbox"
                                      className="align-middle-inputDetails   "
                                      readOnly
                                    />
                                    <label htmlFor={arch.idArch + "LUNCH"} className="align-middle-labelDetails text-secondary">LUNCH </label>
                                    <input
                                      id={arch.idArch + "DINNER"}
                                      checked={arch.checkedDinner}
                                      value={arch.idArch}
                                      name="customCheckbox"
                                      type="checkbox"
                                      className="align-middle-inputDetails   "
                                      readOnly
                                    />
                                    <label htmlFor={arch.idArch + "DINNER"} className="align-middle-labelDetails text-secondary">DINNER </label>
                                  </div>
                                </td>
                                {/**
                              <td className="align-middle text-center text-sm">
                                {arch.meds.map((med, i) => (
                                  <span key={i} className="text-xs font-weight-bold text-info"> {med.dose} {med.doseType} of {med.label} {arch.meds.length > 1 && "AND"} </span>
                                ))}

                              </td>
 */}

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

                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>


      </div>

    </>
  )
}
