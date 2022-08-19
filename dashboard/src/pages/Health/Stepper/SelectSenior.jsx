import { components } from 'react-select';
import AsyncSelect from "react-select/async";
import React, { Component } from 'react'
import ElderlyIcon from '@mui/icons-material/Elderly';

import {Controller, useFormContext} from 'react-hook-form'
import seniorService from '../../../services/senior.service';
import { Alert, AlertTitle } from '@mui/material';

export default class SelectSenior extends Component {
    constructor(props) {
        super(props);
        
       
        this.fetchData = this.fetchData.bind(this);
       this.state={
        seniorError:false,
       }
      }

    
      

      fetchData= async ()=> {
        return seniorService.getAll()
            .then(result => {
                const seniors = result.data;
                
                return seniors;
                
            })
    }
    
    
  render() {
      
const CaretDownIcon = () => {
    return <ElderlyIcon />;
};

const DropdownIndicator = props => {
    return ( 
        <components.DropdownIndicator {...props}>
            <CaretDownIcon />
        </components.DropdownIndicator>
    );
};


    const Form =()=>
    {
      const {control,register ,formState: { errors }}=useFormContext();
      return(

        <>
       
        <Controller 
        name="senior"
        
       
        control={control} 
        render={({field})=>(
          <>
          <AsyncSelect
           {...register("senior",  {required:{value:true,message:"Please select a senior "}})}
            defaultOptions
            getOptionLabel={e=>e.name+'  '+e.lastname}
            getOptionValue={e=>e.id}
            key={e => e.id}
            loadOptions={this.fetchData}
            components={{ DropdownIndicator }}
            {...field}
           
            />
            <div style={{marginTop:"25px"}}  >
            {errors.senior && (
             <Alert variant="filled" color='info' severity="success">
             
                {errors.senior.message}
              </Alert>
            )}
          </div>
          </>
        )}
           
          />
         
        </>
      )

    }
    return (
      <div>
         
         <Form/>
          
      </div>
    )
  }
}
