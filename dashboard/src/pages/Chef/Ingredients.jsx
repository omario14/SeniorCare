import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import { GiHealthNormal, GiReturnArrow } from "react-icons/gi";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, CardActionArea, CardActions, CardHeader, Snackbar } from '@mui/material';
import AsyncSelect from "react-select/async";
import chefService from '../../services/chef.service';
import seniorService from '../../services/senior.service';
import { TabTitle } from '../../utils/GeneralFunctions';
import './Chef.css';
import { Box } from '@mui/system';
import CustomizedMenus from './MenuActions';

import MuiAlert from '@mui/material/Alert';
import Dialog from '../Seniors/dialogDelete';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class Ingredients extends Component {
    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLabel = this.onChangeLabel.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.CatIngredients = this.CatIngredients.bind(this);
        this.myRef = React.createRef();
        this.state = {

            ingCategory: [],
            ingredients: [],
            label: "",
            description: "",
            fileInfo: [],
            fileId: null,
            category: "s",
            addIngredients: true,
            categoryIngredients: false,
            message: "",
            isLoading: false,
            toast: false,
            ingredientImg: "../../../../assets/img/images/CategoryImages/Arginine-rich-foods.jpg",
            selectedFile: null,
            keyword: "M",
        }
    }

    componentDidMount = () => {
        this.getIngredients();
        console.log("ingredients component get mounted")
    }


    getIngredients = () => {
        try {
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


                })

        } catch (error) {
            console.log(error);
        }
    }


    handleClick = () => {
        this.setState({
            toast: true
        });
    };

    handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            toast: false
        })
    };

    fetchData = async () => {
        return chefService.getAllIngCategory()
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
                chefService.addNewIngredient(ingredient).then(() => {


                    e.preventDefault();
                    this.CatIngredients(ingredient.category, e)
                    this.setState({
                        label: "",
                        description: "",
                        fileId: null,
                        addIngredients: true,
                    })
                })



            })
        } else {
            return (alert("plz choose an image"))

        }
    }

    CatIngredients = (cat, e) => {
        e.preventDefault();
        chefService.getIngredientsByCat(cat.label)
            .then((result) => {
                this.setState({
                    ingredients: result.data,
                    category: cat,

                })
            })
        this.setState({
            categoryIngredients: true
        })

    }

    deleteIngredient = (ingredient) => {
        this.handleDialog("Are you sure you want to delete?", true)
        this.myRef.current = ingredient;
    }

    handleDialog = (message, isLoading) => {
        this.setState({
            message: message,
            isLoading: isLoading,
            //Update

        });
    };

    areUSureDelete = (choose) => {
        if (choose) {
            const ingredients = this.state.ingredients.filter(item => item.id !== this.myRef.current.id);

            chefService.removeIngredient(this.myRef.current.id)
                .then(() => {

                    if (this.myRef.current.file) {
                        seniorService.removeFileById(this.myRef.current.file.id);

                        console.log("this  file is delete", this.myRef.current.file.id)
                    }
                    this.handleClick();
                    this.setState({
                        ingredients
                    })

                });
            console.log(ingredients);

            this.handleDialog("", false);
        } else {
            this.handleDialog("", false);
        }
    };


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
                                {this.state.categoryIngredients ?
                                    <>
                                        <section>
                                            <div className="rowIng">
                                                <h1 className='text-uppercase'><span className='text-warning'>{this.state.category.label}</span> <br /> Ingredients</h1>
                                                <ButtonGroup variant="text" aria-label="text button group">
                                                    <Button onClick={() => this.setState({ categoryIngredients: false })}>
                                                        <GiReturnArrow /> &nbsp;&nbsp; Return
                                                    </Button>
                                                    <Button onClick={() => this.setState({ addIngredients: false })}><GiHealthNormal /> &nbsp;&nbsp; <div>add New Ingredient</div></Button>
                                                    
                                                </ButtonGroup>

                                            </div>
                                        </section>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                '& > :not(style)': {
                                                    m: 2,
                                                    width: 400,
                                                    height: 400,
                                                },
                                            }}
                                        >
                                            {this.state.ingredients
                                                .map((ingredient, i) =>
                                                    <>
                                                        <Card key={i} sx={{ flex: "1 0 15%", maxWidth: 300 }}>

                                                            <CardActionArea>
                                                                <CardHeader

                                                                    action={

                                                                        <CustomizedMenus
                                                                            deleteIngredient={this.deleteIngredient}
                                                                            ingredient={ingredient} />

                                                                    }

                                                                />
                                                                {ingredient.file === null ?
                                                                    <CardMedia
                                                                        component="img"
                                                                        height="140"
                                                                        image={this.state.ingredientImg}
                                                                        alt="ingredient image"
                                                                    />
                                                                    : <CardMedia
                                                                        component="img"
                                                                        height="140"
                                                                        image={`http://localhost:8080/files/${ingredient.file.id}`}
                                                                        alt="ingredient image"
                                                                    />}

                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h5" component="div">
                                                                        {ingredient.label}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {ingredient.description}
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                            <CardActions>
                                                                <Button size="small" color="primary">
                                                                    Share
                                                                </Button>
                                                            </CardActions>
                                                        </Card>


                                                    </>
                                                )}
                                        </Box>

                                        {this.state.isLoading && (
                                            <Dialog
                                                onDialog={this.areUSureDelete}
                                                message={this.state.message}

                                            />
                                        )}

                                        <Snackbar open={this.state.toast} autoHideDuration={6000} onClose={this.handleClose}>
                                            <Alert onClose={this.handleClose} severity="warning" sx={{ width: '100%' }}>
                                                Ingredient is deleted successfully
                                            </Alert>
                                        </Snackbar>
                                    </>

                                    :
                                    <section>
                                        <div className="rowIng">
                                            <h1 className='text-uppercase'>Ingredients Category</h1>
                                        </div>
                                        <div className="rowIng">
                                            {this.state.ingCategory
                                                .map((category, i) =>



                                                    <div key={i} onClick={(e) => this.CatIngredients(category, e)} className="columnIng">
                                                        <div className="cardIng">
                                                            <img src={`http://localhost:8080/files/${category.ingCategoryImage.id}`} />
                                                            <div className="img-container">
                                                                <h3 style={{ fontSize: "50px", paddingTop: "20%" }}>{category.id}</h3>
                                                            </div>

                                                            <p>{category.label}</p>
                                                           
                                                        </div>
                                                    </div>

                                                )}
                                        </div>
                                    </section>
                                }



                            </>
                            :


                            <>

                                <div className="addIng" style={{ top: "48%", marginBottom: "80px" }}>
                                    <div style={{
                                        position: "absolute",
                                        top: "4px",
                                        left: "4px"
                                    }}>


                                        <ButtonGroup variant="text" aria-label="text button group">
                                            <Button onClick={() => this.setState({ addIngredients: true })}>
                                                <GiReturnArrow /> &nbsp;&nbsp; Return
                                            </Button>

                                        </ButtonGroup>


                                    </div>
                                    <div style={{ marginBottom: "80px" }}>

                                        <h1 className='text-uppercase'>INGREDIENTS</h1>
                                        <p className='text-uppercase'>LET'S ADD SOME INGREDIENTS</p>
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

                                        <button className="btnMeal" type='submit'>Submit</button>
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
