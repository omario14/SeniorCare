import React, { useEffect, useState } from 'react'
import { GiEyedropper, GiPill, GiSpoon, GiSyringe } from 'react-icons/gi';
import seniorService from '../../../services/senior.service';

export default function MedsArch({arch,setMedDialog,myRef}) {

    const [meds,setmeds]=useState([]);

    useEffect(() => {
      seniorService.getMedsByArchive(arch.idArch)
      .then((res)=>{
        setmeds(res.data);
      })
      console.log(meds)
    
     
    }, [])
    
  return (
    <div> {  meds.map(med=>(
       
      
          <div className='medsCardBodyItem' onClick={() => { setMedDialog(true); myRef.current = med }}>
          <span className="timeline-step">
            {(() => {
              switch (med.meds.doseType) {
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
                <h6 className="text-dark text-sm font-weight-bold mb-0 text-capitalize">{med.meds.label} </h6>

                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">{med.meds.idmed}</p>
              </div>
              <div className='' >
                {med.meds.dose} {med.meds.doseType}
              </div>
            </div>

          </div>


        </div>
        ))
         }</div>
  )
}
