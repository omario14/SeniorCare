
import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { FcEmptyTrash, FcPlus } from "react-icons/fc";
import TopBar from "../../components/TopBar/TopBar";
import seniorService from "../../services/senior.service";
import { TabTitle } from "../../utils/GeneralFunctions";
import { Modal, Button, Form } from 'react-bootstrap';
import Dialog from "./dialogDelete";
import AddSenior from "./AddSenior/AddSenior"

import "./Senior.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
class Senior extends Component {
    constructor(props) {
        super(props);

        this.handleDialog = this.handleDialog.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.retrieveSeniors = this.retrieveSeniors.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.myRef = React.createRef();
        this.state = {

            seniors: [],
            message: "",
            isLoading: false,
            isLoadingDeleteCheckbox: false,
            isSkeleton: false,
            addSeniorPage: true,
            editDialog: false,
            expand: false,
            senior: null,
            name: "",
            lastName: "",
            telephone: "",
            sexOption: "male",
            birthDate: null,
            interests: "",
            cin: "",
            selected: null,
            select: [],
            fileInfo: [],
            selectListDIN: [],
            dinnerMenu: [],



        };
    }



    componentDidMount() {
        this.retrieveSeniors();
        
    }



    retrieveSeniors = () => {
        this.setState({
            isSkeleton: true,
        })

        seniorService.getFiles().then(response => {

            this.setState({
                fileInfo: response.data,
            })
        })
        seniorService.getAll()
            .then((res) => {
                this.setState({
                    seniors: res.data.map((d) => {
                        return { 
                            name: d.name,
                            lastname: d.lastName,
                            dateOfBirth: d.birthDate,
                            sex: d.sexOption,
                            cin: d.cin,
                            telephone: d.telephone,
                            file: d.file,
                            checkedBreakfast: d.checkedBreakfast,
                            checkedLunch: d.checkedLunch,
                            checkedDinner: d.checkedDinner,
                        };
                    }),
                });

               

                this.setState({
                    isSkeleton: false,
                })
            })
            console.log("this is seniorsssss : ", this.state.seniors)

    }

    handleAddSenior = () => {

        this.setState({
            addSeniorPage: true,
        })
    }

    handleToggle = (i) => {
        const item = i;
        if (this.state.expand === item) {
            return this.setState({ expand: null })
        }


        return this.setState({ expand: item })


    }

