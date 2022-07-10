import React, { useState } from 'react'
import Meal from './Meal';

export  const uMealContext = React.createContext();
const MealContext= ()=> {
    const [ ingredients, setIngredients ]= useState([]);

  return (
    <div>
        <uMealContext.Provider value={{ingredients,setIngredients}}>
            <Meal/>
        </uMealContext.Provider>
    </div>
  )
}
export default MealContext;