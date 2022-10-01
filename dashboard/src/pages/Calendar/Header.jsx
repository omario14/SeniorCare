
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useContext, useEffect, useState } from 'react'
import { CalendarContext } from './context/CalendarContext'
import seniorService from '../../services/senior.service';
import { ListItemAvatar, ListItemText } from '@mui/material';
import { FcCalendar } from "react-icons/fc";
import { makeStyles } from "@material-ui/core/styles";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    width: 200,
    "& .MuiOutlinedInput-input": {
      color: "green"
    },
    "& .MuiInputLabel-root": {
      color: "green"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "red"
    },
    "&:hover .MuiInputLabel-root": {
      color: "red"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "purple"
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "purple"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple"
    }
  }
});
function Header() {

  const { date, setDate, select, _select, setEvents } = useContext(CalendarContext);

  const [seniors, setSeniors] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  useEffect(() => {

    seniorService.getAll()
      .then(result => {
        const seniors = result.data;

        setSeniors(seniors);

      })
  }, [])

  useEffect(() => {
    setLoading(true);
    seniorService.getEventsBySenior(select)
      .then((resultat) => {
        setEvents(resultat.data)
        setLoading(false);
      })


  }, [select]);



  const handleChange = (event) => {
    _select(event.target.value);
  };
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];

  const addMonth = (value) => {
    const tmp = new Date(date.setMonth(date.getMonth() + value));
    setDate(tmp);
  }

  return (
    <header>
      <div className="month">
        <h1>{monthNames[date.getMonth()]} {date.getFullYear()}</h1>
      </div>
      <div className="navCalendar">
        <FormControl sx={{ m: 1, minWidth: 170 }}>
          <InputLabel id="demo-simple-select-helper-label">All</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={select}
            label="select"
            onChange={handleChange}
            classes={{ select: classes.root }}
            MenuProps={MenuProps}
            disabled={loading}
          >
           
            <MenuItem value="0">
              <ListItemAvatar >
                <FcCalendar />
              </ListItemAvatar>
              <ListItemText> <em>All</em>  {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}</ListItemText>
            </MenuItem>
            {seniors && seniors.map((s, i) => (


              <MenuItem key={i} value={s.id}>
                <ListItemAvatar >
                  <img style={{ borderRadius: "50%" }} width="40px" height="40px" src={`http://localhost:8080/files/${s.file}`} alt='mealImage' />
                </ListItemAvatar>

                <ListItemText> {s.name}  {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}</ListItemText>
              </MenuItem>

            ))}
          </Select>

        </FormControl>
        <button className="button button-white" onClick={() => addMonth(-1)}><svg width="52px" height="52px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g data-name="Group 132" id="Group_132"><path d="M38,52a2,2,0,0,1-1.41-.59l-24-24a2,2,0,0,1,0-2.82l24-24a2,2,0,0,1,2.82,0,2,2,0,0,1,0,2.82L16.83,26,39.41,48.59A2,2,0,0,1,38,52Z" /></g></svg></button>
        <button className="button button-white" onClick={() => setDate(new Date())}>Today</button>
        <button className="button button-white" onClick={() => addMonth(1)}><svg width="52px" height="52px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g data-name="Group 132" id="Group_132"><path d="M14,52a2,2,0,0,1-1.41-3.41L35.17,26,12.59,3.41a2,2,0,0,1,0-2.82,2,2,0,0,1,2.82,0l24,24a2,2,0,0,1,0,2.82l-24,24A2,2,0,0,1,14,52Z" /></g></svg></button>
      </div>
    </header>
  )
}

export default Header