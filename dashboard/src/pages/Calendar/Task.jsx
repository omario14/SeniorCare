import React, { useContext } from 'react'
import { CalendarContext } from './context/CalendarContext';

function Task({task, style}) {

    const {setTask} = useContext(CalendarContext);

    return (
        <p style={style} onClick={()=> {setTask(task)}}>{task.name} {task.senior && task.senior.id}</p>
    )
}

export default Task