import {useEffect} from 'react';


function Filter({setActiveType,activeType,setFiltered,meals}) {

    useEffect(()=>{
        if (activeType==="All"){
            setFiltered(meals);
            return;
        }
        const filtered =meals.filter((meal)=>meal.type.name===activeType);
        setFiltered(filtered);
    },[activeType]);
    return ( 
        <div className="filter-container">
            <button className={activeType==="All" ? 'active':''} onClick={()=>setActiveType("All")}>All</button> 
            <button className={activeType==="BREAKFAST" ? 'active':''} onClick={()=>setActiveType("BREAKFAST")}>BreakFast</button> 
            <button className={activeType==="LUNCH" ? 'active':''} onClick={()=>setActiveType("LUNCH")}>Lunch</button> 

        </div>
     );
}

export default Filter;