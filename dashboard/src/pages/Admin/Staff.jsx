import React from 'react'
import { Component } from 'react'
import Skeleton from 'react-loading-skeleton'
import { connect } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import TopBar from '../../components/TopBar/TopBar'
import seniorService from '../../services/senior.service'
import userService from '../../services/user.service'
import { TabTitle } from '../../utils/GeneralFunctions'
import RegisterComponent from '../Sign up&in/register.component'
import './staff.css'

class Staff extends Component {
    constructor(props) {
        super(props);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.state = {

            isAddStaff: true,
            users:[],
            fileInfo:[],

        } 

    }

    componentDidMount(){
        this.getAllUsers();
    }


    getAllUsers =()=>{
        seniorService.getFiles().then(response => {

            this.setState({
                fileInfo: response.data,
            })
            console.log("file infos : ", JSON.stringify(response.data))
        })

        userService.getAllUsers()
        .then((res)=>{
            this.setState({
                users:res.data,
            })
            console.log("userss : ",this.state.users)
        })
    }

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
                    <TopBar />
                    {this.state.isAddStaff ?
                        <div className="container-fluid py-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-4">
                                        <div className="card-header pb-0" style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div><h6>Staff</h6></div>
                                            <div>
                                                <NavLink class="btn btn-primary btn-lg btn-floating" style={{ backgroundColor: "rgba(173, 57, 123,0.4)" }} to="#" onClick={() => { this.setState({ isAddStaff: false }) }} role="button">
                                                    <i className="fa fa-plus" style={{ fontSize: "36px", paddingTop: "8px" }}></i>
                                                </NavLink>

                                            </div>
                                        </div>
                                        <div className="card-body px-0 pt-0 pb-2">
                                            <div className="table-responsive p-0">

                                                <table className="table align-items-center mb-0" id="table-to-xls">
                                                    <thead key="thead">
                                                        <tr key={"thead"}>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">

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
                                                                Birth Date
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
                                                                                <div >
                                                                                    {user.fileId===null?
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
                                                                                    
                                                                                </div>
                                                                                <h6 className="mb-0 text-sm">{user.id}</h6>
                                                                            </td>
                                                                            <td>
                                                                                <div className="d-flex px-2 py-1">



                                                                                    <div className="d-flex flex-column justify-content-center">
                                                                                        <h6 className="mb-0 text-sm">{user.name}</h6>
                                                                                        <p className="text-xs text-secondary mb-0">
                                                                                        {user.lastName}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <p className="text-xs font-weight-bold mb-0"><i className="fa fa-id-card" aria-hidden="true"></i>  </p>
                                                                                <p className="text-xs text-secondary mb-0"><i className="fa fa-phone" aria-hidden="true"></i> {user.username} </p>
                                                                            </td>
                                                                            <td className="align-middle text-center text-sm">
                                                                                <span className="badge badge-sm bg-gradient-info">
                                                                                {user.email}
                                                                                </span>
                                                                            </td>
                                                                            <td className="align-middle text-center">
                                                                                <span className="text-secondary text-xs font-weight-bold">
                                                                               
                                                                                </span>
                                                                            </td>
                                                                          {/*  <td className="align-middle">
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

                                                                            </td>*/}
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
