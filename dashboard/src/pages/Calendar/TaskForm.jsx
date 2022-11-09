import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { CalendarContext } from "./context/CalendarContext";
import { CirclePicker } from "react-color";
import seniorService from "../../services/senior.service";
import chefService from "../../services/chef.service";
import CustomizedAccordions from "./utils/Accordion";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function TaskForm() {

  const { select,date, task, setTask, saveTask, setDate, deleteTask } = useContext(CalendarContext);

  const [name, setName] = useState("");
  const [type, setType] = useState("all");
  const [color, setColor] = useState("#f44336");
  const [error, setError] = useState(false);
  const [menu, setMenu] = useState([]);
  const [archive, setArchive] = useState([]);

  useEffect(() => {
    if (task) {
      setName(task.name || "");
      setColor(task.color || "#f44336");


      if (task.color  === "#FFB85F") {
        chefService.getMenuByDate(JSON.stringify(task.date))
          .then((result) => {
            setMenu(result.data)

          })
      }
      if (task.name  === "food") {
        retrieveArch(task.senior, JSON.stringify(task.date).substring(1, 11))
       
      }
     


    }

    if(select==='0'){
      setType("all")
      
     }else{
     
      setType("senior")
     }

  }, [task]);


  const closeModal = () => {
    setTask(null);
    setError(false);
  };

  const _saveTask = (e) => {
e.preventDefault();
    if (name.trim().length < 1) {
      setError(true);
      return;
    }
    setError(false);

  
   
    let event = {
      id: task.id,
      date: date,
      name: name,
      color: color,
      type: type,
      senior: select
    }

    seniorService.addToCalendar(event).then(()=>{setDate(new Date())})
    saveTask({
      ...task,
      date: date,
      name: name,
      color: color,
    });

    

    closeModal();

  };

  const _deleteTask = (e) => {
    e.preventDefault();
    deleteTask(task.id);
    seniorService.removeEvent(task.id);
    setDate(date);
    closeModal();
    setError(false);
  }

  const disableName = (task) => {
    if (task) {
      if (task.color  === "#FFB85F" || task.color  === "#565656") {
        return true;
      } else {
        return false;
      }

    } else {
      return false;
    }
  }

  const retrieveArch = (senior, date) => {
    seniorService.getArchiveBySenior(senior.id)
      .then((res) => {
        setArchive(res.data.filter((arch) => {
          let arg;
         
          if (arch.date === date) {
            let archive = {
              idArch: arch.idArch,
              date: arch.date,
              checkedLunch: arch.checkedLunch,
              checkedDinner: arch.checkedDinner,
              checkedBreakfast: arch.checkedBreakfast,


            }
            arg = archive;
          }
          return arg
        })

        )
      });
  }

  return (
    <Modal
      isOpen={task != null}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Task Form"
    >
      <div className="task-form">

        <label></label>
        <input
          disabled={disableName(task)}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Task Name"
        />
        {task && task.color === "#FFB85F" ?
          (
            <>
              <label>Menu</label>
              <div style={{ justifyContent: "flex-start" }} >
                <CustomizedAccordions menu={menu} />
              </div>
            </>
          )
          : task && task.color  === "#565656" ?
            (
              <>
                <label>Food</label>
                <div style={{ justifyContent: "flex-start" }} >
                  {archive.map((archive,index)=>(

                  
                  <div key={index} className="align-middle text-center text-sm d-flex    justify-content-center" style={{ alignItems: "center" }} >


                    <input
                      id={archive.idArch + "BREAKFAST"}
                      checked={archive.checkedBreakfast}
                      value={archive.idArch}
                      name="customCheckbox"
                      type="checkbox"
                      className="align-middle-inputDetails   "




                    />
                    <label htmlFor={archive.idArch + "BREAKFAST"} className="align-middle-labelDetails text-secondary">BREAKFAST </label>
                    <input
                      id={archive.idArch + "LUNCH"}
                      checked={archive.checkedLunch}
                      value={archive.idArch}
                      name="customCheckbox"
                      type="checkbox"
                      className="align-middle-inputDetails   "


                    />
                    <label htmlFor={archive.idArch + "LUNCH"} className="align-middle-labelDetails text-secondary">LUNCH </label>
                    <input
                      id={archive.idArch + "DINNER"}
                      checked={archive.checkedDinner}
                      value={archive.idArch}
                      name="customCheckbox"
                      type="checkbox"
                      className="align-middle-inputDetails   "


                    />
                    <label htmlFor={archive.idArch + "DINNER"} className="align-middle-labelDetails text-secondary">DINNER </label>
                  </div>
                  ))}
                </div>
              </>
            )
            :
            (
              <>
                <label>Color</label>

                <div>
                  <CirclePicker

                    color={color}
                    onChange={(color, e) => {
                      setColor(color.hex);

                      
                    }}
                  />
                </div>
                <div>
                  <button className="button button-red" onClick={closeModal}>
                    Cancel
                  </button>
                  {task && task.id ? (
                    <button
                      className="button button-orange"
                      onClick={_deleteTask}
                    >
                      Delete
                    </button>
                  ) : null}
                  <button
                    className="button button-green"
                    onClick={_saveTask}
                  >
                    Save
                  </button>
                </div>
              </>
            )
        }

        {error ? <p className="error">The name of the task is required</p> : null}
      </div>
    </Modal>
  );
}

export default TaskForm;