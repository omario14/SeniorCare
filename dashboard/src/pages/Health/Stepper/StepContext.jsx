import React, { useState } from 'react'
import Form from '../../../components/MultiForm/Form';

export  const multistepContext = React.createContext();
const StepContext= ()=> {
    const [ currentStep,setCurrentStep]= useState(0);
    const [ seniorData, setSeniorData ]= useState([]);
    const [ finalData, setFinalData ]= useState([]);

  return (
    <div>
        <multistepContext.Provider value={{currentStep,setCurrentStep,seniorData,setSeniorData,finalData,setFinalData}}>
            <Form/>
        </multistepContext.Provider>
    </div>
  )
}
export default StepContext;