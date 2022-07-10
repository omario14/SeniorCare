
import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { GiHealthNormal, GiReturnArrow } from "react-icons/gi";
import chefService from "../../services/chef.service";
import Filter from "./FilterActions";




function MealCard(props) {

    
    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeType, setActiveType] = useState("All");




    const retrieveMeals =  () => {
        try {
             chefService.getAllMeals()
                .then((result) => {
                    console.log("aaaaaaa",result)
                    setMeals(result.data);
                })
               
                setLoading(true);
            console.log("data",meals)
        } catch (e) {
            console.log(e)
        }


    }

    useEffect(() => {
        
        
        retrieveMeals();
        return () => {
            console.log("cleaning up --> unmount ");
            setMeals([]);
          };
    }, []);

    

    return (
        <>

            <div className="container">
                <div id="search-container">
                    <input
                        type="search"
                        id="search-input"
                        placeholder="Search product name here.."
                        
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button>
                            <GiReturnArrow /> &nbsp;&nbsp; Return
                        </Button>
                        <Button  onClick={() =>props.addMeal() }>
                            <GiHealthNormal /> &nbsp;&nbsp; <div>add New Meal</div>
                        </Button>
                        <Button>Three</Button>
                    </ButtonGroup>

                    <Filter
                        meals={meals}
                        setFiltered={setFiltered}
                        activeType={activeType}
                        setActiveType={setActiveType}
                    />
                    
                </div>

                {loading ?

                    <>
                        {filtered.map((meal, index) => (
                            <div key={index} className="cardMeal float-right">
                                <div className="row">
                                    <div className="col-sm-4">
                                        {meal.image === null ? (
                                            <img
                                                className="d-block w-100"
                                                src={
                                                    "../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif"
                                                }
                                                alt="mealpic"
                                            />
                                        ) : (
                                            <img
                                                className="d-block w-100"
                                                src={`http://localhost:8080/files/${meal.image.id}`}
                                                alt="mealpic"
                                            />
                                        )}
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="cardMeal-block">
                                            <h4 className="cardMeal-title">{meal.label}</h4>
                                            <p>{meal.description}</p>
                                            <h6>{meal.type.name}</h6>
                                            <br />
                                            <button className="btn btn-warning btn-sm float-right">
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                    :
                    <>
                        <div> waittttttttttttttttttttttttt</div>
                    </>
                }
            </div>
        </>
    );
}

export default MealCard;