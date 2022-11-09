import {useEffect} from 'react';
import { GiFruitBowl, GiHotMeal, GiMeal } from 'react-icons/gi';
import { MdDinnerDining } from 'react-icons/md';
import { RiCake3Line } from 'react-icons/ri';
import { SiBuymeacoffee } from 'react-icons/si';


function Filter({currentPage,setActiveType,activeType,setFiltered,meals}) {

    useEffect(()=>{
        if (activeType==="All"){
            setFiltered(meals);
            return;
        }
        const filtered =meals.filter((meal)=>meal.type.name===activeType);
        setFiltered(filtered); 
        currentPage(1);
        
    },[activeType]);
    return ( 
        <div className="row" data-aos="fade-up" data-aos-delay="100">
        <div className="col-lg-12 d-flex justify-content-center">
            <div id="buttons" >
            <button className={activeType==="All" ? 'button-value activeMeal':'button-value '} onClick={()=>setActiveType("All")}>All <GiMeal/></button> 
            <button className={activeType==="BREAKFAST" ? 'button-value activeMeal':'button-value '} onClick={()=>setActiveType("BREAKFAST")}>BreakFast <RiCake3Line/></button> 
            <button className={activeType==="LUNCH" ? 'button-value activeMeal':'button-value '} onClick={()=>setActiveType("LUNCH")}>Lunch <MdDinnerDining/> </button> 
            <button className={activeType==="DESSERTS" ? 'button-value activeMeal':'button-value'} onClick={()=>setActiveType("DESSERTS")}>Desserts <GiFruitBowl/></button> 
            <button className={activeType==="DINNER" ? 'button-value activeMeal':'button-value'} onClick={()=>setActiveType("DINNER")}>Dinner <GiHotMeal/></button> 
            <button className={activeType==="DRINKS" ? 'button-value activeMeal':'button-value'} onClick={()=>setActiveType("DRINKS")}>Drinks <SiBuymeacoffee/></button> 
            </div>
        </div>
    </div>
       
     );
}

export default Filter;