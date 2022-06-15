
import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import seniorService from "../../services/senior.service";
import { TabTitle } from "../../utils/GeneralFunctions";
import { Modal, Button, Form } from 'react-bootstrap';
import Dialog from "./dialogDelete";
import AddSenior from "./AddSenior/AddSenior"
import "./Senior.css";

class Senior extends Component {
    constructor(props) {
        super(props);

        this.handleDialog = this.handleDialog.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.retrieveSeniors = this.retrieveSeniors.bind(this)
        this.myRef = React.createRef();
        this.state = {

            seniors: [""],
            message: "",
            isLoading: false,
            addSeniorPage: true,
            editDialog: false,
            senior: null,
            name: "",
            lastName: "",
            telephone: "",
            sexOption: "male",
            birthDate: null,
            interests: "",
            cin: "",
            fileInfo:[],


        };
    }


    componentDidMount() {
       this.retrieveSeniors();
    }

   
    retrieveSeniors(){
        seniorService.getFiles().then(response=>{
           
            this.setState({
                fileInfo:response.data,
            })
              console.log("file infos : ",JSON.stringify(response.data))
        })
        seniorService.getAll()
        .then(res => {
            const seniors = res.data;
            this.setState({ seniors:seniors });
        })
    }

    handleAddSenior=()=>{
        this.setState({
            addSeniorPage:false,
        })
    }

    handleDialog = (message, isLoading) => {
        this.setState({
            message: message,
            isLoading: isLoading,
            //Update

        });
    };
    handleClose = () => {
        this.retrieveSeniors();
        this.setState({
            editDialog: false,

        })

    }

    deleteSenior(id) {
        this.handleDialog("Are you sure you want to delete?", true)
        this.myRef.current = id;
    }

