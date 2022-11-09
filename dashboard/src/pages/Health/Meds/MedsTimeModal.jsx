import React, { useEffect, useState } from 'react'
import { InputGroup } from 'react-bootstrap';
import { BiPlusCircle } from 'react-icons/bi';
import { GiEyedropper, GiOverdose, GiPill, GiSpoon, GiSyringe } from 'react-icons/gi'
import { IoCalendarNumber } from 'react-icons/io5'
import seniorService from '../../../services/senior.service';

export default function MedsTimeModal({myRef,medDialog,setMedDialog,senior,dates}) {
    const [counter,setCounter] = useState(1);
    const [num,setNum] = useState([]);
    const [time,setTime] = useState([]);



useEffect(() => {
        if(medDialog){
          document.getElementById('health').style.overflow = 'hidden';
            
        }else{
          document.getElementById('health').style.overflow = 'unset';
        }
        
     
    }, [medDialog]);


    const archiveAdd=()=>{
    
      dates.forEach((d)=>{
        let archive ;
        seniorService.getArchiveById(`arch-${senior.id}-${d}`).then((res)=>{
          console.log(res)
          if (res.status==="200"){
            archive =  {
              idArch: `arch-${senior.id}-${d}`,
              senior: senior,
              date: new Date(d).toISOString().split("T")[0],
              checkedBreakfast: res.data.checkedBreakfast,
              checkedLunch: res.data.checkedLunch,
              checkedDinner: res.data.checkedDinner,
          } 
         
          }else{
            
             archive = {
              idArch: `arch-${senior.id}-${d}`,
              senior: senior,
              date: new Date(d).toISOString().split("T")[0],
             
          }
          
          }
          seniorService.addToArchive(archive).then(()=>{
            seniorService.putMedsToArchive(archive.idArch,myRef.current.idmed,false);
            newTimeDose(archive);
          })
        })
      
   
      
      })
      
    }

  

    const newTimeDose = (archive) => {
      
      for (let index = 0; index < counter; index++) {
      
        let doseTime = {
         time : time[index],
         med : myRef.current,
         arch : archive,
         rdose: num[index] 
        }
        
       
      seniorService.addMedicationDose(doseTime)
      .then(()=>{
        setMedDialog(false)
      })

    }
    }


    const handleChangeTime = (e) => {
      let times = [...time];
      times[e.target.id] = e.target.value;
      setTime(times);
    }
  

    const handleChange = (e) => {
      let nums = [...num];
      nums[e.target.id] = e.target.value;
      setNum(nums);
    }
    const handleFocus = (event) => event.target.select();
    const doseTime = (value) => {
        let content = [];
        for (let index = 0; index < counter; index++) {
         
          content.push(
          <div className="rowoo rowoo-space mx-4">
            <div key={index} className="col-2">
              <div className="input-groupp ">
                <label className="label text-white ">time</label>
                <input 
                className="form-control input--style-4 " 
                type="time"
                id={index}
                value={time[index] || ""}
                onChange={handleChangeTime} 
                />
              </div>
            </div>
            
            <div className="col-2"   >
              <div className="input-groupp ">
                <label className="label text-white ">dose</label>
                <InputGroup >
                        <input
                          type="number"
                          className="form-control input--style-4 "
                          id={index}
                          value={num[index] || ""}
                          name="doseVarible"
                          max={value.dose}
                          min="1"
                          onFocus={handleFocus}
                          onChange={handleChange}
                        
                        />
                      <InputGroup.Text className='text-lowercase'>{myRef.current.doseType}'s</InputGroup.Text>
                                    </InputGroup> 
              </div>
            </div>
           
          </div>)
    
        }
        return content;
      }
    
  return (
    <div>
        
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
            <div className="modal-content " style={{maxHeight: "70vh"}} >
              <div className="modal-body-med aas">
                <div className="text-right" > <i className="fa fa-close close" onClick={() => setMedDialog(false)}></i> </div>
                <div className="row">
                  <div className="col-md-7">

                    <div className="text-center mt-2 ">

                      {doseTime(myRef.current)}
                      {/*<img src="../../../assets/img/images/medic1.png" width="300" alt='medic1' /> */}
                      
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <div className="text-white mt-4 ms-5">
                      <span className="intro-1">{myRef.current.label} <span >
                        {(() => {
                          switch (myRef.current.doseType) {
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
                      <div className="d-flex flex-column mt-2" >
                        <span className="intro-2 mb-2"> <IoCalendarNumber /> <span className='ml-5'>{myRef.current.date}</span></span>
                        <span className="intro-2 mb-2"> <IoCalendarNumber /> <span className='ml-5'>{myRef.current.startDate}</span></span>
                        <span className="intro-2 mb-2"> <IoCalendarNumber /> <span className='ml-5'>{myRef.current.endDate}</span></span>
                        <span className="intro-2"><GiOverdose /> {myRef.current.dose} {myRef.current.doseType} </span>
                        Counter{counter}
                        Dose{num[0]}
                        Dose{num[1]}
                      </div>
                      <div className="d-flex flex-row mt-5 mb-4">

                        <label className=" m-2">
                          <div id="binCover">
                            <input className="binCheckbox" type="button" id="checkbox" 
                            onClick={(e)=>{
                              e.preventDefault();
                              if (counter< myRef.current.dose){
                              setCounter(counter+1)}
                              }} 
                              />
                               <div id="bin-icon" className='text-center mt-1'>
                              <BiPlusCircle  size={40}/>
                              </div>
                              <div id="layer"></div>
                            
                          </div>
                          <span className="intro-2 text-uppercase text-white"> Add</span>
                        </label>
                        <label className=" m-2">
                          <div id="binCover">
                            <input className="binCheckbox" type="checkbox" id="checkbox" checked={myRef.current.isDone} onClick={(e)=>{e.preventDefault();setCounter(counter-1)}}/>
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
                          <div  >
                            <input value={myRef.current.archmedpk} type="checkbox" checked={myRef.current.done}  onClick={archiveAdd}/>
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
