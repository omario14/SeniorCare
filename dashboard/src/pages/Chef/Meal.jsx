import { Component } from "react";
import { connect } from "react-redux";
import Select from 'react-select';
import { MdDinnerDining, MdFoodBank, MdFreeBreakfast, MdLocalDrink } from "react-icons/md";
import { Navigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import chefService from "../../services/chef.service";
import seniorService from "../../services/senior.service";
import { TabTitle } from "../../utils/GeneralFunctions";
import { GiFruitBowl, GiHotMeal } from "react-icons/gi";


import MealCard from "./MealCard";

class Meal extends Component {

  constructor(props) {
    super(props);

    this.state = {

      ingredients: [],
      category: "all",
      categoryIngredients: [],
      label: "",
      description: "",
      mealType: "DINNER",
      fileId: null,
      selectedFile: null,
      mealImg: '../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif',
      addMeal: false,
      keyword: "a"
    };
  }


  componentDidMount = () => {
    chefService.getAllIngCategory()
      .then(res => {
        this.setState({
          categoryIngredients: res.data
        })
      })
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.category !== this.state.category) {
      this.CatIngredients(this.state.category)
    }

  }



  CatIngredients = (value) => {

    console.log(value)
    chefService.getIngredientsByCat(value)
      .then((result) => {
        this.setState({
          ingredients: result.data,


        })
      })


  }




  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ mealImg: reader.result, selectedFile: e.target.files[0] })


      }
    }
    console.log("this is image " + this.state.mealImg)
    reader.readAsDataURL(e.target.files[0])
  }

  onPageChange = () => {
    this.setState({ addMeal: true })

  }
  onChangeCategory = (value) => {
    this.setState({
      category: value.label,
    })
  }

  onChangeKeyword = (e) => {
    e.preventDefault();
    this.setState({
      keyword: e.target.value,
    })
    console.log(this.state.keyword)
  }

  onChangeLabel = (e) => {
    this.setState({
      label: e.target.value,
    })
  }
  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    })
  }
  onChangeType = (value) => {
    this.setState({
      mealType: value,
    });

  }

  handleSave = (e) => {
    e.preventDefault();
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append(
      "file",
      this.state.selectedFile,
    );
    if (this.state.selectedFile) {
      seniorService.upload(formData).then(res => {

        this.setState({
          fileId: res.data,

        })


      }).then(() => {
        let meal = {
          label: this.state.label,
          description: this.state.description,
          type: this.state.mealType.value,
          image: this.state.fileId,

        };
        console.log("mealllll", meal);
        chefService.addNewMeal(meal).then(() => {


          e.preventDefault();
          this.setState({
            label: "",
            description: "",
            mealType: "",
            fileId: null,
            addMeal: false,
            mealImg: '../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif',
          })
        })



      })
    } else {
      return (alert("plz choose an image"))

    }
  }
  render() {


    TabTitle('Meal');
    const { user: currentUser } = this.props;
    if (!currentUser || !currentUser.roles.includes("ROLE_CHEF")) {
      return <Navigate to="/notFound" />;

    }
    const options = [
      { value: 'BREAKFAST', label: <span><MdFreeBreakfast /> BreakFast</span> },
      { value: 'LUNCH', label: <span><GiHotMeal /> Lunch</span> },
      { value: 'DESSERTS', label: <span><GiFruitBowl /> Desserts</span> },
      { value: 'DINNER', label: <span><MdDinnerDining /> Dinner</span> },
      { value: 'DRINKS', label: <span><MdLocalDrink /> Drinks</span> },
      { value: 'OTHER', label: <span><MdFoodBank /> Other</span> }
    ]
    return (
      <div className="ingredients">
        <TopBar title={'Meal'} />

        {this.state.addMeal ?
          <>


            <div className="addIng">

              <div style={{ marginBottom: "80px" }}>

                <h1 className='text-uppercase'>Meal</h1>
                <p className='text-uppercase'>LET'S prepare today's Meal</p>
              </div>
              <form onSubmit={this.handleSave}>
                <div className="addIngRow">
                  <div className="addIngRowImage">
                    <figure className="image-containeer">
                      <img src={this.state.mealImg} id="chosen-image" alt="mealImg" />
                      <figcaption id="file-name"></figcaption>
                    </figure>

                    <input type="file" id="upload-button" accept="image/*" onChange={this.imageHandler} />
                    <label className='imageIconIng' htmlFor="upload-button">
                      <i className="fas fa-upload"></i> &nbsp; Choose A Photo
                    </label>
                  </div>
                </div>
                <div className="addIngRow">
                  <div className="column">
                    <label htmlFor="name">Label</label>
                    <input type="text" id="name" value={this.state.label}
                      onChange={this.onChangeLabel} placeholder="Meal name here" />
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
                    <label htmlFor="issue">Describe your Meal</label>
                    <textarea id="issue" value={this.state.description}
                      onChange={this.onChangeDescription} placeholder="Describe your issue in detail here" rows="3"></textarea>
                  </div>
                </div>

                <div className="addIngRow mb-2">
                  <div className="column">
                    <label htmlFor="categoryIng">Ingredient Category</label>
                    <Select
                      id="categoryIng"
                      onChange={this.onChangeCategory}
                      options={this.state.categoryIngredients}
                      isClearable
                      placeholder="Select Type "
                    />
                  </div>
                  </div>
                  <div className=" mb-4 pt-2">



                    {this.state.ingredients
                      .map((ingredient, i) => (


                        <div className="form-check form-check-inline form-switch p-0 ">

                          <input
                            className="form-check-input ms-auto"
                            type="checkbox"
                            id="flexSwitchCheckDefault"

                          />
                          <label
                            className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                            
                          >
                            {ingredient.label}
                          </label>
                        </div>
                      ))}




                 
                </div>
                <button type='submit'>Submit</button>
              </form>
            </div>
          </>
          :
          <>

            <MealCard addMeal={this.onPageChange} />

          </>
        }


      </div>
    )
  }
}


function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(Meal);
