import { components } from 'react-select';
import AsyncSelect from "react-select/async";
import React, { Component } from 'react'
import ElderlyIcon from '@mui/icons-material/Elderly';

import {Controller, useFormContext} from 'react-hook-form'
import seniorService from '../../../services/senior.service';

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
      const {control}=useFormContext();
      return(

        <Controller control={control} 
        name="senior"
        
        render={({field})=>(
          <AsyncSelect
            defaultOptions
            getOptionLabel={e=>e.name+'  '+e.lastname}
            getOptionValue={e=>e.id}
            key={e => e.id}
            loadOptions={this.fetchData}
            components={{ DropdownIndicator }}
            {...field}
            
            />
        )}
           
          />
      )

    }
    return (
      <div>
         
         <Form/>
          
      </div>
    )
  }
}
