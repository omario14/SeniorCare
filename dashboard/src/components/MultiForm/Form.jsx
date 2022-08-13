import React from 'react';
import './Form.css';
import LinearStepper from '../../pages/Health/Stepper/LinearStepper';
import { CssBaseline, Container, Box } from "@material-ui/core";


export default function Form() {




  return (
    
    

    
      
       <div className="form " id="#form">
       
        <div className="form__container">
        <CssBaseline />
      <Container component={Box} p={2} >
       
          <LinearStepper />
      
      </Container>

    </div>
    </div>
  );
}