    handleDialog = (message, isLoading) => {
        this.setState({
            message: message,
            isLoading: isLoading,
            //Update

        });
    };
    handleDialogDeleteCheckbox = (message, isLoadingDeleteCheckbox) => {
        this.setState({
            message: message,
            isLoadingDeleteCheckbox: isLoadingDeleteCheckbox,
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
            const seniors = this.state.seniors.filter(item => item.id !== this.myRef.current.id);
            seniorService.delete(this.myRef.current.id)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (this.myRef.current.file) {
                        seniorService.removeFileById(this.myRef.current.file);

                        console.log("this is file delete", this.myRef.current.file)
                    }
                    this.setState({
                        seniors
                    })

                });
            console.log(seniors);
            this.handleDialog("", false);
        } else {
            this.handleDialog("", false);
        }
    };

    /*******Delete many Seniors *********/
    deleteSeniorsByIds = (choose) => {

        if (choose) {
            console.log(this.state.selected);
            if (this.state.selected === true) {
                seniorService.deleteAll()
                    .then(() => {
                        this.setState({
                            selected: null,
                        })
                        this.retrieveSeniors();
                    })
            } else {
                seniorService.deleteByIds(this.state.select)
                    .then(res => {
                        this.retrieveSeniors();
                        console.log(res);
                        console.log(res.data);

                    })
            }

            this.handleDialogDeleteCheckbox("", false);
        } else {
            this.handleDialogDeleteCheckbox("", false);
        }


    }
    handleCheck = (e) => {
        let arrayIds = [...this.state.select];
        if (e.target.checked) {
            arrayIds = [...this.state.select, e.target.value];
        } else {
            arrayIds.splice(this.state.select.indexOf(e.target.value), 1);
        }
        this.setState({
            select: arrayIds,
        })
        console.log("this is array list : ", arrayIds)

    }

    handleAllCheck = (e) => {
        if (e.target.checked) {
            this.setState({
                selected: true,
            })
        } else {
            this.setState({
                selected: null,
            })
        }
    }


    handleShow = (senior, editDialog) => {
        console.log(senior)
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

        seniorService.update(id, senior).then(() => {
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
                    <TopBar title={'senior'} />
                    {
                        this.state.addSeniorPage ?
                            <div className="container-fluid py-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card mb-4">
                                            <div className="card-header pb-0 tableBG" >
                                                <div className="text-uppercase " ><h6 className="text-light ">Senior table</h6></div>

                                                <div style={{ display: "flex", paddingBottom: "10px" }}>
                                                    <div className="tableIcons" >
                                                        <NavLink class="btn btn-primary btn-lg" style={{ backgroundColor: "rgba(222, 222, 222,0.3)" }} to="#" onClick={() => { this.setState({ addSeniorPage: false }) }} role="button">
                                                            <FcPlus className="FcPlus" style={{ fontSize: "36px", paddingTop: "8px" }} />
                                                        </NavLink>
                                                    </div>
                                                    <div className="tableIcons" style={{ paddingLeft: "20px" }}>
                                                        <NavLink class="btn btn-primary btn-lg btn-floating" style={{ backgroundColor: "rgba(222, 222, 222,0.3)" }} to="#" onClick={() => { this.handleDialogDeleteCheckbox("Are you sure you want to delete selected seniors ?", true); }} role="button">
                                                            <FcEmptyTrash className="iconss" style={{ fontSize: "36px", paddingTop: "8px" }} />


                                                        </NavLink>
                                                    </div>


                                                </div>
                                            </div>
                                            <div className="card-body px-0 pt-0 pb-2">
                                                <div className="table-responsive p-0">

                                                    <table className="table align-items-center mb-0" id="table-to-xls">
                                                        <thead key="thead">
                                                            <tr key={"thead"}>
                                                                <th style={{ paddingLeft: "40px", width: "12px" }}>
                                                                    <div class="form-check">
                                                                        {this.state.seniors.length === 0 ?
                                                                            <>

                                                                                <input class="form-check-input" type="checkbox" onChange={this.handleAllCheck} disabled />
                                                                                <label class="form-check-label" for="flexCheckDisabled" >

                                                                                    Disabled
                                                                                </label></>
                                                                            :
                                                                            <>

                                                                                <input class="form-check-input" type="checkbox" onChange={this.handleAllCheck} />
                                                                            </>
                                                                        }
                                                                    </div>

                                                                </th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    Senior
                                                                </th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">
                                                                    CIN
                                                                </th>
                                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    Sex
                                                                </th>
                                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    Birth Date
                                                                </th>
                                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Actions</th>
                                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> </th>

                                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody key="tbody">
                                                            {this.state.isSkeleton ? (
                                                                <tr>
                                                                    <td colSpan="10">
                                                                        <Skeleton count={5} />

                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                <>
                                                                    {this.state.seniors
                                                                        .map((senior, i) =>
                                                                            <>
                                                                                <tr key={i}>
                                                                                    <td style={{ paddingLeft: "40px", width: "12px" }}>

                                                                                        <div class="form-check">
                                                                                            <input class="form-check-input" value={senior.id} type="checkbox" checked={this.state.selected} onChange={this.handleCheck} />

                                                                                        </div>

                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="d-flex px-2 py-1">


                                                                                            <div >
                                                                                                {senior.file === null ?
                                                                                                    <>
                                                                                                        {senior.sex === "male" ?
                                                                                                            <img
                                                                                                                src="..\..\..\assets\img\images\avatarNoimage.jpg"
                                                                                                                className="avatar avatar-sm me-3"
                                                                                                                alt="user1"
                                                                                                            />
                                                                                                            :
                                                                                                            <img
                                                                                                                src="..\..\..\assets\img\images\avatarW.jpg"
                                                                                                                className="avatar avatar-sm me-3"
                                                                                                                alt="user1"
                                                                                                            />

                                                                                                        }

                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                        <img
                                                                                                            src={`http://localhost:8080/files/${senior.file}`}
                                                                                                            className="avatar avatar-sm me-3"
                                                                                                            alt="user1"
                                                                                                        />
                                                                                                    </>

                                                                                                }
                                                                                            </div>
                                                                                            <div className="d-flex flex-column justify-content-center">
                                                                                                <h6 className="mb-0 text-sm">{senior.name}</h6>
                                                                                                <p className="text-xs text-secondary mb-0">
                                                                                                    {senior.lastname}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td >
                                                                                        <p className="text-xs font-weight-bold mb-0"><i className="fa fa-id-card" aria-hidden="true"></i> {senior.cin} </p>
                                                                                        <p className="text-xs text-secondary mb-0"><i className="fa fa-phone" aria-hidden="true"></i> {senior.telephone} </p>
                                                                                    </td>
                                                                                    <td className="align-middle text-center text-sm">
                                                                                        {senior.sex === "male" ?

                                                                                            <span className="badge badge-sm bg-gradient-info">
                                                                                                {senior.sex}
                                                                                            </span>
                                                                                            :
                                                                                            <span className="badge badge-sm bg-gradient-danger">
                                                                                                {senior.sex}
                                                                                            </span>
                                                                                        }
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
                                                                                    <td >
                                                                                        <a
                                                                                            href="#"
                                                                                            className="text-secondary font-weight-bold text-xs"
                                                                                            data-toggle="tooltip"
                                                                                            data-original-title="Edit user"
                                                                                            onClick={(e) => this.deleteSenior(senior, e)}
                                                                                        >
                                                                                            Delete
                                                                                        </a>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div style={{ cursor: "pointer" }} class="relative-bottom" onClick={() => this.handleToggle(i)}>
                                                                                            <h6>{this.state.expand === i ? <MdOutlineExpandLess size={30} /> : <MdOutlineExpandMore size={30} />}</h6>
                                                                                        </div>


                                                                                    </td>
                                                                                </tr>
                                                                                <tr style={this.state.expand === i ? { padding: "0.75rem 1.5rem", width: "100%", textTransform: "capitalize", letterSpacing: "0px", borderBottom: "1px solid #e9ecef" } : { display: "none", visibility: "hidden" }}>

                                                                                    <div style={{ height: "50px", paddingLeft: "70px", marginBottom: "2rem", display: "flex", whiteSpace: "nowrap", width: "150px" }} >
                                                                                        <label className="text-uppercase text-secondary text-s font-weight-bolder opacity-7">{senior.name} ate :</label>
                                                                                        <input


                                                                                            onChange={(e) => {

                                                                                                this.setState({
                                                                                                    seniors: this.state.seniors.map((data) => {
                                                                                                        if (data.id === senior.id) {
                                                                                                            data.checkedBreakfast = e.target.checked;
                                                                                                        }
                                                                                                        return data;
                                                                                                    }),
                                                                                                });

                                                                                                console.warn(arrayIds);
                                                                                                let arrayIds = [...this.state.selectListDIN];
                                                                                                if (e.target.checked) {
                                                                                                    let senioret = {
                                                                                                        name: senior.name,
                                                                                                        lastname: senior.lastName,
                                                                                                        dateOfBirth: senior.birthDate,
                                                                                                        sex: senior.sexOption,
                                                                                                        cin: senior.cin,
                                                                                                        telephone: senior.telephone,
                                                                                                        file: senior.file,
                                                                                                        checkedBreakfast: 1,
                                                                                                        checkedLunch: senior.checkedLunch,
                                                                                                        checkedDinner: senior.checkedDinner,
                                                                                                    };

                                                                                                    seniorService.update(
                                                                                                        e.target.value,
                                                                                                        senioret
                                                                                                    );
                                                                                                    arrayIds = [
                                                                                                        ...this.state.selectListDIN,
                                                                                                        e.target.value,
                                                                                                    ];

                                                                                                } else {
                                                                                                    let senioret = {
                                                                                                        name: senior.name,
                                                                                                        lastname: senior.lastName,
                                                                                                        dateOfBirth: senior.birthDate,
                                                                                                        sex: senior.sexOption,
                                                                                                        cin: senior.cin,
                                                                                                        telephone: senior.telephone,
                                                                                                        file: senior.file,
                                                                                                        checkedBreakfast: 0,
                                                                                                        checkedLunch: senior.checkedLunch,
                                                                                                        checkedDinner: senior.checkedDinner,
                                                                                                    };

                                                                                                    seniorService.update(
                                                                                                        e.target.value,
                                                                                                        senioret
                                                                                                    );
                                                                                                    arrayIds.splice(
                                                                                                        this.state.selectListDIN.indexOf(e.target.value),
                                                                                                        1
                                                                                                    );
                                                                                                }
                                                                                                this.setState({
                                                                                                    selectListDIN: arrayIds,
                                                                                                })

                                                                                            }
                                                                                            }
                                                                                            id={senior.id}
                                                                                            checked={senior.checkedDinner}
                                                                                            value={senior.id}
                                                                                            name="customCheckbox"
                                                                                            type="checkbox"
                                                                                            className="align-middle-input   " />
                                                                                        <label className="align-middle-label text-secondary">BREAKFAST </label>
                                                                                        <input type="checkbox" id={senior.id} className="align-middle-input  " />
                                                                                        <label for={senior.id} className="align-middle-label text-secondary">LUNCH </label>
                                                                                        <input type="checkbox" id="box-4" className="align-middle-input" />
                                                                                        <label for="box-4" className="align-middle-label text-secondary">DINNER </label>
                                                                                    </div>
                                                                                </tr>
                                                                            </>)
                                                                    }
                                                                </>
                                                            )}

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
                                <AddSenior addSeniorPage={this.handleAddSenior} />
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
                                        style={{ width: "40%" }}
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

                {this.state.isLoadingDeleteCheckbox && (
                    <Dialog
                        onDialog={this.deleteSeniorsByIds}
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