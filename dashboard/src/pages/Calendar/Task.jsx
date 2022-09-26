import React, { useContext } from 'react'
import {MdOutlineFastfood } from 'react-icons/md';
import { CalendarContext } from './context/CalendarContext';
import { GiHotMeal } from "react-icons/gi";
function Task({task, style}) {

    const {setTask} = useContext(CalendarContext);

    const eventType =(t)=>{
        switch (t) {
            case "menu" : return <GiHotMeal />
            case "food" : return <MdOutlineFastfood />
           
                
                
        
            default:
                break;
        }
    }
    
    return (
        <p style={style} onClick={()=> {setTask(task)}} className="text-capitalize">{task.name} {task.senior && task.senior.id} {eventType(task.name)}</p>
    )
}

export default Task