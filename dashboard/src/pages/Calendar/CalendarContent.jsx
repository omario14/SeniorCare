import React, { useContext, useEffect } from "react";
import seniorService from "../../services/senior.service";
import { CalendarContext } from "./context/CalendarContext";
import Day from "./Day";

function CalendarContent() {

  const { date, days, setDate } = useContext(CalendarContext);

 
  useEffect(() => {
    setDate(new Date());
    // eslint-disable-next-line
    seniorService.getCalendarEvents().then((res)=>{
      let db=res.data;
      console.log("res",res.data)
      localStorage.setItem("$calendar_db", JSON.stringify(db));
  })
  
  }, []);

  if (days.length < 1) return null;

  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div >
        <div className="calendar borderless day-names">
          {names.map(name=><h5 key={name}>{name}</h5>)}
        </div>
        <div className="calendar" style={{height:"500px"}}>
          {days.map(day=><Day key={day.date} day={day} date={date} setDate={setDate} />)}     
        </div>
    </div>
  );
}

export default CalendarContent;