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
        <div className="row" data-aos="fade-up" data-aos-delay="100">
        <div className="col-lg-12 d-flex justify-content-center">
            <ul id="menu-flters">
            <li className={activeType==="All" ? 'filter-active':''} onClick={()=>setActiveType("All")}>All</li> 
            <li className={activeType==="BREAKFAST" ? 'filter-active':''} onClick={()=>setActiveType("BREAKFAST")}>BreakFast</li> 
            <li className={activeType==="LUNCH" ? 'filter-active':''} onClick={()=>setActiveType("LUNCH")}>Lunch</li> 
            <li className={activeType==="DESSERTS" ? 'filter-active':''} onClick={()=>setActiveType("DESSERTS")}>Desserts</li> 
            <li className={activeType==="DINNER" ? 'filter-active':''} onClick={()=>setActiveType("DINNER")}>Dinner</li> 
            <li className={activeType==="DRINKS" ? 'filter-active':''} onClick={()=>setActiveType("DRINKS")}>Drinks</li> 
            </ul>
        </div>
    </div>
       
     );
}

export default Filter;