import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { GiHealthNormal } from "react-icons/gi";

import chefService from "../../services/chef.service";
import Filter from "./FilterActions";
import Pagination from "./Pagination";
import { SiJusteat } from "react-icons/si";
import '../Food/Food.css'
import '../Food/Food.scss'
function MealCard(props) {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeType, setActiveType] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [mealsPerPage, setMealsPerPage] = useState(3);


    const retrieveMeals = () => {
        try {
            setLoading(true);
            chefService.getAllMeals().then((result) => {
                setMeals(result.data);
            });

            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        retrieveMeals();
        return () => {
            setMeals([]);
        };
    }, []);

    // Get current meals
    const indexOfLastMeal = currentPage * mealsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
    const currentMeals = meals.sort((a, b) =>
    a["label"].toLowerCase() > b["label"].toLowerCase() ? 1 : -1
).slice(indexOfFirstMeal, indexOfLastMeal);
    const currentFiltered = filtered.sort((a, b) =>
    a["label"].toLowerCase() > b["label"].toLowerCase() ? 1 : -1
).slice(indexOfFirstMeal, indexOfLastMeal);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container">
                <div id="search-container" style={{ width: "40%" }}>
                    <input
                        type="search"
                        id="search-input"
                        placeholder="Search for Meal here.."
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                            if (event.target.value !== "") {
                                event.preventDefault();
                                setCurrentPage(1);
                                setMealsPerPage(50);
                            } else {
                                setMealsPerPage(3);
                            }
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button onClick={() => props.addMeal("menu")}>
                            <SiJusteat />
                            &nbsp; Menu
                        </Button>
                        <Button onClick={() => props.addMeal("addMeal")}>
                            <GiHealthNormal /> &nbsp;&nbsp; <div>add New Meal</div>
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="MealCardContainer">
                    <div className="container-fluid py-4" >
                        <section id="menu" className="menu section-bg">
                            <div className="container" data-aos="fade-up">
                                <div className="section-title">
                                    <h2>{activeType}</h2>
                                    <p>Meals </p>
                                </div>
                                <Filter
                                    currentPage={setCurrentPage}
                                    meals={meals}
                                    setFiltered={setFiltered}
                                    activeType={activeType}
                                    setActiveType={setActiveType}
                                />
                                <div
                                    className="rowIng menu-container"
                                    data-aos="fade-up"
                                    data-aos-delay="200" 
                                >
                                     {!loading ? (
                                    filtered.length !== 0 ? (
                                        <div className="container-fluid py-4">
                                            {currentFiltered
                                                .filter((meal) => {
                                                    if (searchTerm === "") {
                                                        return meal;
                                                    } else if (
                                                        meal.label
                                                            .toLowerCase()
                                                            .includes(searchTerm.toLowerCase()) ||
                                                        meal.description
                                                            .toLowerCase()
                                                            .includes(searchTerm.toLowerCase()) ||
                                                        meal.type.name
                                                            .toLowerCase()
                                                            .includes(searchTerm.toLowerCase())
                                                    ) {
                                                        return meal;
                                                    }
                                                })
                                                .map((meal, index) => (
                                                    <div key={index} className="foodContainer mb-5 mt-5">
                                                        {meal.image === null ? (
                                                            <img
                                                                src={
                                                                    "../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif"
                                                                }
                                                                alt="mealpic"
                                                                className="menuImg"

                                                            />
                                                        ) : (
                                                            <img
                                                                src={process.env.REACT_APP_API_URL + `/files/${meal.image.id}`}
                                                                alt="mealpic"
                                                                className="menuImg"

                                                            />
                                                        )}

                                                        <div className="foodContainer__text text-start " style={{ maxWidth: "850px" }}>
                                                            <h1 className="text-start text-capitalize">{meal.label}</h1>




                                                            <p className="text-capitalize text-sm">
                                                                {meal.description}
                                                            </p>

                                                            <div className="foodContainer__text__timing scrollyb" style={{ maxWidth: "830px", overflowX: "auto" }}>
                                                                {meal.ingredients.map((ing) => (



                                                                    <div className="foodContainer__text__timing_time"  >
                                                                        <h2 className="text-capitalize text-nowrap">♦{ing.label} &nbsp; </h2>

                                                                    </div>
                                                                ))}

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
                                        </div>
                                    ) : (
                                        <>
                                                <div className="container-fluid py-4">
                                                    {currentMeals
                                                        .filter((meal) => {
                                                            if (searchTerm === "") {
                                                                return meal;
                                                            } else if (
                                                                meal.label
                                                                    .toLowerCase()
                                                                    .includes(searchTerm.toLowerCase()) ||
                                                                meal.description
                                                                    .toLowerCase()
                                                                    .includes(searchTerm.toLowerCase()) ||
                                                                meal.type.name
                                                                    .toLowerCase()
                                                                    .includes(searchTerm.toLowerCase())
                                                            ) {
                                                                return meal;
                                                            }
                                                        })
                                                        .map((meal, index) => (
                                                            <div key={index} className="foodContainer mb-5 mt-5">
                                                                {meal.image === null ? (
                                                                    <img
                                                                        src={
                                                                            "../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif"
                                                                        }
                                                                        alt="mealpic"
                                                                        className="menuImg"

                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={process.env.REACT_APP_API_URL + `/files/${meal.image.id}`}
                                                                        alt="mealpic"
                                                                        className="menuImg"

                                                                    />
                                                                )}

                                                                <div className="foodContainer__text text-start" style={{ maxWidth: "850px" }}>
                                                                    <h1 className="text-start text-capitalize">{meal.label}</h1>




                                                                    <p>
                                                                        {meal.description}
                                                                    </p>

                                                                    <div className="foodContainer__text__timing scrollyb" style={{ maxWidth: "830px", overflowX: "auto"}}>
                                                                        {meal.ingredients.map((ing) => (


                                                                            <div className="foodContainer__text__timing_time"  >
                                                                                <h2 className="text-capitalize text-nowrap">{ing.label}&nbsp; | &nbsp;</h2>

                                                                            </div>
                                                                        ))}

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
                                                </div>
                                                </>
                                            )) : (
                                                <div className="container-fluid py-4">
                                                <div className="mt-5">
                                                    <ul className="o-vertical-spacing o-vertical-spacing--l">
                                                        <li className="blog-post o-media">
                                                            <div className="o-media__figure">
                                                                <span
                                                                    className="skeleton-box"
                                                                    style={{ width: "100px", height: "80px" }}
                                                                ></span>
                                                            </div>
                                                            <div className="o-media__body">
                                                                <div className="o-vertical-spacing">
                                                                    <h3 className="blog-post__headline">
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "55%" }}
                                                                        ></span>
                                                                    </h3>
                                                                    <p>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "80%" }}
                                                                        ></span>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "90%" }}
                                                                        ></span>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "83%" }}
                                                                        ></span>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "80%" }}
                                                                        ></span>
                                                                    </p>
                                                                    <div className="blog-post__meta">
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "70px" }}
                                                                        ></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="blog-post o-media">
                                                            <div className="o-media__figure">
                                                                <span
                                                                    className="skeleton-box"
                                                                    style={{ width: "100px", height: "80px" }}
                                                                ></span>
                                                            </div>
                                                            <div className="o-media__body">
                                                                <div className="o-vertical-spacing">
                                                                    <h3 className="blog-post__headline">
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "55%" }}
                                                                        ></span>
                                                                    </h3>
                                                                    <p>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "80%" }}
                                                                        ></span>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "90%" }}
                                                                        ></span>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "83%" }}
                                                                        ></span>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "80%" }}
                                                                        ></span>
                                                                    </p>
                                                                    <div className="blog-post__meta">
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "70px" }}
                                                                        ></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="blog-post o-media">
                                                            <div className="o-media__figure">
                                                                <span
                                                                    className="skeleton-box"
                                                                    style={{ width: "100px", height: "80px" }}
                                                                ></span>
                                                            </div>
                                                            <div className="o-media__body">
                                                                <div className="o-vertical-spacing">
                                                                    <h3 className="blog-post__headline">
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "55%" }}
                                                                        ></span>
                                                                    </h3>
                                                                    <p>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "80%" }}
                                                                        ></span>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "90%" }}
                                                                        ></span>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "83%" }}
                                                                        ></span>
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "80%" }}
                                                                        ></span>
                                                                    </p>
                                                                    <div className="blog-post__meta">
                                                                        <span
                                                                            className="skeleton-box"
                                                                            style={{ width: "70px" }}
                                                                        ></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                </div>
                                            
                                       
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MealCard;
