import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { GiHealthNormal } from "react-icons/gi";

import chefService from "../../services/chef.service";
import Filter from "./FilterActions";
import Pagination from "./Pagination";
import { SiJusteat } from "react-icons/si";

function MealCard(props) {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeType, setActiveType] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [mealsPerPage,setMealsPerPage] = useState(3);

    const retrieveMeals = () => {
        try {
            setLoading(false);
            chefService.getAllMeals().then((result) => {
                console.log("aaaaaaa", result);
                setMeals(result.data);
            });

            setLoading(true);
            console.log("data", meals);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        retrieveMeals();
        return () => {
            console.log("aaaafedfdf", meals);
            setMeals([]);
        };
    }, []);


    // Get current meals
    const indexOfLastMeal = currentPage * mealsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
    const currentFiltered = filtered.slice(indexOfFirstMeal, indexOfLastMeal);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container">
                <div id="search-container">
                    <input
                        type="search"
                        id="search-input"
                        placeholder="Search for Meal here.."
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                            if (event.target.value!=""){
                            event.preventDefault();
                            setCurrentPage(1);
                            setMealsPerPage(50);
                            }else{
                                setMealsPerPage(3)
                            }
                           
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button>
                            <SiJusteat />&nbsp; Menu
                        </Button>
                        <Button onClick={() => props.addMeal()}>
                            <GiHealthNormal /> &nbsp;&nbsp; <div>add New Meal</div>
                        </Button>

                    </ButtonGroup>

                    <Filter
                        currentPage={setCurrentPage}
                        meals={meals}
                        setFiltered={setFiltered}
                        activeType={activeType}
                        setActiveType={setActiveType}
                    />
                </div>


                <>
                    {filtered.length !== 0 ? (
                        <>
                            {currentFiltered
                                .filter((meal) => {
                                    if (searchTerm === "") {
                                        return meal;
                                    } else if (
                                        (meal.label
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase())) || (meal.description
                                                .toLowerCase()
                                                .includes(searchTerm.toLowerCase())) || (meal.type.name.toLowerCase()
                                                    .includes(searchTerm.toLowerCase())
                                        )

                                    ) {
                                        return meal;
                                       
                                    }
                                })
                                .map((meal, index) => (
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

                                                    {meal.ingredients.map((ingredient, i) => (
                                                        <div key={i} className="btn btn-info ms-5">
                                                            {ingredient.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                 <Pagination 
                                        
                                        currentPage={currentPage}
                                        mealsperpage={mealsPerPage}
                                        totalmeals={filtered.length}
                                        paginate={paginate}
                                    />
                        </>
                    ) : (
                        <>
                            {loading ? (

                                <>
                                    {currentMeals.filter((meal) => {
                                        if (searchTerm === "") {
                                            return meal;
                                        } else if (
                                            (meal.label
                                                .toLowerCase()
                                                .includes(searchTerm.toLowerCase()))|| (meal.description
                                                    .toLowerCase()
                                                    .includes(searchTerm.toLowerCase())) || (meal.type.name.toLowerCase()
                                                        .includes(searchTerm.toLowerCase()))
                                        ) {
                                           
                                            
                                            return meal;
                                        }
                                    })
                                        .map((meal, index) => (
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

                                                            {meal.ingredients.map((ingredient, i) => (
                                                                <div key={i} className="btn btn-info ms-5">
                                                                    {ingredient.label}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    <Pagination 
                                        currentPage={currentPage}
                                        mealsperpage={mealsPerPage}
                                        totalmeals={meals.length}
                                        paginate={paginate}
                                    />
                                </>

                            )
                                : (
                                    <div className="mt-5">
                                        <ul class="o-vertical-spacing o-vertical-spacing--l">
                                            <li class="blog-post o-media">
                                                <div class="o-media__figure">
                                                    <span class="skeleton-box" style={{ width: "100px", height: "80px" }}></span>
                                                </div>
                                                <div class="o-media__body">
                                                    <div class="o-vertical-spacing">
                                                        <h3 class="blog-post__headline">
                                                            <span class="skeleton-box" style={{ width: "55%" }}></span>
                                                        </h3>
                                                        <p>
                                                            <span class="skeleton-box" style={{ width: "80%" }}></span>
                                                            <span class="skeleton-box" style={{ width: "90%" }}></span>
                                                            <span class="skeleton-box" style={{ width: "83%" }}></span>
                                                            <span class="skeleton-box" style={{ width: "80%" }}></span>
                                                        </p>
                                                        <div class="blog-post__meta">
                                                            <span class="skeleton-box" style={{ width: "70px" }}></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="blog-post o-media">
                                                <div class="o-media__figure">
                                                    <span class="skeleton-box" style={{ width: "100px", height: "80px" }}></span>
                                                </div>
                                                <div class="o-media__body">
                                                    <div class="o-vertical-spacing">
                                                        <h3 class="blog-post__headline">
                                                            <span class="skeleton-box" style={{ width: "55%" }}></span>
                                                        </h3>
                                                        <p>
                                                            <span class="skeleton-box" style={{ width: "80%" }}></span>
                                                            <span class="skeleton-box" style={{ width: "90%" }}></span>
                                                            <span class="skeleton-box" style={{ width: "83%" }}></span>
                                                            <span class="skeleton-box" style={{ width: "80%" }}></span>
                                                        </p>
                                                        <div class="blog-post__meta">
                                                            <span class="skeleton-box" style={{ width: "70px" }}></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="blog-post o-media">
                                                <div class="o-media__figure">
                                                    <span class="skeleton-box" style={{ width: "100px", height: "80px" }}></span>
                                                </div>
                                                <div class="o-media__body">
                                                    <div class="o-vertical-spacing">
                                                        <h3 class="blog-post__headline">
                                                            <span class="skeleton-box" style={{ width: "55%" }}></span>
                                                        </h3>
                                                        <p>
                                                            <span class="skeleton-box" style={{ width: "80%" }}></span>
                                                            <span class="skeleton-box" style={{ width: "90%" }}></span>
                                                            <span class="skeleton-box" style={{ width: "83%" }}></span>
                                                            <span class="skeleton-box" style={{ width: "80%" }}></span>
                                                        </p>
                                                        <div class="blog-post__meta">
                                                            <span class="skeleton-box" style={{ width: "70px" }}></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                        </>
                    )}
                </>

            </div>
        </>
    );
}

export default MealCard;
