import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import AsyncSelect from "react-select/async";
import chefService from '../../services/chef.service';
import seniorService from '../../services/senior.service';
import { TabTitle } from '../../utils/GeneralFunctions';
import './Chef.css';


class Ingredients extends Component {
    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLabel = this.onChangeLabel.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.fetchData=this.fetchData.bind(this);
        this.state = {

            ingCategory: [],
            label: "",
            description: "",
            category: null,
            addIngredients: false,
            fileInfo: [],
            fileId: null,
            ingredientImg: "../../../../assets/img/images/CategoryImages/Arginine-rich-foods.jpg",
            selectedFile: null,
        }
    }


    componentDidMount = () => {


        seniorService.getFiles().then(response => {

            this.setState({
                fileInfo: response.data,
            })
        })

        chefService.getAllIngCategory()
        .then(res => {
        
            this.setState({
                ingCategory: res.data,

            });
           
            console.log(this.state.ingCategory)
        })
       

          

    }

    fetchData= async ()=> {
        return  chefService.getAllIngCategory()
        .then(res => {
            const cat = res.data;
            return cat;
            
        })
    }

    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ ingredientImg: reader.result, selectedFile: e.target.files[0] })


            }
        }
        console.log("this is image " + this.state.ingredientImg)
        reader.readAsDataURL(e.target.files[0])
    }
    onChangeCategory = (category) => {
        this.setState({
            category
        })
        console.log(JSON.stringify(this.state.category))
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
                let ingredient = {
                    label: this.state.label,
                    description: this.state.description,
                    category: this.state.category,
                    file: this.state.fileId,

                };
                chefService.addNewIngredient(ingredient);
                this.setState({
                    addIngredients:true,
                })


            })
        } else {
            return (alert("plz choose an image"))

        }
    }

    render() {
        TabTitle('Ingredients');
        const { user: currentUser } = this.props;
        if (!currentUser || !currentUser.roles.includes("ROLE_CHEF")) {
            return <Navigate to="/notFound" />;

        }

        return (
            <div className="ingredients">
                <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
                    <TopBar title={"Ingredients"} />
                    {
                        this.state.addIngredients ?

                            <>
                                <section>
                                    <div className="rowIng">
                                        <h1>Ingredients Category</h1>
                                    </div>
                                    <div className="rowIng">
                                        {this.state.ingCategory
                                            .map((category, i) =>
                                                <div key={i} className="columnIng">
                                                    <div className="cardIng">
                                                        <img src={`http://localhost:8080/files/${category.ingCategoryImage.id}`} />
                                                        <div className="img-container">
                                                            <h3 style={{ fontSize: "50px", paddingTop: "20%" }}>{category.id}</h3>
                                                        </div>

                                                        <p>{category.label}</p>
                                                        <div className="icons">
                                                            <a href="#">
                                                                <i className="fab fa-twitter"></i>
                                                            </a>
                                                            <a href="#">
                                                                <i className="fab fa-linkedin"></i>
                                                            </a>
                                                            <a href="#">
                                                                <i className="fab fa-github"></i>
                                                            </a>
                                                            <a href="#">
                                                                <i className="fas fa-envelope"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}


                                    </div>
                                </section>
                            </>
                            :

                            <>
                                <div className="addIng">
                                    <div style={{ marginBottom: "80px" }}>
                                        <h1>INGREDIENTS</h1>
                                        <p>LET'S ADD SOME INGREDIENTS</p>
                                    </div>
                                    <form onSubmit={this.handleSave}>
                                        <div className="addIngRow">
                                            <div className="addIngRowImage">
                                                <figure className="image-containeer">
                                                    <img src={this.state.ingredientImg} id="chosen-image" />
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
                                                    onChange={this.onChangeLabel} placeholder="Ingredient name here" />
                                            </div>
                                            <div className="column">
                                                <label htmlFor="category">Category</label>

                                                        <AsyncSelect
                                                            defaultOptions
                                                            value={this.state.category}
                                                            getOptionLabel={e => e.label + '  ' + e.id}
                                                            getOptionValue={e => e.id}
                                                            key={e => e.id}
                                                            onChange={this.onChangeCategory}
                                                            loadOptions={this.fetchData}
                                                           
                                                        />
                                                   
                                            </div>
                                        </div>

                                        <div className="addIngRow">
                                            <div className="column">
                                                <label htmlFor="issue">Describe your ingredient</label>
                                                <textarea id="issue" value={this.state.description}
                                                    onChange={this.onChangeDescription} placeholder="Describe your issue in detail here" rows="3"></textarea>
                                            </div>
                                        </div>

                                        <button type='submit'>Submit</button>
                                    </form>
                                </div>
                            </>
                    }

                </main>
            </div >
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}
export default connect(mapStateToProps)(Ingredients);
