import { components } from 'react-select';
import AsyncSelect from "react-select/async";
import React, { Component } from 'react'
import SearchIcon from '@mui/icons-material/Search';


import { Controller, useFormContext } from 'react-hook-form'
import symptomsService from '../../../services/symptoms.service';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

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
      const { control } = useFormContext();
      return (
        <>
          <Controller control={control}
            name="symptoms"
            render={({ field }) => (
              <>
                <AsyncSelect
                  defaultOptions
                  isMulti
                  getOptionLabel={e => e.label}
                  getOptionValue={e => e.id}
                  key={e => e.id}
                  loadOptions={this.fetchData}
                  components={{ DropdownIndicator }}
                  placeholder="Select Symptom"
                  {...field}

                />

                <div></div>
              </>
            )}


          />
          <Controller
            name="symptomss"
            render={({ field }) => (
              <Paper
                control={control}
                className='allSymptoms'
                
                sx={{
                  display: 'flex',
                  justifyContent: '',
                  flexWrap: 'wrap',
                  flexDirection:'column',
                  listStyle: 'none',
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {(control._fields.symptoms._f.value.map(detail => {
                  return (
                    <>
                      <ListItem key={detail.id}>
                        <Chip

                          label={detail.label}

                        />
                      </ListItem>

                    </>
                  )
                }

                ))}

                {(control._fields.symptomss._f.value.map(detail => {
                  return (
                    <>
                      <ListItem key={detail.id}>
                        <Chip

                          label={detail.label}

                        />
                      </ListItem>
                    </>
                  )
                }

                ))}  </Paper>
            )}
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
