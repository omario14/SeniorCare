import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import seniorService from '../../services/senior.service';
import './home.css'
import { Button, FormControl, FormHelperText, InputAdornment, ListItem, OutlinedInput } from '@mui/material';
import { GiBodyHeight, GiWeightScale } from 'react-icons/gi';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '0.4px solid #000',
  borderRadius:"12px",
  boxShadow: 24,
  textAlign:'center',
  p: 4,
};

export default function BasicModal({open,closeFn}) {
 // state
 const [weight, setWeight] = useState(0)
 const [height, setHeight] = useState(0)
 const [bmi, setBmi] = useState('')
 const [msg, setMsg] = useState('')

 let calcBmi = (event) => {
    event.preventDefault();
    if (weight === 0 || height === 0) {
        alert('Please enter a valid weight and height')
      } else {
    seniorService.calculBmi(weight,height)
    .then((res)=>{
        let bmin = res.data.toFixed(1);
        setBmi(bmin)
      if(bmin < 18.5) {
          setMsg("Underweight");
      }
      if(bmin >= 18.5 && bmin < 24.9) {
        setMsg("Normal weight");
      }
      if(bmin >= 25 && bmin < 29.9) {
        setMsg("Overweight");
      }
      if(bmin >= 30) {
        setMsg("Obesity");
      }
      })
      }
 }
 

  //  show image based on bmi calculation
  let imgSrc;

  if (bmi < 1) {
    imgSrc = null
  } else {
    if(bmi < 25) {
      imgSrc = require('./assets/bodyShapes/underweight.png')
    } else if (bmi >= 25 && bmi < 30) {
      imgSrc = require('./assets/bodyShapes/healthy.png')
    } else {
      imgSrc = require('./assets/bodyShapes/overweight.png')
    }
  }

  return (
    <div>
   
      <Modal
        open={open}
        onClose={()=>{closeFn() ;setWeight(0);setHeight(0);setBmi('');setMsg('')}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='bmiContainer'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi} autocomplete="off">
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
           
            onChange={(event) => setWeight(event.target.value)}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
           <ListItem>
          <GiWeightScale />
          <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
          </ListItem>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-height"
           
            onChange={(event) => setHeight(event.target.value)}
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            aria-describedby="outlined-height-helper-text"
            inputProps={{
              'aria-label': 'height',
            }}
          />
          <ListItem>

          <GiBodyHeight />
          <FormHelperText id="outlined-height-helper-text">Height
															
														</FormHelperText>
                                                        </ListItem>
        </FormControl>
         
        <Box mb={4}>
          <Button variant="outlined" type='submit'>Submit</Button>
          </Box >
        </form>
        <Box mb={4}>
        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{msg}</p>
        </div>

        <div className='img-container'>
          <img src={imgSrc} alt=''></img>
        </div>
        </Box>
      </div>
        
        </Box>
      </Modal>
    </div>
  );
}
