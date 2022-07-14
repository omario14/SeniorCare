import {useEffect} from 'react';


function Filter({currentPage,setActiveType,activeType,setFiltered,meals}) {

    useEffect(()=>{
        if (activeType==="All"){
            setFiltered(meals);
            return;
        }
        const filtered =meals.filter((meal)=>meal.type.name===activeType);
        setFiltered(filtered);
        currentPage(1);
        console.log("data",filtered)
    },[activeType]);
    return ( 
        <div className="filter-container">
            <button className={activeType==="All" ? 'active':''} onClick={()=>setActiveType("All")}>All</button> 
            <button className={activeType==="BREAKFAST" ? 'active':''} onClick={()=>setActiveType("BREAKFAST")}>BreakFast</button> 
            <button className={activeType==="LUNCH" ? 'active':''} onClick={()=>setActiveType("LUNCH")}>Lunch</button> 
            <button className={activeType==="DESSERTS" ? 'active':''} onClick={()=>setActiveType("DESSERTS")}>DESSERTS</button> 
            <button className={activeType==="DINNER" ? 'active':''} onClick={()=>setActiveType("DINNER")}>DINNER</button> 
            <button className={activeType==="DRINKS" ? 'active':''} onClick={()=>setActiveType("DRINKS")}>DRINKS</button> 

        </div>
     );
}

export default Filter;