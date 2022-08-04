import { Button, ButtonGroup } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { GiEyedropper, GiHealthPotion, GiPill, GiReturnArrow, GiSpoon, GiSyringe } from 'react-icons/gi'
import seniorService from '../../../services/senior.service'
import '../AddSenior/AddSenior.css'
import './SeniorDetails.css'
import { BiSortAlt2 } from 'react-icons/bi';
import { Badge } from 'react-bootstrap'

export default function SeniorDetails({ senior, addSeniorPage }) {
  const [seniorArch, setSeniorArch] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [colm, setColm] = useState("idArch");
  const [meds, setMeds] = useState([]);
  const [medDialog, setMedDialog] = useState(false);

  const myRef = useRef(null);

  const retrieveArch = (senior) => {
    console.log("seniorzz", senior.senior)
    seniorService.getArchiveBySenior(senior.senior.id)
      .then((res) => {
        setSeniorArch(res.data)
      });

  }


  useEffect(() => {
    retrieveArch({ senior });
    seniorService.getMedicationBySenior(senior.id).then((res) => {
      setMeds(res.data);
    })
    console.log("seniorArch", seniorArch)

  }, []);

  const sorting = (col) => {
    setColm(col);
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
            <Button >
              <GiHealthPotion /> &nbsp;&nbsp; Add New Menu Plan
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
                            src={`http://localhost:8080/files/${senior.file}`}
                            alt="profile_image"
                            className="w-100 border-radius-lg shadow-sm"
                          />

                        }

                      </div>
                      <div className='mt-2'>
                        <h6>{senior.name}</h6>
                        <p className="text-sm mb-0">
                          <i className="fa fa-check text-info" aria-hidden="true"></i>
                          <span className="font-weight-bold ms-1">30 done</span> this month
                        </p>
                      </div>

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
                            <p><span>Residance </span>: {senior.residance}</p>
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
                {seniorArch.map((arch, index) => (
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




                    <div className="card-body medsCardBody p-3 pb-0" onClick={() => setMedDialog(true)}>
                      <div className="timeline timeline-one-side">




                        <div className="timeline-block mb-3" >
                          {
                            arch.meds.map((med) => (
                              <div className='medsCardBodyItem' onClick={() => { setMedDialog(true); myRef.current = med }}>
                                <span className="timeline-step">
                                  {(() => {
                                    switch (med.doseType) {
                                      case "PILL":
                                        return <GiPill className='iconDose' />
                                        break;
                                      case "SPOON":
                                        return <GiSpoon className='iconDose' />
                                      case "DROP":
                                        return <GiEyedropper className='iconDose' />
                                      case "INJECTION":
                                        return <GiSyringe className='iconDose' />
                                      default:
                                        break;
                                    }
                                  })()}
                                </span>
                                <div className="timeline-content">
                                  <div className='flex' style={{ display: "flex", justifyItems: "left", justifyContent: "space-between" }}>
                                    <div >
                                      <h6 className="text-dark text-sm font-weight-bold mb-0 text-capitalize">{med.label} </h6>

                                      <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">{med.idmed}</p>
                                    </div>
                                    <div className='' >
                                      {med.dose} {med.doseType}
                                    </div>
                                  </div>

                                </div>


                              </div>
                            ))}
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
                        <thead >
                          <tr style={{ cursor: "pointer" }}>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" onClick={() => sorting("idArch")}>

                              {
                                order === "ASC" ?
                                  <BiSortAlt2 size={20} />
                                  :
                                  <BiSortAlt2 size={20} style={{ transform: "scaleY(-1)" }} />

                              }

                              Archive</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" onClick={() => sorting("date")}>
                              Date</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" onClick={() => sorting("meals")}>
                              Meals</th>

                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Medications</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Completion</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Completion</th>
                          </tr>
                        </thead>
                        <tbody>

                          {seniorArch.map((arch, index) =>

                            <tr key={index}>
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
                                <span className="text-xs font-weight-bold text-info">  {arch.date}</span>
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




                                  />
                                  <label htmlFor={arch.idArch + "BREAKFAST"} className="align-middle-labelDetails text-secondary">BREAKFAST </label>
                                  <input
                                    id={arch.idArch + "LUNCH"}
                                    checked={arch.checkedLunch}
                                    value={arch.idArch}
                                    name="customCheckbox"
                                    type="checkbox"
                                    className="align-middle-inputDetails   "


                                  />
                                  <label htmlFor={arch.idArch + "LUNCH"} className="align-middle-labelDetails text-secondary">LUNCH </label>
                                  <input
                                    id={arch.idArch + "DINNER"}
                                    checked={arch.checkedDinner}
                                    value={arch.idArch}
                                    name="customCheckbox"
                                    type="checkbox"
                                    className="align-middle-inputDetails   "


                                  />
                                  <label htmlFor={arch.idArch + "DINNER"} className="align-middle-labelDetails text-secondary">DINNER </label>
                                </div>
                              </td>
                              <td className="align-middle text-center text-sm">
                                {arch.meds.map((med, i) => (
                                  <span key={i} className="text-xs font-weight-bold text-info"> {med.dose} {med.doseType} of {med.label} {arch.meds.length > 1 && "AND"} </span>
                                ))}

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
      {medDialog &&
        <div style={{
          position: "fixed",
          zIndex: 9999,
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.5)"

        }} onClick={() => setMedDialog(false)}>


          <div onClick={(e) => e.stopPropagation()} className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-right" onClick={() => setMedDialog(false)}> <i className="fa fa-close close" ></i> </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="text-center mt-2"> <img src="../../../assets/img/images/medic1.png" width="300" /> </div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-white mt-4">
                      <span className="intro-1">{myRef.current.label} <span >
                        {(() => {
                          switch (myRef.current.doseType) {
                            case "PILL":
                              return <GiPill className='iconDose' />
                              break;
                            case "SPOON":
                              return <GiSpoon className='iconDose' />
                            case "DROP":
                              return <GiEyedropper className='iconDose' />
                            case "INJECTION":
                              return <GiSyringe className='iconDose' />
                            default:
                              break;
                          }
                        })()}
                      </span></span>
                      <div className="mt-2"> <span className="intro-2">Gain access to analytic tools, desktop apps, templates, read-through, features, and autp-translate all for the price of a pro subscription</span> </div>
                      <div className="mt-4 mb-5"> 
                      <label class="toggleButton">
                        <input type="checkbox" />
                        <div>
                          <svg viewBox="0 0 44 44">
                            <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
                          </svg>
                        </div>
                      </label> </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      }
    </>
  )
}
