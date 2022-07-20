import React, { useState } from 'react'
import Select from 'react-select'
import chefService from '../../../services/chef.service';

export default function AddMealstoMenu(props) {
const [breakFastMenu,setBreakFastMenu]=useState([]);
    const onChangeSelectedMeal = (value) => {
        setBreakFastMenu(value)
        console.log(value)
       
    }
    return (
        <div style={{
            position: "fixed",
            zIndex: 9999,
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0,0,0,0.5)"


        }} onClick={() => { let menudish={
            breakFastMenu:breakFastMenu
           }
            chefService.updateMenu(props.value,menudish)
            props.setMealSelect(true);
        }}
        >

            <div className="dialogg" style={{ width: "350px", }}
                onClick={(e) => e.stopPropagation()}

            >
                {props.selectedList}
                <Select
                    onChange={onChangeSelectedMeal}
                    options={props.meals}
                    isClearable
                    placeholder="Select Interest 🎲"
                />

            </div>
        </div>
    )
}
