import { components } from 'react-select';
import AsyncSelect from "react-select/async";
import React, { Component } from 'react'
import SearchIcon from '@mui/icons-material/Search';


import { Controller, useFormContext } from 'react-hook-form'
import symptomsService from '../../../services/symptoms.service';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { Alert, AlertTitle } from '@mui/material';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));


export default class SelectSymptoms extends Component {
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
      inputValue: value,
    });


  };

  handleChange = (value) => {

    this.setState({
      selectedValue: value,
    });
    console.log("this is " + JSON.stringify(this.state.selectedValue))

  };

  fetchData = async () => {
    return symptomsService.getAll()
      .then(result => {
        const symptoms = result.data;

        return symptoms;

      })
  }


  render() {

    const CaretDownIcon = () => {
      return <SearchIcon />;
    };

    const DropdownIndicator = props => {
      return (
        <components.DropdownIndicator {...props}>
          <CaretDownIcon />
        </components.DropdownIndicator>
      );
    };


    const Form = () => {
      const { control,register ,formState: { errors }, clearErrors } = useFormContext();
      return (
        <>
          <Controller control={control}
            name="symptoms"
            render={({ field }) => (
              <>
                <AsyncSelect
                  defaultOptions
                  isMulti
                  isSearchable
                  getOptionLabel={e => e.label}
                  getOptionValue={e => e.id}
                  key={e => e.id}
                  loadOptions={this.fetchData}
                  components={{ DropdownIndicator }}
                  placeholder="Select Symptom"
                  ref={field}
                  {...field}

                />


              </>
            )}


          />
          <Controller
            name="symptoms"
            render={({ field }) => (
              <Controller
            name="symptomss"
            render={({ field }) => (
              <Paper
                control={control}
                {...register("allSymps",  {required:{value:true,message:"Please try to add more than one symptom. "}})}
                className='allSymptoms'

                sx={{
                  display: 'flex',
                  justifyContent: '',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  listStyle: 'none',
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
               
                 {(control._fields.symptoms._f.value.length===0 &&control._fields.symptomss._f.value.length===0)&&

                   <span className='mt-1'>
                   {errors.allSymps && (
                    <Alert variant="outlined" severity="warning">
                      <AlertTitle>
                      Warning
                      </AlertTitle>
                      {errors.allSymps.message}
                    </Alert>
                  )}
                </span>
                }
          
                {(control._fields.symptoms._f.value.map((detail,i) => {
                  return (
                    <>
                      <ListItem key={i}>
                        <Chip

                          label={detail.label}

                        />
                      </ListItem>

                    </>
                  )
                }

                ))}

                {(control._fields.symptomss._f.value.map((detail,i) => {
                  return (
                    <>
                      <ListItem key={i}>
                        <Chip

                          label={detail.label}

                        />
                      </ListItem>
                    </>
                  )
                }

                ))}  
              </Paper>
              )}  />)}
          />
        </>
      )

    }
    return (
      <div>


        <Form />

      </div>
    )
  }
}
