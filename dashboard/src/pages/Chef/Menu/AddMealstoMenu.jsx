import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { GiHealthPotion, GiHotMeal, GiReturnArrow } from "react-icons/gi";
import { MdDinnerDining, MdFreeBreakfast } from "react-icons/md";
import Select from "react-select";
import chefService from "../../../services/chef.service";

export default function AddMealstoMenu(props) {
    const [date,setDate]=useState(new Date().toISOString().split("T")[0])
    const [breakFastMenu, setBreakFastMenu] = useState([]);
    const [lunchMenu, setLunchMenu] = useState([]);
    const [dinnerMenu, setDinnerMenu] = useState([]);
    const [selectListBF, setSelectListBF] = useState([]);
    const [selectListLUN, setSelectListLUN] = useState([]);
    const [selectListDIN, setSelectListDIN] = useState([]);
    const [mealCategory, setMealCategory] = useState("  ");

    useEffect(() => {
        setBreakFastMenu(props.meals);
        setLunchMenu(props.meals);
        setDinnerMenu(props.meals);
        console.log(date)
        return () => {
            setBreakFastMenu([]);
            setLunchMenu([]);
            setDinnerMenu([]);
        };
    }, []);

    const onChangeSelectedMeal = (value) => {
        setMealCategory(value.value);
        console.log("arrayId List breakfast : ", selectListBF);
        console.log("arrayId List lunch : ", selectListLUN);
        console.log("arrayId List dinner : ", selectListDIN);
    };
    
    

    const handleSave = (e)=>{
        e.preventDefault();

        let menu ={
            date:date,
            breakfastMenu:selectListBF,
            lunchMenu:selectListLUN,
            dinnerMenu:selectListDIN,
        }
        chefService.addNewMenu(menu)
        .then((data)=>{
            
            props.setMenu(data.data);
            props.setMealSelect(true);
            
           
        })

    }

    const options = [
        {
            value: "BREAKFAST",
            label: (
                <span>
                    <MdFreeBreakfast /> BreakFast
                </span>
            ),
        },
        {
            value: "LUNCH",
            label: (
                <span>
                    <GiHotMeal /> Lunch
                </span>
            ),
        },

        {
            value: "DINNER",
            label: (
                <span>
                    <MdDinnerDining /> Dinner
                </span>
            ),
        },
    ];
    return (
        <section className="timeline_area section_padding_130">
            <div
                style={{
                    position: "absolute",
                    top: "4px",
                    left: "15px",
                }}
            >
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={() => props.setMealSelect(true)}>
                        <GiReturnArrow /> &nbsp;&nbsp; Return
                    </Button>
                    <Button onClick={() => props.setMealSelect(false)}>
                        <GiHealthPotion /> &nbsp;&nbsp; Add New Menu Plan
                    </Button>
                </ButtonGroup>
            </div>

            <div className="card mt-6 card-4">
                <div className="card-body">
                    <h2
                        className="title"
                        style={{ lettreSpacing: "10px", textTransform: "uppercase" }}
                    >
                        Menu :
                    </h2>
                    <form onSubmit={handleSave}>
                        <div className="input-groupp mb-7">
                            <label className="label">Date</label>
                            <div className="input-groupp-icon">
                                <input
                                    onChange={(e)=>setDate(e.target.value)}
                                    className="input--style-4"
                                    type="date"
                                    name="Date"
                                    format="{yyyy-MM-dd}"
                                    min={date}
                                />
                            </div>
                        </div>

                        <div className="input-groupp" style={{ marginTop: "40px" }}>
                            <label className="label">Meals</label>
                        </div>
                        <div className="rs-select2 js-select-simple select--no-search">
                            <Select
                                onChange={onChangeSelectedMeal}
                                options={options}

                                placeholder="Select Meals Category "
                            />
                        </div>
                        <div className=" mb-4 pt-2" style={{ minHeight: "80px" }}>
                            <div class="card shadow border-0 mb-5">
                                <div class="card-body p-5">
                                    {mealCategory!==null ?
                                        <>
                                            <h2 class="h4 mb-1">{mealCategory}</h2>
                                            <p class="small text-muted font-italic mb-4">
                                                Choose your main dish.
                                            </p>
                                        </>
                                        :
                                        <>
                                            <h2 class="h4 mb-1">PLEASE CHOOSE MENU TYPE</h2>

                                        </>
                                    }

                                    <ul class="list-group">
                                        {mealCategory === "BREAKFAST" ? (
                                            <>
                                                {breakFastMenu.map((meal, i) => (
                                                    <li class="list-group-item rounded-0 d-flex align-items-center justify-content-between">
                                                        <div class="form-check custom-checkbox">
                                                            <input
                                                                class="form-check-input"
                                                                id={meal.id}
                                                                checked={meal.checkedBreakfast}
                                                                value={meal.id}
                                                                type="checkbox"
                                                                name="customCheckbox"
                                                                onChange={(e) => {

                                                                    setBreakFastMenu(breakFastMenu.map((data) => {
                                                                        if (data.id === meal.id) {
                                                                            data.checkedBreakfast = e.target.checked;
                                                                        }
                                                                        return data;
                                                                    }),
                                                                    )

                                                                    let arrayIds = [...selectListBF];
                                                                    if (e.target.checked) {
                                                                        let mealtr = {
                                                                            label: meal.label,
                                                                            description: meal.description,
                                                                            type: meal.type,
                                                                            image: meal.image,
                                                                            checkedBreakfast: 1,
                                                                            checkedLunch: meal.checkedLunch,
                                                                            checkedDinner: meal.checkedDinner,
                                                                        };

                                                                        chefService.updateMeal(
                                                                            e.target.value,
                                                                            mealtr
                                                                        );
                                                                        arrayIds = [
                                                                            ...selectListBF,
                                                                            e.target.value,
                                                                        ];
                                                                        
                                                                    } else {
                                                                        let mealtr = {
                                                                            label: meal.label,
                                                                            description: meal.description,
                                                                            type: meal.type,
                                                                            image: meal.image,
                                                                            checkedBreakfast: 0,
                                                                            checkedLunch: meal.checkedLunch,
                                                                            checkedDinner: meal.checkedDinner,
                                                                        };

                                                                        chefService.updateMeal(
                                                                            e.target.value,
                                                                            mealtr
                                                                        );
                                                                        arrayIds.splice(
                                                                            selectListBF.indexOf(e.target.value),
                                                                            1
                                                                        );
                                                                    }
                                                                    setSelectListBF(arrayIds);

                                                                }}

                                                            />
                                                            <label class="form-check-label" for={meal.id}>
                                                                <p class="mb-0">{meal.label}</p>
                                                                <span class="small font-italic text-muted">
                                                                {meal.description}
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <label for={meal.id}>
                                                            <img
                                                                src={`http://localhost:8080/files/${meal.image.id}`}
                                                                alt=""
                                                                width="60"
                                                            />
                                                        </label>
                                                    </li>
                                                ))}
                                            </>
                                        ) : mealCategory === "LUNCH" ? (
                                            <>
                                                {lunchMenu.map((meal, i) => (
                                                    <li key={i} class="list-group-item rounded-0 d-flex align-items-center justify-content-between">
                                                        <div class="form-check custom-checkbox">
                                                            <input
                                                                class="form-check-input"
                                                                id={meal.id}
                                                                checked={meal.checkedLunch}
                                                                value={meal.id}
                                                                type="checkbox"
                                                                name="customCheckbox"
                                                                onChange={(e) => {

                                                                    setLunchMenu(lunchMenu.map((data) => {
                                                                        if (data.id === meal.id) {
                                                                            data.checkedLunch = e.target.checked;
                                                                        }
                                                                        return data;
                                                                    }),
                                                                    )
                                                                   

                                                                    let arrayIds = [...selectListLUN];
                                                                    if (e.target.checked) {
                                                                        let mealtr = {
                                                                            label: meal.label,
                                                                            description: meal.description,
                                                                            type: meal.type,
                                                                            image: meal.image,
                                                                            checkedBreakfast: meal.checkedBreakfast,
                                                                            checkedLunch: 1,
                                                                            checkedDinner: meal.checkedDinner,
                                                                        };

                                                                        chefService.updateMeal(
                                                                            e.target.value,
                                                                            mealtr
                                                                        );
                                                                        arrayIds = [
                                                                            ...selectListLUN,
                                                                            e.target.value,
                                                                        ];
                                                                        
                                                                    } else {
                                                                        let mealtr = {
                                                                            label: meal.label,
                                                                            description: meal.description,
                                                                            type: meal.type,
                                                                            image: meal.image,
                                                                            checkedBreakfast: meal.checkedBreakfast,
                                                                            checkedLunch: 0,
                                                                            checkedDinner: meal.checkedDinner,
                                                                        };

                                                                        chefService.updateMeal(
                                                                            e.target.value,
                                                                            mealtr
                                                                        );
                                                                        arrayIds.splice(
                                                                            selectListLUN.indexOf(e.target.value),
                                                                            1
                                                                        );
                                                                    }
                                                                    setSelectListLUN(arrayIds);

                                                                }}

                                                            />
                                                            <label class="form-check-label" for={meal.id}>
                                                                <p class="mb-0">{meal.label}</p>
                                                                <span class="small font-italic text-muted">
                                                                {meal.description}
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <label for={meal.id}>
                                                            <img
                                                                src={`http://localhost:8080/files/${meal.image.id}`}
                                                                alt=""
                                                                width="60"
                                                            />
                                                        </label>
                                                    </li>
                                                ))}
                                            </>
                                        ) : mealCategory === "DINNER" ? (
                                            <>
                                                {dinnerMenu.map((meal, i) => (
                                                     <li key={i} class="list-group-item rounded-0 d-flex align-items-center justify-content-between">
                                                     <div class="form-check custom-checkbox">
                                                       <input
                                                         class="form-check-input"
                                                         id={meal.id}
                                                         checked={meal.checkedDinner}
                                                         value={meal.id}
                                                         type="checkbox"
                                                         name="customCheckbox"
                                                         onChange={(e) => {
                                                             
                                                               setDinnerMenu(dinnerMenu.map((data) => {
                                                                 if (data.id === meal.id) {
                                                                   data.checkedDinner = e.target.checked;
                                                                 }
                                                                 return data;
                                                               }),
                                                            )
                                   
                                                             let arrayIds = [...selectListDIN];
                                                             if (e.target.checked) {
                                                               let mealtr = {
                                                                 label: meal.label,
                                                                 description: meal.description,
                                                                 type: meal.type,
                                                                 image:meal.image,
                                                                 checkedBreakfast: meal.checkedBreakfast,
                                                                 checkedLunch:meal.checkedLunch,
                                                                 checkedDinner:1,
                                                               };
                                   
                                                               chefService.updateMeal(
                                                                 e.target.value,
                                                                 mealtr
                                                               );
                                                               arrayIds = [
                                                                 ...selectListDIN,
                                                                 e.target.value,
                                                               ];
                                                             } else {
                                                               let mealtr = {
                                                                 label: meal.label,
                                                                 description: meal.description,
                                                                 type: meal.type,
                                                                 image:meal.image,
                                                                 checkedBreakfast: meal.checkedBreakfast,
                                                                 checkedLunch:meal.checkedLunch,
                                                                 checkedDinner:0,
                                                               };
                                   
                                                               chefService.updateMeal(
                                                                 e.target.value,
                                                                 mealtr
                                                               );
                                                               arrayIds.splice(
                                                                 selectListDIN.indexOf(e.target.value),
                                                                 1
                                                               );
                                                             }
                                                             setSelectListDIN(arrayIds);
                                                            
                                                           }}
                         
                                                       />
                                                       <label class="form-check-label" for={meal.id}>
                                                         <p class="mb-0">{meal.label}</p>
                                                         <span class="small font-italic text-muted">
                                                           {meal.description}
                                                         </span>
                                                       </label>
                                                     </div>
                                                     <label for={meal.id}>
                                                       <img
                                                         src={`http://localhost:8080/files/${meal.image.id}`}
                                                         alt=""
                                                         width="60"
                                                       />
                                                     </label>
                                                   </li>
                                                ))}
                                            </>
                                        ) : mealCategory === null && (
                                            <h1></h1>
                                        )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="p-t-15">
                            <button className="btn btn--radius-2 btn--blue" type="submit">
                                <i
                                    class="fa fa-plus-circle fadd "
                                    style={{
                                        position: "relative",
                                        left: "-15px",
                                        bottom: "-2px",
                                    }}
                                />
                                ADD
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
