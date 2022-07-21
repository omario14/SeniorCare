import React, { useState } from 'react'
import { GiHotMeal } from 'react-icons/gi';
import { MdDinnerDining, MdFreeBreakfast } from 'react-icons/md';
import Select from 'react-select'
import chefService from '../../../services/chef.service';

export default function AddMealstoMenu(props) {
    const [breakFastMenu, setBreakFastMenu] = useState([]);
    const [val, setVal] = useState([]);

    const handleAdd = () => {
        const abc = [...val, []]
        setVal(abc);
    }
    const onChangeSelectedMeal = (value) => {
        setBreakFastMenu(value)
        console.log(value)

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
        
      
                <div class="container-fluidd px-1 px-sm-4 py-5 mx-auto">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-10 col-lg-9 col-xl-8">
                            <div className="cardd cardMenu cardd-4">
                                <div className="cardd-body">
                                    <h2 className="title" style={{ lettreSpacing: '10px', textTransform: "uppercase" }}>Menu :</h2>
                                    <form >




                                        <div className="input-groupp mb-7">
                                            <label className="label">Date</label>
                                            <div className="input-groupp-icon">
                                                <input className="input--style-4" type="date"


                                                    name="Date"
                                                    format="{0:yyyy-MM-dd}" />

                                            </div>
                                        </div>





                                        <div className="input-groupp" style={{ marginTop: "40px" }}>
                                            <label className="label">Meals</label>




                                        </div>
                                        <div className="rs-select2 js-select-simple select--no-search" style={{ display: "flex", justifyContent: "space-evenly", marginTop: "22px" }} >
                                            <Select

                                                options={options}
                                                isClearable={true}
                                                placeholder="Select Ingredients Category "
                                            />
                                            <div class="mt-1 cancel fa fa-times text-danger fadd"></div>
                                        </div>
                                        <div className=" mb-4 pt-2" style={{ minHeight: "80px" }}>

                                            <div class="card shadow border-0 mb-5">
                                                <div class="card-body p-5">
                                                    <h2 class="h4 mb-1">Choose your main dish</h2>
                                                    <p class="small text-muted font-italic mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                    <ul class="list-group">
                                                        {props.meals.map((meal, i) => (
                                                            <li class="list-group-item rounded-0 d-flex align-items-center justify-content-between">
                                                                <div class="custom-control custom-radio">
                                                                    <input class="custom-control-input" id="customRadio1" type="checkbox" name="customRadio" />
                                                                    <label class="custom-control-label" for="customRadio1">
                                                                        <p class="mb-0">{meal.label}</p><span class="small font-italic text-muted">Classic marinara sauce, authentic old-world pepperoni</span>
                                                                    </label>
                                                                </div>
                                                                <label for="customRadio1"><img
                                                                    src={`http://localhost:8080/files/${meal.image.id}`} alt="" width="60" /></label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>



                                        <div className="p-t-15">
                                            <p className="btn btn--radius-2 btn--blue" onClick={() => handleAdd()} ><i class="fa fa-plus-circle fadd " style={{ position: "relative", left: "-15px", bottom: "-2px" }} />ADD</p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        
    )
}
