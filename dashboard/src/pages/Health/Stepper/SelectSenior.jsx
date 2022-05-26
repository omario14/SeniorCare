import { components } from 'react-select';
import AsyncSelect from "react-select/async";
import React, { Component } from 'react'
import httpCommon  from '../../../http-common';
import ElderlyIcon from '@mui/icons-material/Elderly';
import authHeader from '../../../services/auth-header';

import {Controller, useFormContext} from 'react-hook-form'

export default class SelectSenior extends Component {
    constructor(props) {
        super(props);
        
        this.onInputChange = this.onInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
          inputValue: '',
          selectedValue: null,
        };
      }

    
      onInputChange = (value) => {
      
          this.setState({
            inputValue:value,
          });
         
        
      };

      handleChange = (value) => {
        console.log("valuesss"+value)
        this.setState({ 
            selectedValue:value, 
        });
        console.log("this is "+JSON.stringify(this.state.selectedValue))
       
      };

      fetchData= async ()=> {
        return httpCommon.get("/retrieveAllSeniors", { headers: authHeader()})
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
    const options = [
        { value: 'reading', label: '📖 Reading' },
        { value: 'watching', label: '📺 Watching' },
        { value: 'playing', label: '♟️ Playing' },
        { value: 'listening', label: '📻 Listening' }
    ]
    

    const Form =()=>
    {
      const {control}=useFormContext();
      return(

        <Controller control={control} 
        name="senior"
        render={({field})=>(
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={this.selectedValue}
            getOptionLabel={e=>e.name+'  '+e.lastname}
            getOptionValue={e=>e.id}
            loadOptions={this.fetchData}
            onInputChange={this.onInputChange}
            onChange={this.handleChange}
            components={{ DropdownIndicator }}
            {...field}
            />
        )}
           
          />
      )

    }
    return (
      <div>
         <div> {JSON.stringify(this.state.selectedValue || {},null,2)}</div>
         <Form/>
          
      </div>
    )
  }
}
