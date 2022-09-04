import { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import {
  MdDinnerDining,
  MdFoodBank,
  MdFreeBreakfast,
  MdLocalDrink,
} from "react-icons/md";
import { Navigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import chefService from "../../services/chef.service";
import seniorService from "../../services/senior.service";
import { TabTitle } from "../../utils/GeneralFunctions";
import {
  GiFruitBowl,
  GiHotMeal,
  GiReturnArrow,
} from "react-icons/gi";
import "./chef.scss";

import MealCard from "./MealCard";
import { Button, ButtonGroup } from "@mui/material";
import MenuFood from "./Menu/MenuFood";

class Meal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      category: "all",
      categoryIngredients: [],
      selectList: [],
      selected: null,
      label: "",
      description: "",
      mealType: "DINNER",
      fileId: null,
      selectedFile: null,
      mealImg: "../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif",
      addMeal: "mealCard",
      loadingIngredients: false,
    };
  }

  componentDidMount = () => {
    chefService.getAllIngCategory().then((res) => {
      this.setState({
        categoryIngredients: res.data,
      });
    });
    localStorage.getItem("ingredients") &&
      this.setState({
        ingredients: JSON.parse(localStorage.getItem("ingredients")),
      });
  };
  componentDidUpdate = (prevProps, prevState) => {
    localStorage.setItem("ingredients", JSON.stringify(prevState.ingredients));

    if (prevState.category !== this.state.category) {
      this.CatIngredients(this.state.category);
    }
  };

  CatIngredients = (value) => {
    console.log(value);
    this.setState({
      loadingIngredients: true,
    })
    chefService.getIngredientsByCat(value).then((result) => {
      this.setState({
        loadingIngredients: false,
        ingredients: result.data.map((d) => {
          return {
            select: d.checked,
            id: d.id,
            label: d.label,
            description: d.description,
            image: d.image,
            category: d.category,
          };
        }),
      });
    });
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          mealImg: reader.result,
          selectedFile: e.target.files[0],
        });
      }
    };
    console.log("this is image " + this.state.mealImg);
    reader.readAsDataURL(e.target.files[0]);
  };

  onPageChange = (x) => {
    this.setState({ addMeal: x });
  };

  onChangeCategory = (value) => {
    this.setState({
      category: value.label,
    });
  };

  onChangeKeyword = (e) => {
    e.preventDefault();
    this.setState({
      keyword: e.target.value,
    });
    console.log(this.state.keyword);
  };

  onChangeLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  onChangeType = (value) => {
    this.setState({
      mealType: value,
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("file", this.state.selectedFile);
    if (this.state.selectedFile) {
      seniorService
        .upload(formData)
        .then((res) => {
          this.setState({
            fileId: res.data,
          });
        })
        .then(() => {
          let meal = {
            label: this.state.label,
            description: this.state.description,
            type: this.state.mealType.value,
            image: this.state.fileId,
            ingredients: this.state.selectList,
          };
          chefService.addNewMeal(meal).then(() => {
            e.preventDefault();
            this.setState({
              label: "",
              description: "",
              mealType: "",
              fileId: null,
              addMeal: "mealCard",
              mealImg:
                "../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif",
            });

            localStorage.removeItem("ingredients");
          });
        });
    } else {
      return alert("Please choose an image");
    }
  };
  render() {
    TabTitle("Meal");
    const { user: currentUser } = this.props;
    if (!currentUser ) {
      return <Navigate to="/notFound" />;
    }
    const options = [
      {
        value: "BREAKFAST",
        label: (
          <span>
            <MdFreeBreakfast /> BreakFast
          </span>
        ),
      },
      {
        value: "LUNCH",
        label: (
          <span>
            <GiHotMeal /> Lunch
          </span>
        ),
      },
      {
        value: "DESSERTS",
        label: (
          <span>
            <GiFruitBowl /> Desserts
          </span>
        ),
      },
      {
        value: "DINNER",
        label: (
          <span>
            <MdDinnerDining /> Dinner
          </span>
        ),
      },
      {
        value: "DRINKS",
        label: (
          <span>
            <MdLocalDrink /> Drinks
          </span>
        ),
      },
      {
        value: "OTHER",
        label: (
          <span>
            <MdFoodBank /> Other
          </span>
        ),
      },
    ];
    return (
      <div className="ingredients">
        <TopBar title={"Meal"} />

        {this.state.addMeal === "addMeal" ? (
          <>


            <div className="addIng ">
              <div style={{
                position: "absolute",
                marginTop:"15px",
                top: "4px",
                left: "4px"
              }}>


                <ButtonGroup variant="text" aria-label="text button group">
                  <Button onClick={() => this.setState({ addMeal: "mealCard" })}>
                    <GiReturnArrow /> &nbsp;&nbsp; Return
                  </Button>

                </ButtonGroup>


              </div>
              <div className="section-title" style={{ marginBottom: "80px" }}>
                <h1 className="text-uppercase">Meal</h1>
                <p className="text-uppercase">LET'S prepare today's Meal</p>
              </div>
              <form onSubmit={this.handleSave}>
                <div className="addIngRow">
                  <div className="addIngRowImage">
                    <figure className="image-containeer">
                      <img
                        src={this.state.mealImg}
                        id="chosen-image"
                        alt="mealImg"
                      />
                      <figcaption id="file-name"></figcaption>
                    </figure>

                    <input
                      type="file"
                      id="upload-button"
                      accept="image/png, image/jpeg"
                      onChange={this.imageHandler}
                    />
                    <label className="imageIconIng" htmlFor="upload-button">
                      <i className="fas fa-upload"></i> &nbsp; Choose A Photo
                    </label>
                  </div>
                </div>
                <div className="addIngRow">
                  <div className="column">
                    <label htmlFor="name">Label</label>
                    <input
                      type="text"
                      id="name"
                      value={this.state.label}
                      onChange={this.onChangeLabel}
                      placeholder="Meal name here"
                    />
                  </div>

                  <div className="column">
                    <label htmlFor="name">Type</label>
                    <Select
                      onChange={this.onChangeType}
                      options={options}
                      isClearable
                      placeholder="Select Type "
                    />
                  </div>
                </div>

                <div className="addIngRow">
                  <div className="column">
                    <label htmlFor="issue">More informations about meal</label>
                    <textarea
                      id="issue"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      placeholder="Describe your meal..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="addIngRow mb-5">
                  <div className="column">
                    <label htmlFor="categoryIng">Ingredient Category</label>
                    <Select
                      onChange={this.onChangeCategory}
                      options={this.state.categoryIngredients}
                      placeholder="Select Ingredients Category "
                    />
                  </div>
                </div>
                <div className=" mb-4 pt-2" style={{ minHeight: "80px" }}>
                  {this.state.loadingIngredients ?
                    (

                      <div class="spinner-box">
                        <div class="three-quarter-spinner"></div>
                      </div>

                    )
                    :
                    (
                      <>
                        {this.state.ingredients.map((ingredient, i) => (
                          <div
                            key={i}
                            className="form-check form-check-inline form-switch p-0 m-5 "
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <input
                              class="plus-minus"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                              checked={ingredient.select}
                              value={ingredient.id}
                              onChange={(e) => {
                                this.setState({
                                  ingredients: this.state.ingredients.map((data) => {
                                    if (data.id === ingredient.id) {
                                      data.select = e.target.checked;
                                    }
                                    return data;
                                  }),
                                });
                                console.log(this.state.ingredients);

                                let arrayIds = [...this.state.selectList];
                                if (e.target.checked) {
                                  let ingredientr = {
                                    label: ingredient.label,
                                    description: ingredient.description,
                                    category: ingredient.category,
                                    checked: 1,
                                  };

                                  chefService.updateIngredient(
                                    e.target.value,
                                    ingredientr
                                  );
                                  arrayIds = [
                                    ...this.state.selectList,
                                    e.target.value,
                                  ];
                                } else {
                                  let ingredientr = {
                                    label: ingredient.label,
                                    description: ingredient.description,
                                    category: ingredient.category,
                                    checked: 0,
                                  };

                                  chefService.updateIngredient(
                                    e.target.value,
                                    ingredientr
                                  );
                                  arrayIds.splice(
                                    this.state.selectList.indexOf(e.target.value),
                                    1
                                  );
                                }
                                this.setState({
                                  selectList: arrayIds,
                                });

                              }}
                            />
                            <label className="form-check-label text-body text-capitalize ml-2 text-truncate w-80 mb-2">
                              {ingredient.label}
                            </label>
                          </div>
                        ))}
                      </>
                    )
                  }

                </div>
                <button className="btnMeal" type="submit">Submit</button>
              </form>
            </div>
          </>
        ) : this.state.addMeal === "mealCard" ? (
          <>
            <MealCard addMeal={this.onPageChange} />
          </>
        ) : (
          <>
            <MenuFood addMeal={this.onPageChange} />
          </>
        )
        }




      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(Meal);
