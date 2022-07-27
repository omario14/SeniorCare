import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { GiHealthNormal } from "react-icons/gi";

import chefService from "../../services/chef.service";
import Filter from "./FilterActions";
import Pagination from "./Pagination";
import { SiJusteat } from "react-icons/si";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

function MealCard(props) {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeType, setActiveType] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [mealsPerPage, setMealsPerPage] = useState(4);

    const retrieveMeals = () => {
        try {
            setLoading(false);
            chefService.getAllMeals().then((result) => {
                setMeals(result.data);
            });

            setLoading(true);
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
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
    const currentFiltered = filtered.slice(indexOfFirstMeal, indexOfLastMeal);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container">
                <div id="search-container" style={{width: "40%"}}>
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
                                    className="row menu-container"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    {filtered.length !== 0 ? (
                                        <>
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
                                                    <div
                                                        key={index}
                                                        className="col-lg-6 menu-item filter-starters"
                                                    >
                                                        {meal.image === null ? (
                                                            <img
                                                                src={
                                                                    "../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif"
                                                                }
                                                                alt="mealpic"
                                                                className="menu-img"

                                                            />
                                                        ) : (
                                                            <img
                                                                src={`http://localhost:8080/files/${meal.image.id}`}
                                                                alt="mealpic"
                                                                className="menu-img"

                                                            />
                                                        )}
                                                        <div className="menu-content">
                                                            <a href="#">
                                                                {meal.label}
                                                            </a>
                                                            <span >
                                                                         <MdOutlineExpandMore size={30}/>
                                                                    </span>
                                                        </div>

                                                        {meal.ingredients.map((ingredient, i) => (
                                                            <div
                                                                key={i}
                                                                className="menu-ingredients"
                                                            >
                                                                
                                                                {ingredient.label}
                                                            </div>
                                                        ))}

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
                                                            <div
                                                        key={index}
                                                        className="col-lg-6 menu-item filter-starters"
                                                    >
                                                        {meal.image === null ? (
                                                            <img
                                                                src={
                                                                    "../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif"
                                                                }
                                                                alt="mealpic"
                                                                className="menu-img"

                                                            />
                                                        ) : (
                                                            <img
                                                                src={`http://localhost:8080/files/${meal.image.id}`}
                                                                alt="mealpic"
                                                                className="menu-img"

                                                            />
                                                        )}
                                                        <div className="menu-content">
                                                            <a href="#">
                                                                {meal.label}
                                                            </a>
                                                            <span >
                                                                         <MdOutlineExpandMore size={30}/>
                                                                    </span>
                                                        </div>

                                                        {meal.ingredients.map((ingredient, i) => (
                                                            <div
                                                                key={i}
                                                                className="menu-ingredients"
                                                            >
                                                                
                                                                {ingredient.label}
                                                            </div>
                                                        ))}

                                                    </div>
                                                        ))}

                                                    <Pagination
                                                        currentPage={currentPage}
                                                        mealsperpage={mealsPerPage}
                                                        totalmeals={meals.length}
                                                        paginate={paginate}
                                                    />
                                                </>
                                            ) : (
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
                                            )}
                                        </>
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
