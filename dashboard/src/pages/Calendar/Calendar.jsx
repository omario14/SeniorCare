import React, { useContext, useEffect } from 'react'
import CalendarContent from './CalendarContent';
import CalendarState, { CalendarContext } from "./context/CalendarContext";
import Header from './Header';
import TaskForm from './TaskForm';
import "./Calendar.css"
import { useState } from 'react';
import seniorService from '../../services/senior.service';

export default function Calendar() {
  const {setDate } = useContext(CalendarContext);
  const [events,setEvents] = useState([]);
  useEffect(() => {
    seniorService.getEventsBySenior(0)
    .then((resultat)=>{
      setEvents(resultat.data)
      setDate(new Date());
    })
    
   
  }, [])
 
  
  return (
    <div className='calendarDiv' style={{fontFamily: "'Segoe UI',Tahoma,Geneva,Verdana,sans-serif",margin:"auto",display:"table-cell",verticalAlign:"middle"}}>
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
      <div className="container-fluid py-4" >
    <div className="containerCalendar">
     
        <Header />
        <CalendarContent events={events} />
        <TaskForm />
    
      
    </div>
    </div>
    </main>
    </div>
  )
}
