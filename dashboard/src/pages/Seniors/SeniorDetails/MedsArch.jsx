import { makeStyles } from '@material-ui/styles';
import { Badge } from '@mui/material';

import React, { useEffect, useState } from 'react'
import { InputGroup } from 'react-bootstrap';
import { GiEyedropper, GiOverdose, GiPill, GiSpoon, GiSyringe } from 'react-icons/gi';
import { IoCalendarNumber } from 'react-icons/io5';
import seniorService from '../../../services/senior.service';

const useStyles = makeStyles((theme) => ({
  badge: {
    fontSize: 50
  }
}));

export default function MedsArch({ arch, myRef, socket, user }) {
  const classes = useStyles();
  const [meds, setmeds] = useState([]);
  const [medDialog, setMedDialog] = useState(false);
  const [doseTimeState, setDoseTimeState] = useState([]);
  useEffect(() => {
   
    seniorService.getMedsByArchive(arch.idArch)
      .then((res) => {
        setmeds(res.data.map((d) => {

          return {
            archive: d.archive,
            done: d.isDone,
            meds: d.meds,
            archmedpk: d.archmedpk,

          };

        }));
      })


  }, [])


  const total=(doseTimeState.reduce((total,currentItem) =>  total = total + Number(currentItem.done) , 0 ));


  useEffect(() => {
    if(myRef.current){
    setmeds(meds.map((data) => {
      if (data.archmedpk === myRef.current.archmedpk) {
        data.done = (total===doseTimeState.length);
      }
      return data;
    }));

    if (total===doseTimeState.length) {
     
      seniorService.putMedsToArchive(myRef.current.archive.idArch, myRef.current.meds.idmed, true)
      
    } else {
      seniorService.putMedsToArchive(myRef.current.archive.idArch, myRef.current.meds.idmed, false)
    }
  }
  }, [doseTimeState])
  


  return (
    <div>
      {meds.length !== 0 ? meds.map((med, index) => (


        <div key={index} className='medsCardBodyItem'
          onClick={() => {
            
            myRef.current = med
            seniorService.getDoseTimeByMed(med.archive.idArch,med.meds.idmed)
              .then((res) => {
                setDoseTimeState(
                  res.data.map((d) => {
                    return {
                      id: d.id,
                      time: d.time,
                      rdose: d.rdose,
                      reminded:d.reminded,
                      arch:d.arch,
                      done: d.taken,     
                    };
                   
                
               

              }))
              })
              setMedDialog(true);
          }}>
          <span className="timeline-step">
            <Badge

              color={med.done ? 'success' : 'error'}
              badgeContent={10}
              variant='dot'
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              classes={{ badge: classes.badge }}
            >
              {(() => {
                switch (med.meds.doseType) {
                  case "PILL":
                    return <GiPill className='iconDose' />

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
            </Badge>
          </span>
          <div className="timeline-content">
            <div className='flex' style={{ display: "flex", justifyItems: "left", justifyContent: "space-between" }}>
              <div >
                <h6 className="text-dark text-sm font-weight-bold mb-0 text-capitalize">{med.meds.label} </h6>

                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">{med.meds.idmed}</p>
              </div>
              <div className='' >
                {med.meds.dose} {med.meds.doseType}
              </div>
            </div>

          </div>


        </div>
      )) :
        <span className='vertical-center'>There is no Meds for this day</span>
      }



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


          <div onClick={(e) => e.stopPropagation()} className="modal-dialog modal-lg modal-drg">
            <div className="modal-content">
              <div className="modal-body-med">
                <div className="text-right" > <i className="fa fa-close close" onClick={() => setMedDialog(false)}></i> </div>
                <div className="row">
                  <div className="col-md-7">

                    <div className="text-center mt-2 ">

                      {doseTimeState.map((d, index) => (
                      

                        <div key={index} className="rowoo rowoo-space mx-4">
                          <div className="col-2">
                            <div className="input-groupp ">
                              <label className="label text-white ">time</label>
                              <input
                                className="form-control input--style-4 "
                                type="time"
                                readOnly
                                id={index}
                                value={d.time}

                              />
                            </div>
                          </div>

                          <div className="col-3"   >
                            <div className="input-groupp ">
                              <label className="label text-white ">dose</label>
                              <InputGroup >
                                <input
                                  type="number"
                                  className="form-control input--style-4 "
                                  id={index}
                                  readOnly
                                  value={d.rdose}
                                  name="doseVarible"
                                />
                                <InputGroup.Text className='text-lowercase'>{myRef.current.meds.doseType}{myRef.current.meds.doseType > 1 && "s"}</InputGroup.Text>
                              </InputGroup>
                            </div>
                          </div>
                          <div className='col-3 '>
                          <div className="input-groupp d-flex flex-row  my-2">
                          <label className="toggleButton m-4 ">
                          <div>
                            <input  value={d.id} type="checkbox" checked={d.done} onChange={(e) => {
                              setDoseTimeState(doseTimeState.map((data) => {
                                if (data.id === d.id) {
                                  data.done = e.target.checked;
                                }
                                return data;
                              }));

                              if (e.target.checked) {
                              
                                seniorService.putDoseTimeDone(d.id, true)
                              } else {
                                seniorService.putDoseTimeDone(d.id, false)
                              }


                            }} />
                            <div>
                              <svg viewBox="0 0 44 44">
                                <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
                              </svg>
                            </div>
                          </div>
                          {d.done ? (
                            <span className="intro-2 text-uppercase text-white text-center"> Done</span>)
                            :
                            <span className="intro-2 text-uppercase text-white  "> Take</span>
                          }
                        </label>
                          </div> 

                        </div>
                        </div>
                      ))

                      }
                     

                    </div>
                  </div>
                  <div className="col-md-5 ">
                    <div className="text-white mt-4 ms-1">
                     
                      <span className="intro-1 ">{myRef.current.meds.label}  <span >
                        {(() => {
                          switch (myRef.current.meds.doseType) {
                            case "PILL":
                              return <GiPill className='iconDose' />

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
                      <div className="d-flex flex-column mt-7" >
                        <span className="intro-2 mb-2"> <IoCalendarNumber /> <span className='ml-5'>{myRef.current.archive.date}</span></span>
                        <span className="intro-2"><GiOverdose /> {myRef.current.meds.dose} {myRef.current.meds.doseType} </span>
                       
                      </div>
                      <div className="d-flex flex-row mt-5 mb-4">

                        
                        <label className=" m-2">
                          <div id="binCover">
                            <input className="binCheckbox" type="checkbox" id="checkbox"  onClick={(e)=>{e.preventDefault();seniorService.removeArchMedByMedAndArch(myRef.current.meds.idmed,myRef.current.archive.idArch);setmeds(meds.filter(item => item.archmedpk !== myRef.current.archmedpk));setMedDialog(false)}}/>
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
                          <span className="intro-2 text-uppercase text-white"> delete</span>
                        </label>

                        <label className="toggleButton m-2">
                          <div>
                            <input value={myRef.current.archmedpk} type="checkbox" checked={total===doseTimeState.length}  readOnly/>
                            <div>
                              <svg viewBox="0 0 44 44">
                                <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
                              </svg>
                            </div>
                          </div>
                          {myRef.current.done ? (
                            <span className="intro-2 text-uppercase text-white"> Done</span>)
                            :
                            <span className="intro-2 text-uppercase text-white"> Take</span>
                          }
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      }
    </div>
  )
}
