import { Alert, Snackbar } from '@mui/material';
import React from 'react'
import { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { FcEmptyTrash, FcPlus } from "react-icons/fc";
import { IoTrashOutline } from 'react-icons/io5';
import { MdEditNote } from 'react-icons/md';
import { SiCodechef, SiOpsgenie, SiRedhat } from "react-icons/si";
import Skeleton from 'react-loading-skeleton'
import { connect } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom';
import seniorService from '../../services/senior.service'
import userService from '../../services/user.service'
import { TabTitle } from '../../utils/GeneralFunctions'
import Dialog from '../Seniors/dialogDelete';
import RegisterComponent from './addUser'
import './staff.css'

class Staff extends Component {
    constructor(props) {
        super(props);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangelastname = this.onChangelastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.handleDialog = this.handleDialog.bind(this);
        this.deleteSenior = this.deleteSenior.bind(this);
        this.areUSureDelete = this.areUSureDelete.bind(this);
        this.myRef = React.createRef();
        this.state = {

            isAddStaff: true,
            editDialog: false,
            isLoading: false,
            message: "",
            users: [],
            fileInfo: [],
            user: null,
            name: "",
            lastName: "",
            username: "",
            email: "",
            mobile: "",
            adress: "",
            roles: null,
            toastDelete: false,
            toastUpdate: false,
            toastAdd: false,

        }

    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        this.setState({
            isSkeleton: true,
        })
        seniorService.getFiles().then(response => {

            this.setState({
                fileInfo: response.data,
                isSkeleton: false,
            })


        })

        userService.getAllUsers()
            .then((res) => {
                this.setState({
                    users: res.data,
                })

            })
    }


    handleShow = (user, editDialog) => {

        this.myRef.current = user;

        this.setState({
            editDialog: editDialog,
            name: this.myRef.current.name,
            lastName: this.myRef.current.lastName,
            email: this.myRef.current.email,
            mobile: this.myRef.current.mobile,
            adress: this.myRef.current.adress,




        })


    }

    handleClose = () => {
       
        this.setState({
            editDialog: false,
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const id = this.myRef.current.id;

        let user = {
            id: id,
            name: this.state.name,
            lastName: this.state.lastName,
            username: this.myRef.current.username,
            email: this.state.email,
            mobile: this.state.mobile,
            adress: this.state.adress,
            roles: this.myRef.current.roles,
            password: this.myRef.current.password,
            gender: this.myRef.current.gender,
            picture: this.myRef.current.picture






        };


        userService.updateUser(user.id, user).then(() => {
            this.getAllUsers();
            this.handleClose();
            this.setState({
                toastUpdate:true,
            })
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

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }
    onChangeMobile = (e) => {
        this.setState({
            mobile: e.target.value,
        });
    }
    onChangeAdress = (e) => {
        this.setState({
            adress: e.target.value,
        });
    }


    handleDialog = (message, isLoading) => {
        this.setState({
            message: message,
            isLoading: isLoading,
            //Update

        });
    };


    ChangeisAddStaff = () => {
       
        this.setState({   isAddStaff: true })
    }
    toastAddShow = () => {
        this.setState({ toastAdd: true })
    }
    deleteSenior=(user)=> {
        this.handleDialog("Are you sure you want to delete?", true)
        this.myRef.current = user;
    }

    areUSureDelete = (choose) => {
        if (choose) {
            const users = this.state.users.filter(item => item.id !== this.myRef.current.id);
            userService.delete(this.myRef.current.id)
                .then(res => {
                    if (this.myRef.current.picture) {
                        seniorService.removeFileById(this.myRef.current.picture.id);

                        console.log("this is file delete", this.myRef.current.picture.id)
                    }
                    this.setState({
                        users,
                        toastDelete:true,
                    })

                });
            this.handleDialog("", false);
        } else {
            this.handleDialog("", false);
        }
    };

    render() {
        TabTitle('Staff');
        const { user: currentUser } = this.props;
        if (!currentUser) {

            return <Navigate to="/notFound" />;

        }

        return (
            <div className='staff'>
                <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">

                    {this.state.isAddStaff ?
                        <div className="container-fluid py-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-4">
                                        <div className="card-header pb-0 tableBG" >
                                            <div className="text-uppercase " ><h6 className="text-light ">Staff</h6></div>

                                            <div style={{ display: "flex", paddingBottom: "10px" }}>
                                                <div className="tableIcons" >
                                                    <NavLink style={{ backgroundColor: "rgba(222, 222, 222,0.2)", width: "50px", justifyItems: "center", justifyContent: "center" }} to="#" onClick={() => { this.setState({ isAddStaff: false }) }} role="button">
                                                        <FcPlus className="FcPlus" size={50} style={{ fontSize: "36px", marginLeft: "2px", paddingTop: "8px" }} />
                                                    </NavLink>
                                                </div>
                                                <div className="tableIcons" style={{ paddingLeft: "20px" }}>
                                                    <NavLink style={{ backgroundColor: "rgba(222, 222, 222,0.2)" }} to="#" onClick={() => { this.handleDialogDeleteCheckbox("Are you sure you want to delete selected persons ?", true); }} role="button">
                                                        <FcEmptyTrash className="iconss" size={50} style={{ fontSize: "36px", marginLeft: "2px", paddingTop: "8px" }} />


                                                    </NavLink>
                                                </div>


                                            </div>
                                        </div>
                                        <div className="card-body px-0 pt-0 pb-2">
                                            <div className="table-responsive p-0">

                                                <table className="table align-items-center mb-0" id="table-to-xls" style={{ overflow: "hidden" }}>
                                                    <thead className='theadstafTable' key="thead">
                                                        <tr key={"thead"}>
                                                            <th style={{ paddingLeft: "40px", width: "12px" }} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Select
                                                            </th>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                User
                                                            </th>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                                Username
                                                            </th>
                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Email
                                                            </th>
                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Role
                                                            </th>
                                                            <th className="text-secondary opacity-7">Action</th>
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
                                                                {this.state.users
                                                                .filter(item=>item.roles[0].name!=="ROLE_ADMIN")
                                                                    .map((user, i) =>
                                                                        <tr key={i}>
                                                                            <td style={{ paddingLeft: "40px", width: "12px" }}>

                                                                                <h6 className="mb-0 text-sm">{user.id}</h6>
                                                                            </td>
                                                                            <td>




                                                                                <div className="d-flex px-2 py-1">

                                                                                    <div>
                                                                                        {user.picture === null ?
                                                                                            <>
                                                                                                {user.gender === "male" ?
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
                                                                                                    src={`http://localhost:8080/files/${user.picture.id}`}
                                                                                                    className="avatar avatar-sm me-3"
                                                                                                    alt="user1"
                                                                                                />
                                                                                            </>

                                                                                        }
                                                                                    </div>

                                                                                    <div className="d-flex flex-column justify-content-center">
                                                                                        <h6 className="mb-0 text-sm">{user.name}</h6>
                                                                                        <p className="text-xs text-secondary mb-0">
                                                                                            {user.lastName}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>

                                                                                <p className="text-xs text-secondary mb-0"><i className="fa fa-user" aria-hidden="true"></i> {user.username} </p>
                                                                                <p className="text-xs text-secondary mb-0"><i className="fa fa-phone" aria-hidden="true"></i> {user.mobile} </p>
                                                                            </td>
                                                                            <td className="align-middle text-center text-sm">

                                                                                {user.email}

                                                                            </td>
                                                                            <td className="align-middle text-center" >

                                                                                {user.roles.map(rolee => <>

                                                                                    {rolee.name === "ROLE_ACCOMPAGNANT" ?
                                                                                        <div> <SiOpsgenie color='#2E90B8' /> <br />{rolee.name.substring(5, 17)}</div>
                                                                                        : rolee.name === "ROLE_CHEF" ?

                                                                                            <div>  <SiCodechef color='#2E90B8' /><br /> {rolee.name.substring(5, 17)} </div>
                                                                                            :
                                                                                            <div>  <SiRedhat color='#2E90B8' /><br /> {rolee.name.substring(5, 17)}</div>
                                                                                    }
                                                                                </>

                                                                                )}

                                                                            </td>
                                                                            <td className="align-middle">
                                                                                <div className="col-lg-6 col-5 my-auto text-end" >
                                                                                    <div className="dropdown float-lg-end ">
                                                                                        <a className="cursor-pointer" href='/' id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                            <i className="fa fa-ellipsis-v text-secondary"></i>
                                                                                        </a>
                                                                                        <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                                                                                            <li><a className="dropdown-item border-radius-md" style={{ color: "black" }} href="#" onClick={(e) => this.handleShow(user, true)}> Edit <MdEditNote /></a></li>

                                                                                            <li><a className="dropdown-item border-radius-md" style={{ color: "black" }} href="#" onClick={(e) => this.deleteSenior(user, e)}>Delete <IoTrashOutline />  </a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>


                                                                            </td>


                                                                        </tr>)
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
                            <Snackbar open={this.state.toastDelete} autoHideDuration={6000} onClose={() => this.setState({ toastDelete: false })}>
                                <Alert onClose={() => this.setState({ toastDelete: false })} severity="info" sx={{ padding: "15px", height: "70px", width: '100%' }}>
                                    User is deleted successfully
                                </Alert>
                            </Snackbar>
                            <Snackbar open={this.state.toastUpdate} autoHideDuration={6000} onClose={() => this.setState({ toastUpdate: false })}>
                                <Alert onClose={() => this.setState({ toastUpdate: false })} severity="info" sx={{ padding: "15px", height: "70px", width: '100%' }}>
                                User is updated successfully
                                </Alert>
                            </Snackbar>
                            <Snackbar open={this.state.toastAdd} autoHideDuration={6000} onClose={() => this.setState({ toastAdd: false })}>
                                <Alert onClose={() => this.setState({ toastAdd: false })} severity="success" sx={{ padding: "15px", height: "70px", width: '100%' }}>
                                User added successfully
                                </Alert>
                            </Snackbar>
                        </div>
                        :
                        <>
                            <RegisterComponent toastAddShow={this.toastAddShow} getAllUsers={this.getAllUsers} isAddStaff={this.ChangeisAddStaff} />
                        </>
                    }

                    <Modal show={this.state.editDialog} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Edit USER
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
                                        placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                    />
                                </Form.Group>
                                <Form.Group style={{ padding: "12px 12px 0" }}>
                                    <Form.Control
                                        type="number"
                                        placeholder="Phone"
                                        name="phone"
                                        value={this.state.mobile}
                                        onChange={this.onChangeMobile}
                                    />
                                </Form.Group>
                                <Form.Group style={{ padding: "12px 12px 0" }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="adress"
                                        name="adress"
                                        value={this.state.adress}
                                        onChange={this.onChangeAdress}
                                    />
                                </Form.Group>


                                <Button variant="success" type="submit" className="btn  btn-rounded"
                                    style={{
                                        border: "2px solid ",
                                        alignItems: "center",
                                        margin: "10% 0 0 27%",
                                        backgroundColor: "#D24548",
                                        cursor: "pointer",

                                    }}>
                                    Edit User
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


                </main>

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
export default connect(mapStateToProps)(Staff);
