import React from 'react'
import { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { FcEmptyTrash, FcPlus } from "react-icons/fc";
import { SiCodechef, SiOpsgenie,SiRedhat } from "react-icons/si";
import Skeleton from 'react-loading-skeleton'
import { connect } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import TopBar from '../../components/TopBar/TopBar'
import seniorService from '../../services/senior.service'
import userService from '../../services/user.service'
import { TabTitle } from '../../utils/GeneralFunctions'
import Dialog from '../Seniors/dialogDelete';
import RegisterComponent from '../Sign up&in/register.component'
import './staff.css'

class Staff extends Component {
    constructor(props) {
        super(props);
        this.getAllUsers = this.getAllUsers.bind(this);
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
            roles: null,

        }

    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        seniorService.getFiles().then(response => {

            this.setState({
                fileInfo: response.data,
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
        console.log(user)
        this.myRef.current = user;
        console.log("aaaaaaaaaa",user)
        this.setState({
            editDialog: editDialog,
            name: this.myRef.current.name,
            lastName: this.myRef.current.lastName,
            username: this.myRef.current.username,
            email: this.myRef.current.email,
            

        })


    }

    handleClose = () => {
        this.getAllUsers();
        this.setState({
            editDialog: false,
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const id = this.myRef.current.id;

        let user = {
            id : id,
            name: this.state.name,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            
           

        };

        userService.updateUser(user).then(() => {
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
    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    }
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    
    handleDialog = (message, isLoading) => {
        this.setState({
            message: message,
            isLoading: isLoading,
            //Update

        });
    };



    deleteSenior(id) {
        this.handleDialog("Are you sure you want to delete?", true)
        this.myRef.current = id;
    }

    areUSureDelete = (choose) => {
        if (choose) {
            const users = this.state.users.filter(item => item.id !== this.myRef.current.id);
            userService.delete(this.myRef.current.id)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (this.myRef.current.file){
                    seniorService.removeFileById(this.myRef.current.file);

                    console.log("this is file delete",this.myRef.current.file)
                    }
                    this.setState({
                        users
                    })

                });
                console.log(users);
            this.handleDialog("", false);
        } else {
            this.handleDialog("", false);
        }
    };

    render() {
        TabTitle('Staff');
        const { user: currentUser } = this.props;
        if (!currentUser || !currentUser.roles.includes("ROLE_ADMIN")) {
            console.log(currentUser)
            return <Navigate to="/notFound" />;

        }

        return (
            <div className='staff'>
                <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
                    <TopBar title={"Staff"} />
                    {this.state.isAddStaff ?
                        <div className="container-fluid py-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-4">
                                        <div className="card-header pb-0 tableBG" >
                                            <div className="text-uppercase " ><h6 className="text-light ">Staff</h6></div>
                                            <div style={{ display: "flex", paddingBottom: "10px" }}>
                                                <div className="tableIcons" >
                                                    <NavLink class="btn btn-primary btn-lg" style={{ backgroundColor: "rgba(222, 222, 222,0.3)" }} to="#" onClick={() => { this.setState({ isAddStaff: false }) }} role="button">
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
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
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
                                                            <th className="text-secondary opacity-7"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody key="tbody">
                                                        {this.state.users.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="10">
                                                                    <Skeleton count={5} />

                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            <>
                                                                {this.state.users
                                                                    .map((user, i) =>
                                                                        <tr key={i}>
                                                                            <td>

                                                                                <h6 className="mb-0 text-sm">{user.id}</h6>
                                                                            </td>
                                                                            <td>




                                                                                <div className="d-flex px-2 py-1">

                                                                                    {user.fileId === null ?
                                                                                        <>
                                                                                            <img
                                                                                                src="..\..\..\..\assets\img\images\avatarNoimage.jpg"
                                                                                                className="avatar avatar-sm me-3"
                                                                                                alt="user1"
                                                                                            />
                                                                                        </>
                                                                                        :
                                                                                        <img
                                                                                            src={`http://localhost:8080/files/${user.fileId}`}
                                                                                            className="avatar avatar-sm me-3"
                                                                                            alt="user1"
                                                                                        />

                                                                                    }

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
                                                                            </td>
                                                                            <td className="align-middle text-center text-sm">

                                                                                {user.email}

                                                                            </td>
                                                                            <td className="align-middle text-center" >

                                                                                {user.roles.map(rolee => <>

                                                                                    {rolee.name === "ROLE_ACCOMPAGNANT" ?
                                                                                        <div> <SiOpsgenie color='#2E90B8' /> <br/>{rolee.name.substring(5, 17)}</div>
                                                                                        :rolee.name==="ROLE_CHEF"?

                                                                                        <div>  <SiCodechef color='#2E90B8' /><br/> {rolee.name.substring(5, 17)} </div>
                                                                                        :
                                                                                        <div>  <SiRedhat color='#2E90B8' /><br/> {rolee.name.substring(5, 17)}</div>
                                                                                    }
                                                                                </>

                                                                                )}

                                                                            </td>
                                                                            <td className="align-middle">
                                                                                <a
                                                                                    href="#"
                                                                                    className="text-secondary font-weight-bold text-xs"
                                                                                    data-toggle="tooltip"
                                                                                    data-original-title="Edit user"
                                                                                    onClick={(e) => this.handleShow(user, true)}
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
                                                                                    onClick={(e) => this.deleteSenior(user, e)}
                                                                                >
                                                                                    Delete
                                                                                </a>

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
                        </div>
                        :
                        <>
                            <RegisterComponent />
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
                                        placeholder="Cin"
                                        name="cin"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                    />
                                </Form.Group>
                                <Form.Group style={{ padding: "12px 12px 0" }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Phone"
                                        name="phone"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
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
