import React from 'react'
import CalendarContent from './CalendarContent';
import CalendarState from "./context/CalendarContext";
import Header from './Header';
import TaskForm from './TaskForm';
import "./Calendar.css"

export default function Calendar() {
  return (
    <div className='calendarDiv' style={{fontFamily: "'Segoe UI',Tahoma,Geneva,Verdana,sans-serif",margin:"auto",display:"table-cell",verticalAlign:"middle"}}>
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
      <div className="container-fluid py-4" >
    <div className="containerCalendar">
      <CalendarState>
        <Header />
        <CalendarContent  />
        <TaskForm />
      </CalendarState>
      
    </div>
    </div>
    </main>
    </div>
  )
}
