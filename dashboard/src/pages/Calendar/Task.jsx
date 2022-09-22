import React, { useContext } from 'react'
import {MdOutlineMenuBook } from 'react-icons/md';
import { CalendarContext } from './context/CalendarContext';

function Task({task, style}) {

    const {setTask} = useContext(CalendarContext);
    
    return (
        <p style={style} onClick={()=> {setTask(task)}}>{task.name} {task.senior && task.senior.id} {task.type==="menu" && <MdOutlineMenuBook color='#fffaa'/>}</p>
    )
}

export default Task