    areUSureDelete = (choose) => {
        if (choose) {
            const seniors = this.state.seniors.filter(item => item.id !== this.myRef.current);
            seniorService.delete(this.myRef.current)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.setState({
                        seniors
                    })

                });
            this.handleDialog("", false);
        } else {
            this.handleDialog("", false);
        }
    };

    handleShow = (senior, editDialog) => {
        this.myRef.current = senior;
        this.setState({
            editDialog: editDialog,
            name: this.myRef.current.name,
            lastName: this.myRef.current.lastname,
            cin: this.myRef.current.cin,
            telephone: this.myRef.current.telephone,
            birthDate: this.myRef.current.dateOfBirth,
            sexOption: this.myRef.current.sex,
        })


    }
    handleUpdate = (e) => {
        e.preventDefault();
        const id = this.myRef.current.id;
        
        let senior = {
            name: this.state.name,
            lastname: this.state.lastName,
            telephone: this.state.telephone,
            cin: this.state.cin,
            dateOfBirth: this.state.birthDate,
            sex: this.state.sexOption,

        };
        
        seniorService.update(id, senior).then(()=>{
            this.handleClose();
        })
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        })
    }
    onChangelastname = (e) => {
        this.setState({
            lastName: e.target.value,
        });
    }
    onChangeTelephone = (e) => {
        this.setState({
            telephone: e.target.value,
        });
    }
    onChangeSex = (e) => {
        this.setState({
            sexOption: e.target.value,
        });
    }
    onChangeBirthDate = (e) => {
        this.setState({
            birthDate: e.target.value,
        });
    }
    onChangeInterests = (value) => {
        this.setState({
            interests: value,
        });
    }

    onChangeCin = (e) => {
        this.setState({
            cin: e.target.value,
        });
    }

    render() {

        TabTitle('Senior');
        const { user: currentUser } = this.props;
        if (!currentUser || !currentUser.roles.includes("ROLE_ACCOMPAGNANT")) {
            return <Navigate to="/notFound" />;

        }


        return (
            <div className="seniorList">
                <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
                    <TopBar title={'Senior'} />
                    {
          this.state.addSeniorPage ?
                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4">
                                    <div className="card-header pb-0" style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div><h6>Senior table</h6></div>
                                        <div>
                                            <NavLink class="btn btn-primary btn-lg btn-floating" style={{ backgroundColor: "rgba(173, 57, 123,0.4)" }} to="#" onClick={this.handleAddSenior} role="button">
                                                <i className="fa fa-plus" style={{ fontSize: "36px", paddingTop: "8px" }}></i>
                                            </NavLink>

                                        </div>
                                    </div>
                                    <div className="card-body px-0 pt-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead key="thead">
                                                    <tr key={"thead"}>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                            Senior
                                                        </th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                            CIN
                                                        </th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                            Sex
                                                        </th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                            Birth Date
                                                        </th>
                                                        <th className="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody key="tbody">
                                                    {
                                                        this.state.seniors
                                                            .map((senior, i) =>
                                                                <tr key={i}>
                                                                    <td>
                                                                        <div className="d-flex px-2 py-1">
                                                                      
                                                                            <div >
                                                                                <img
                                                                                    src={`http://localhost:8080/files/${senior.file}`}
                                                                                    className="avatar avatar-sm me-3"
                                                                                    alt="user1"
                                                                                />
                                                                            </div>
                                                          
                                                                            <div className="d-flex flex-column justify-content-center">
                                                                                <h6 className="mb-0 text-sm">{senior.name}</h6>
                                                                                <p className="text-xs text-secondary mb-0">
                                                                                    {senior.lastname}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="text-xs font-weight-bold mb-0"><i className="fa fa-id-card" aria-hidden="true"></i> {senior.cin} </p>
                                                                        <p className="text-xs text-secondary mb-0"><i className="fa fa-phone" aria-hidden="true"></i> {senior.telephone} </p>
                                                                    </td>
                                                                    <td className="align-middle text-center text-sm">
                                                                        <span className="badge badge-sm bg-gradient-info">
                                                                            {senior.sex}
                                                                        </span>
                                                                    </td>
                                                                    <td className="align-middle text-center">
                                                                        <span className="text-secondary text-xs font-weight-bold">
                                                                            {senior.dateOfBirth}
                                                                        </span>
                                                                    </td>
                                                                    <td className="align-middle">
                                                                        <a
                                                                            href="#"
                                                                            className="text-secondary font-weight-bold text-xs"
                                                                            data-toggle="tooltip"
                                                                            data-original-title="Edit user"
                                                                            onClick={(e) => this.handleShow(senior, true)}
                                                                        >
                                                                            Edit
                                                                        </a>

                                                                    </td>
                                                                    <td className="align-middle">
                                                                        <a
                                                                            href="#"
                                                                            className="text-secondary font-weight-bold text-xs"
                                                                            data-toggle="tooltip"
                                                                            data-original-title="Edit user"
                                                                            onClick={(e) => this.deleteSenior(senior.id, e)}
                                                                        >
                                                                            Delete
                                                                        </a>

                                                                    </td>
                                                                </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                    <AddSenior addSeniorPage={this.handleAddSenior}/>
                    </>
    }
                </main>

                <Modal show={this.state.editDialog} onHide={this.handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Senior
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleUpdate}>
                            <Form.Group style={{ padding: "12px 12px 0" }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Name *"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}

                                    required
                                />
                            </Form.Group>
                            <Form.Group style={{ padding: "12px 12px 0" }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name *"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.onChangelastname}
                                    required
                                />
                            </Form.Group>
                            <Form.Group style={{ padding: "12px 12px 0" }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Cin"
                                    name="cin"
                                    value={this.state.cin}
                                    onChange={this.onChangeCin}
                                />
                            </Form.Group>
                            <Form.Group style={{ padding: "12px 12px 0" }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    value={this.state.telephone}
                                    onChange={this.onChangeTelephone}
                                />
                            </Form.Group>
                            <div className="rowoo rowoo-space">
                           
                            <Form.Group style={{ padding: "12px 12px 0" }}>
                                <Form.Control
                                    type="date"
                                    style={{width: "40%"}}
                                    placeholder="BirthDate"
                                    name="birthday"
                                    value={this.state.birthDate}
                                    onChange={this.onChangeBirthDate}
                                    format="{0:yyyy-MM-dd}"

                                />

                            </Form.Group>
                           
                            
                            <Form.Group style={{ padding: "12px 18px 10px" }}>

                                <div className="p-t-10">
                                    <label className="radio-container m-r-45">Male
                                        <Form.Control checked={this.state.sexOption === "male"}
                                            onChange={this.onChangeSex}
                                            type="radio"
                                            value="male" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-container">Female
                                        <Form.Control
                                            checked={this.state.sexOption === "female"}
                                            onChange={this.onChangeSex}
                                            type="radio"
                                            value="female" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>

                            </Form.Group>
                            
                            </div>

                            <Button variant="success" type="submit" className="btn  btn-rounded"
                                style={{
                                    border: "2px solid ",
                                    alignItems: "center",
                                    margin: "10% 0 0 27%",
                                    backgroundColor: "#D24548",
                                    cursor: "pointer",

                                }}>
                                Edit Senior
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="btn  btn-rounded" style={{
                            border: "2px solid ",
                            alignItems: "center",
                            margin: "0 31% 0 0",

                            cursor: "pointer",
                            left: "50%",
                        }} onClick={this.handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                {this.state.isLoading && (
                    <Dialog
                        onDialog={this.areUSureDelete}
                        message={this.state.message}

                    />
                )}
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



export default connect(mapStateToProps)(Senior);