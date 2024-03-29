import './Health.css'
import { TabTitle } from '../../utils/GeneralFunctions';
import { useState } from 'react';
import Form from '../../components/MultiForm/Form';
import Meds from './Meds/Meds';

export default function Health({title}) {
  TabTitle(title);
  const [stepperLoading, setStepperLoading] = useState("health");

  const onChangeStepperLoading = (pageName) => {
    setStepperLoading(pageName)
   
  }

  return (

    <div className='health'  id='health'>

      <main className="main-content position-relative max-height-vh-90 h-100 mt-1 border-radius-lg ">
       
        {
          stepperLoading==="health" ?

            <div className="container-fluid py-4">
              <div className="row mt-5">
                <div className="col-lg-6">
                  <div className="card h-100 p-3">
                    <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100" style={{ backgroundImage: "url('../assets/img/ivancik.jpg')" }}>
                      <span className="mask bg-gradient-dark"></span>
                      <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                        <h5 className="text-white font-weight-bolder mb-4 pt-2">Symptom Checker</h5>
                        <p className="text-white">Check Seniors symptoms and find out what could be causing them. It's fast, free and anonymous.
                        </p>
                        <a href='#' className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto " onClick={()=>onChangeStepperLoading("symptomChecker")}>
                          Start Checkup
                          <i className="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="card h-100 p-3">
                    <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100" style={{ backgroundImage: "url('../assets/img/ivancikk.jpg')" }}>
                      <span className="mask bg-gradient-dark"></span>
                      <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                        <h5 className="text-white font-weight-bolder mb-4 pt-2">Medication Planner</h5>
                        <p className="text-white">Manage and track  Senior's medications</p>
                        <a className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto" href="#" onClick={()=>onChangeStepperLoading("meds")}>
                         Meds
                          <i className="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : stepperLoading==="symptomChecker" ?
            <div className="mb-5">
              <Form  onChangeStepperLoading={onChangeStepperLoading}  />
            </div>
            :
            <Meds onChangeStepperLoading={onChangeStepperLoading} />
        }
      </main>

    </div>
  )
}
