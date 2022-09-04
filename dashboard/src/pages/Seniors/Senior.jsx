
import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { FcEmptyTrash, FcPlus, FcSearch } from "react-icons/fc";
import seniorService from "../../services/senior.service";
import { TabTitle } from "../../utils/GeneralFunctions";
import { Modal, Button, Form } from 'react-bootstrap';
import Dialog from "./dialogDelete";
import AddSenior from "./AddSenior/AddSenior"
import "./Senior.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MdEditNote, MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";
import Pagination from "../Chef/Pagination";
import SeniorDetails from "./SeniorDetails/SeniorDetails";
import './Senior.scss';
import { Alert, CircularProgress, Snackbar, Tooltip } from "@mui/material";
import {
    withStyles
} from "@material-ui/core/styles";

const BlueOnGreenTooltip = withStyles({
    tooltip: {
        color: "#1a2228",
        backgroundColor: "rgba(250, 250, 255, 1)",
        textTransform: "uppercase"
    }

})(Tooltip);



class Senior extends Component {
    constructor(props) {
        super(props);

        this.handleDialog = this.handleDialog.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.retrieveSeniors = this.retrieveSeniors.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.myRef = React.createRef();
        this.state = {

            seniors: [],
            message: "",
            isLoading: false,
            isLoadingDeleteCheckbox: false,
            isSkeleton: false,
            addSeniorPage: "getSenior",
            section: "section1",
            editDialog: false,
            expand: false,
            toastDelete: false,
            toasUpdate: false,
            senior: null,
            sArch: null,
            name: "",
            lastName: "",
            telephone: "",
            sexOption: "male",
            seniorPicture: null,
            birthDate: null,
            interests: "",
            cin: "",
            selectedFile: null,
            fileId: null,
            imgChange: false,
            selected: null,
            select: [],
            fileInfo: [],
            selectListDIN: [],
            dinnerMenu: [],
            seniorMeds: [],
            currentPage: 1,
            seniorsPerPage: 4,
            seniorArch: null,
            loadingFood: false,
            searchTerm: "",






        };
    }





    componentDidMount() {
        this.retrieveSeniors();

    }
    componentDidUpdate = (prevProps, prevState) => {

        if (prevState.addSeniorPage !== this.state.addSeniorPage) {

            this.retrieveSeniors();
            this.setState({
                expand: false
            })



        }
        if (prevState.seniors.length < this.state.seniors.length) {
            this.setState({
                currentPage: Math.ceil(this.state.seniors.length / this.state.seniorsPerPage),
                expand: false
            })

        }
    };

    retrieveArch = (senior) => {



        seniorService.getArchiveBySenior(senior.id)
            .then((res) => {
                this.setState({
                    seniorArch: res.data.filter((arch) => {
                        let arg;

                        if (arch.date === new Date().toISOString().split("T")[0]) {
                            let archive = {
                                idArch: arch.idArch,
                                date: arch.date,
                                checkedLunch: arch.checkedLunch,
                                checkedDinner: arch.checkedDinner,
                                checkedBreakfast: arch.checkedBreakfast,


                            }
                            arg = archive;
                        }
                        return arg
                    })

                })
                this.setState({
                    loadingFood: false,
                })



            });




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
                            id: d.id,
                            name: d.name,
                            lastname: d.lastname,
                            dateOfBirth: d.dateOfBirth,
                            sex: d.sex,
                            cin: d.cin,
                            telephone: d.telephone,
                            file: d.file,
                            adress: d.adress,
                            famillySituation: d.famillySituation,
                            centerOfInterest: d.centerOfInterest,
                            checkedBreakfast: d.checkedBreakfast,
                            checkedLunch: d.checkedLunch,
                            checkedDinner: d.checkedDinner,
                            menus: d.menus,
                        };
                    }),
                });


                this.setState({
                    currentPage: 1,
                    isSkeleton: false,
                })

            })

    }

    handleAddSenior = () => {

        this.setState({
            addSeniorPage: "getSenior",
        })
    }

    handleDetails = (senior) => {
        this.myRef.current = senior;
        this.setState({
            addSeniorPage: "seniorDetails"
        })
    }

    handleToggle = (i, senior) => {
        this.setState({
            loadingFood: true,
        })
        const item = i;
        if (this.state.expand === item) {
            return this.setState({ expand: null })
        }


        return (

            this.retrieveArch(senior),
            this.setState({
                section: "section1",
                expand: item,


            })


        )




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

        this.setState({
            editDialog: false,
            imgChange: false,
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
                    if (Math.ceil(this.state.seniors.length / this.state.seniorsPerPage) !== Math.ceil(seniors.length / this.state.seniorsPerPage)) {
                        this.setState({
                            currentPage: (Math.ceil(seniors.length / this.state.seniorsPerPage))
                        })

                    }
                    if (this.myRef.current.file) {
                        seniorService.removeFileById(this.myRef.current.file);

                    }
                    this.setState({
                        seniors,
                        toastDelete: true,

                    })

                });

            this.handleDialog("", false);
        } else {
            this.handleDialog("", false);
        }
    };

    /*******Delete many Seniors *********/
    deleteSeniorsByIds = (choose) => {

        if (choose) {

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
            this.setState({
                toastDelete: true
            })

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

        this.myRef.current = senior;
        this.setState({
            editDialog: editDialog,
            name: this.myRef.current.name,
            lastName: this.myRef.current.lastname,
            cin: this.myRef.current.cin,
            telephone: this.myRef.current.telephone,
            birthDate: this.myRef.current.dateOfBirth,
            sexOption: this.myRef.current.sex,
            seniorPicture: this.myRef.current.file,
        })



    }
    handleUpdate = (e) => {
        e.preventDefault();
        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append(
            "file",
            this.state.selectedFile,
        );
        const id = this.myRef.current.id;
        if (this.state.selectedFile) {
            seniorService.upload(formData).then(res => {
                console.log("rr", res.data)
                this.setState({
                    fileId: res.data.id,
                })


            }).then(() => {
                let senior = {
                    name: this.state.name,
                    lastname: this.state.lastName,
                    telephone: this.state.telephone,
                    cin: this.state.cin,
                    dateOfBirth: this.state.birthDate,
                    sex: this.state.sexOption,
                    file: this.state.fileId,
                    adress: this.myRef.current.adress,
                    checkedBreakfast: this.myRef.current.checkedBreakfast,
                    checkedLunch: this.myRef.current.checkedLunch,
                    checkedDinner: this.myRef.current.checkedDinner,
                    menus: this.myRef.current.menus

                };
                seniorService.update(id, senior).then(() => {
                    this.retrieveSeniors();
                    this.handleClose();
                })
            })
        } else {



            let senior = {
                name: this.state.name,
                lastname: this.state.lastName,
                telephone: this.state.telephone,
                cin: this.state.cin,
                dateOfBirth: this.state.birthDate,
                sex: this.state.sexOption,
                file: this.myRef.current.file,
                adress: this.myRef.current.adress,
                checkedBreakfast: this.myRef.current.checkedBreakfast,
                checkedLunch: this.myRef.current.checkedLunch,
                checkedDinner: this.myRef.current.checkedDinner,
                menus: this.myRef.current.menus

            };


            seniorService.update(id, senior).then(() => {
                this.retrieveSeniors();
                this.handleClose();
                this.setState({
                    toasUpdate: true,
                })
            })
        }
    }

    onChangeImage = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ seniorPicture: reader.result, selectedFile: e.target.files[0], imgChange: true })


            }
        }
        reader.readAsDataURL(e.target.files[0])
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
        // Get current meals
        const indexOfLastSenior = this.state.currentPage * this.state.seniorsPerPage;
        const indexOfFirstSenior = indexOfLastSenior - this.state.seniorsPerPage;
        const currentSeniors = this.state.seniors.slice(indexOfFirstSenior, indexOfLastSenior);

        // Change page
        const paginate = (pageNumber) => this.setState({
            currentPage: pageNumber,
            expand: null
        });


        TabTitle(this.props.title);

        const { user: currentUser } = this.props;
        const { socket: socket } = this.props;
        if (!currentUser) {
            return <Navigate to="/notFound" />;

        }



        return (
            <div className="seniorList">
                <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">

                    {
                        this.state.addSeniorPage === "getSenior" ?
                            (
                                <div className="container-fluid py-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card mb-4">
                                                <div className="card-header pb-0 tableBG" >
                                                    <div className="text-uppercase " ><h6 className="text-light ">{this.props.tableSenior}</h6></div>

                                                    <div style={{ display: "flex", paddingBottom: "10px" }}>
                                                        <div className="tableIcons" style={{ paddingLeft: "20px" }} >



                                                            <div className="searchh-box" >
                                                                <BlueOnGreenTooltip title="search" placement="top">
                                                                    <NavLink  className="btn-searchh" to="#" role="button" 
                                                                    style={this.state.searchTerm!==""? { backgroundColor: "rgba(255, 165, 0,0.5)", width: "50px", justifyItems: "center", justifyContent: "center", paddingTop: "-20px" }:
                                                                { backgroundColor: "rgba(222, 222, 222,0.2)", width: "50px", justifyItems: "center", justifyContent: "center", paddingTop: "-20px" }} >
                                                                        <FcSearch className="FcPlus" size={50} style={{ fontSize: "36px", marginLeft: "2px", paddingTop: "8px" }} />
                                                                    </NavLink>
                                                                </BlueOnGreenTooltip >


                                                                <input type="search" value={this.state.searchTerm}  className="input-searchh" placeholder="Type to Search..." onChange={(event) => {
                                                                    this.setState({
                                                                        searchTerm: event.target.value
                                                                    })
                                                                    if (event.target.value !== "") {
                                                                        event.preventDefault();
                                                                        this.setState({
                                                                            currentPage: 1,
                                                                            seniorsPerPage:20
                                                                        })

                                                                    } else {
                                                                        this.setState({

                                                                            seniorsPerPage: 4
                                                                        })
                                                                    }
                                                                }} />
                                                                
                                                            </div>

                                                        </div>
                                                        <div className="tableIcons" style={{ paddingLeft: "20px" }}>



                                                            <BlueOnGreenTooltip title="add new senior" placement="top">
                                                                <NavLink style={{ backgroundColor: "rgba(222, 222, 222,0.2)", width: "50px", justifyItems: "center", justifyContent: "center", paddingTop: "-20px" }} to="#" onClick={() => { this.setState({ addSeniorPage: "addSenior" }) }} role="button">
                                                                    <FcPlus className="FcPlus" size={50} style={{ fontSize: "36px", marginLeft: "2px", paddingTop: "8px" }} />
                                                                </NavLink>
                                                            </BlueOnGreenTooltip >

                                                        </div>
                                                        <div className="tableIcons" style={{ paddingLeft: "20px" }}>
                                                            <BlueOnGreenTooltip title="delete selected seniors" placement="top">
                                                                <NavLink style={{ backgroundColor: "rgba(222, 222, 222,0.2)" }} to="#" onClick={() => { this.handleDialogDeleteCheckbox("Are you sure you want to delete selected seniors ?", true); }} role="button">
                                                                    <FcEmptyTrash className="iconss" size={50} style={{ fontSize: "36px", marginLeft: "2px", paddingTop: "8px" }} />


                                                                </NavLink>
                                                            </BlueOnGreenTooltip>
                                                        </div>


                                                    </div>
                                                </div>
                                                <div className="card-body px-0 pt-0 pb-2">
                                                    <div className="table-responsive p-0">

                                                        <table className="table align-items-center mb-0" id="table-to-xls" style={{ overflow: "hidden" }}>
                                                            <thead key="thead">
                                                                <tr key={"thead"}>
                                                                    <th style={{ paddingLeft: "40px", width: "12px" }}>
                                                                        <div className="form-check">
                                                                            {this.state.seniors.length === 0 ?
                                                                                <>

                                                                                    <input className="form-check-input" type="checkbox" onChange={this.handleAllCheck} disabled />
                                                                                    <label className="form-check-label" htmlFor="flexCheckDisabled" >

                                                                                        Disabled
                                                                                    </label></>
                                                                                :
                                                                                <>

                                                                                    <input className="form-check-input" type="checkbox" onChange={this.handleAllCheck} />
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
                                                                        {currentSeniors.filter((s) => {
                                                                            if (this.state.searchTerm === "") {
                                                                                return s;
                                                                            } else if (
                                                                                s.name
                                                                                    .toLowerCase()
                                                                                    .includes(this.state.searchTerm.toLowerCase()) ||
                                                                                s.lastname
                                                                                    .toLowerCase()
                                                                                    .includes(this.state.searchTerm.toLowerCase()) ||
                                                                                s.cin
                                                                                    .toLowerCase()
                                                                                    .includes(this.state.searchTerm.toLowerCase()) ||
                                                                                s.telephone
                                                                                    .toLowerCase()
                                                                                    .includes(this.state.searchTerm.toLowerCase()) ||
                                                                                s.adress
                                                                                    .toLowerCase()
                                                                                    .includes(this.state.searchTerm.toLowerCase())
                                                                            ) {
                                                                                return s;
                                                                            }
                                                                        })
                                                                            .map((senior, i) =>
                                                                                <>
                                                                                    <tr key={i}>
                                                                                        <td style={{ paddingLeft: "40px", width: "12px" }}>

                                                                                            <div className="form-check">
                                                                                                <input className="form-check-input" value={senior.id} type="checkbox" checked={this.state.selected} onChange={this.handleCheck} />

                                                                                            </div>
                                                                                            <div>
                                                                                                {senior.id}
                                                                                            </div>

                                                                                        </td>
                                                                                        <td>
                                                                                            <div className="d-flex px-2 py-1">


                                                                                                <div  >
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
                                                                                            <div className="col-lg-6 col-5 my-auto text-end" >
                                                                                                <div className="dropdown float-lg-end ">
                                                                                                    <a className="cursor-pointer" href='/' id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                                        <i className="fa fa-ellipsis-v text-secondary"></i>
                                                                                                    </a>
                                                                                                    <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                                                                                                        <li><a className="dropdown-item border-radius-md" style={{ color: "black" }} href="#/" onClick={(e) => this.handleShow(senior, true)}> Edit <MdEditNote /></a></li>
                                                                                                        <li><a className="dropdown-item border-radius-md" style={{ color: "black" }} href="#/" onClick={() => this.handleDetails(senior)} >Details <BiDetail /></a></li>
                                                                                                        <li><a className="dropdown-item border-radius-md" style={{ color: "black" }} href="#/" onClick={(e) => this.deleteSenior(senior, e)}>Delete <IoTrashOutline />  </a></li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </div>


                                                                                        </td>

                                                                                        <td >
                                                                                            <div style={{ cursor: "pointer" }} className="relative-bottom" onClick={(e) => this.handleToggle(i + this.state.currentPage, senior)}>
                                                                                                <h6>{this.state.expand === i + this.state.currentPage ? <MdOutlineExpandLess size={30} /> : <MdOutlineExpandMore size={30} />}</h6>
                                                                                            </div>


                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr style={this.state.expand === i + this.state.currentPage ? { padding: "0.75rem 1.5rem", width: "100%", textTransform: "capitalize", letterSpacing: "0px", borderBottom: "1px solid #e9ecef" } : { display: "none", visibility: "hidden" }}>
                                                                                        <th style={{ padding: "0.75rem 4.5rem" }}>

                                                                                        </th>
                                                                                        {this.state.loadingFood ?
                                                                                            <td>
                                                                                                <CircularProgress color="inherit" />
                                                                                            </td>
                                                                                            :
                                                                                            <td >



                                                                                                <div id="section1" style={{ position: "relative", height: "50px", paddingLeft: "80px", display: "flex", whiteSpace: "nowrap", width: "150px" }} >
                                                                                                    <label className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 my-3  text-start m-0">Food :</label>
                                                                                                    <input
                                                                                                        id={senior.id + "BREAKFAST"}
                                                                                                        checked={this.state.seniorArch && this.state.seniorArch[0].checkedBreakfast}
                                                                                                        value={senior.id}
                                                                                                        name="customCheckbox"
                                                                                                        type="checkbox"
                                                                                                        className="align-middle-input   "

                                                                                                        onChange={(e) => {

                                                                                                            this.setState({
                                                                                                                seniors: this.state.seniors.map((data) => {

                                                                                                                    if (data.id === senior.id) {
                                                                                                                        data.checkedBreakfast = e.target.checked;
                                                                                                                    }
                                                                                                                    return data;
                                                                                                                }),
                                                                                                                seniorArch: this.state.seniorArch.map((data) => {
                                                                                                                    console.log(data, "dt")
                                                                                                                    if (data.senior.id === senior.id) {
                                                                                                                        data.checkedBreakfast = e.target.checked;
                                                                                                                    }
                                                                                                                    console.log(data, "df")
                                                                                                                    return data;
                                                                                                                }),
                                                                                                            });




                                                                                                            let arrayIds = [...this.state.selectListDIN];
                                                                                                            if (e.target.checked) {
                                                                                                                let senioret = {
                                                                                                                    name: senior.name,
                                                                                                                    lastname: senior.lastname,
                                                                                                                    dateOfBirth: senior.dateOfBirth,
                                                                                                                    sex: senior.sex,
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
                                                                                                                    lastname: senior.lastname,
                                                                                                                    dateOfBirth: senior.dateOfBirth,
                                                                                                                    sex: senior.sex,
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
                                                                                                            let senioret = {
                                                                                                                name: senior.name,
                                                                                                                lastname: senior.lastname,
                                                                                                                dateOfBirth: senior.dateOfBirth,
                                                                                                                sex: senior.sex,
                                                                                                                cin: senior.cin,
                                                                                                                telephone: senior.telephone,
                                                                                                                file: senior.file,
                                                                                                                checkedBreakfast: senior.checkedBreakfast,
                                                                                                                checkedLunch: senior.checkedLunch,
                                                                                                                checkedDinner: senior.checkedDinner,
                                                                                                                menus: senior.menus,
                                                                                                            };

                                                                                                            seniorService.getMedicationBySenior(senior.id).then((res) => {
                                                                                                                this.setState({ seniorMeds: res.data })
                                                                                                            })

                                                                                                            let archive = {
                                                                                                                idArch: `arch-${senior.id}-${new Date().toISOString().split("T")[0]}`,
                                                                                                                senior: senior,
                                                                                                                date: new Date().toISOString().split("T")[0],
                                                                                                                checkedBreakfast: this.state.seniorArch[0].checkedBreakfast,
                                                                                                                checkedLunch: this.state.seniorArch[0].checkedLunch,
                                                                                                                checkedDinner: this.state.seniorArch[0].checkedDinner,


                                                                                                            }

                                                                                                            seniorService.addToArchive(archive).then(console.log("Archive"))
                                                                                                            seniorService.update(senior.id, senioret).then(console.log("successs"))

                                                                                                        }
                                                                                                        }
                                                                                                    />
                                                                                                    <label htmlFor={senior.id + "BREAKFAST"} className="align-middle-label text-secondary">BREAKFAST </label>
                                                                                                    <input
                                                                                                        id={senior.id + "LUNCH"}
                                                                                                        checked={this.state.seniorArch ? this.state.seniorArch[0].checkedLunch : false}
                                                                                                        value={senior.id}
                                                                                                        name="customCheckbox"
                                                                                                        type="checkbox"
                                                                                                        className="align-middle-input   "

                                                                                                        onChange={(e) => {

                                                                                                            this.setState({
                                                                                                                seniors: this.state.seniors.map((data) => {

                                                                                                                    if (data.id === senior.id) {
                                                                                                                        data.checkedLunch = e.target.checked;
                                                                                                                    }
                                                                                                                    return data;
                                                                                                                }),
                                                                                                                seniorArch: this.state.seniorArch.map((data) => {
                                                                                                                    if (data.senior.id === senior.id) {
                                                                                                                        data.checkedLunch = e.target.checked;
                                                                                                                    }

                                                                                                                    return data;
                                                                                                                }),
                                                                                                            });


                                                                                                            let arrayIds = [...this.state.selectListDIN];
                                                                                                            if (e.target.checked) {
                                                                                                                let senioret = {
                                                                                                                    name: senior.name,
                                                                                                                    lastname: senior.lastname,
                                                                                                                    dateOfBirth: senior.dateOfBirth,
                                                                                                                    sex: senior.sex,
                                                                                                                    cin: senior.cin,
                                                                                                                    telephone: senior.telephone,
                                                                                                                    file: senior.file,
                                                                                                                    checkedBreakfast: senior.checkedBreakfast,
                                                                                                                    checkedLunch: 1,
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
                                                                                                                    lastname: senior.lastname,
                                                                                                                    dateOfBirth: senior.dateOfBirth,
                                                                                                                    sex: senior.sex,
                                                                                                                    cin: senior.cin,
                                                                                                                    telephone: senior.telephone,
                                                                                                                    file: senior.file,
                                                                                                                    checkedBreakfast: senior.checkedBreakfast,
                                                                                                                    checkedLunch: 0,
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

                                                                                                            let senioret = {
                                                                                                                name: senior.name,
                                                                                                                lastname: senior.lastname,
                                                                                                                dateOfBirth: senior.dateOfBirth,
                                                                                                                sex: senior.sex,
                                                                                                                cin: senior.cin,
                                                                                                                telephone: senior.telephone,
                                                                                                                file: senior.file,
                                                                                                                checkedBreakfast: senior.checkedBreakfast,
                                                                                                                checkedLunch: senior.checkedLunch,
                                                                                                                checkedDinner: senior.checkedDinner,
                                                                                                                menus: senior.menus,
                                                                                                            };


                                                                                                            let archive = {
                                                                                                                idArch: `arch-${senior.id}-${new Date().toISOString().split("T")[0]}`,
                                                                                                                senior: senior,
                                                                                                                date: new Date().toISOString().split("T")[0],
                                                                                                                checkedBreakfast: this.state.seniorArch[0].checkedBreakfast,
                                                                                                                checkedLunch: this.state.seniorArch[0].checkedLunch,
                                                                                                                checkedDinner: this.state.seniorArch[0].checkedDinner,


                                                                                                            }

                                                                                                            seniorService.addToArchive(archive).then(console.log("Archive"))
                                                                                                            seniorService.update(senior.id, senioret).then(console.log("successs"))
                                                                                                        }
                                                                                                        } />
                                                                                                    <label htmlFor={senior.id + "LUNCH"} className="align-middle-label text-secondary">LUNCH </label>
                                                                                                    <input id={senior.id + "DINNER"}
                                                                                                        checked={this.state.seniorArch ? this.state.seniorArch[0].checkedDinner : false}
                                                                                                        value={senior.id}
                                                                                                        name="customCheckbox"
                                                                                                        type="checkbox"
                                                                                                        className="align-middle-input   "

                                                                                                        onChange={(e) => {

                                                                                                            this.setState({
                                                                                                                seniors: this.state.seniors.map((data) => {

                                                                                                                    if (data.id === senior.id) {
                                                                                                                        data.checkedDinner = e.target.checked;
                                                                                                                    }
                                                                                                                    return data;
                                                                                                                }),
                                                                                                                seniorArch: this.state.seniorArch.map((data) => {
                                                                                                                    if (data.senior.id === senior.id) {
                                                                                                                        data.checkedDinner = e.target.checked;
                                                                                                                    }

                                                                                                                    return data;
                                                                                                                }),
                                                                                                            });


                                                                                                            let arrayIds = [...this.state.selectListDIN];
                                                                                                            if (e.target.checked) {
                                                                                                                let senioret = {
                                                                                                                    name: senior.name,
                                                                                                                    lastname: senior.lastname,
                                                                                                                    dateOfBirth: senior.dateOfBirth,
                                                                                                                    sex: senior.sex,
                                                                                                                    cin: senior.cin,
                                                                                                                    telephone: senior.telephone,
                                                                                                                    file: senior.file,
                                                                                                                    checkedBreakfast: senior.checkedBreakfast,
                                                                                                                    checkedLunch: senior.checkedLunch,
                                                                                                                    checkedDinner: 1,
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
                                                                                                                    lastname: senior.lastname,
                                                                                                                    dateOfBirth: senior.dateOfBirth,
                                                                                                                    sex: senior.sex,
                                                                                                                    cin: senior.cin,
                                                                                                                    telephone: senior.telephone,
                                                                                                                    file: senior.file,
                                                                                                                    checkedBreakfast: senior.checkedBreakfast,
                                                                                                                    checkedLunch: senior.checkedLunch,
                                                                                                                    checkedDinner: 0,
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
                                                                                                            let senioret = {
                                                                                                                name: senior.name,
                                                                                                                lastname: senior.lastname,
                                                                                                                dateOfBirth: senior.dateOfBirth,
                                                                                                                sex: senior.sex,
                                                                                                                cin: senior.cin,
                                                                                                                telephone: senior.telephone,
                                                                                                                file: senior.file,
                                                                                                                checkedBreakfast: senior.checkedBreakfast,
                                                                                                                checkedLunch: senior.checkedLunch,
                                                                                                                checkedDinner: senior.checkedDinner,
                                                                                                                menus: senior.menus,
                                                                                                            };

                                                                                                            let archive = {
                                                                                                                idArch: `arch-${senior.id}-${new Date().toISOString().split("T")[0]}`,
                                                                                                                senior: senior,
                                                                                                                date: new Date().toISOString().split("T")[0],
                                                                                                                checkedBreakfast: this.state.seniorArch[0].checkedBreakfast,
                                                                                                                checkedLunch: this.state.seniorArch[0].checkedLunch,
                                                                                                                checkedDinner: this.state.seniorArch[0].checkedDinner,


                                                                                                            }

                                                                                                            seniorService.addToArchive(archive).then(console.log("Archive"))
                                                                                                            seniorService.update(senior.id, senioret).then(console.log("successs"))


                                                                                                        }
                                                                                                        } />
                                                                                                    <label htmlFor={senior.id + "DINNER"} className="align-middle-label text-secondary">DINNER </label>






                                                                                                </div>
                                                                                            </td>
                                                                                        }
                                                                                    </tr>
                                                                                </>)
                                                                        }
                                                                    </>
                                                                )}

                                                            </tbody>
                                                            {this.state.searchTerm==="" &&
                                                            <Pagination
                                                                currentPage={this.state.currentPage}
                                                                mealsperpage={this.state.seniorsPerPage}
                                                                totalmeals={this.state.seniors.length}
                                                                paginate={paginate}
                                                            />
                                                        }
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Snackbar open={this.state.toastDelete} autoHideDuration={6000} onClose={() => this.setState({ toastDelete: false })}>
                                        <Alert onClose={() => this.setState({ toastDelete: false })} severity="info" sx={{ padding: "15px", height: "70px", width: '100%' }}>
                                            Senior is deleted successfully
                                        </Alert>
                                    </Snackbar>
                                    <Snackbar open={this.state.toasUpdate} autoHideDuration={6000} onClose={() => this.setState({ toasUpdate: false })}>
                                        <Alert onClose={() => this.setState({ toasUpdate: false })} severity="info" sx={{ padding: "15px", height: "70px", width: '100%' }}>
                                            Senior is updated successfully
                                        </Alert>
                                    </Snackbar>
                                </div>

                            )
                            : this.state.addSeniorPage === "addSenior" ?
                                (
                                    <AddSenior addSeniorPage={this.handleAddSenior} />
                                ) : (
                                    <SeniorDetails socket={socket} user={currentUser} addSeniorPage={this.handleAddSenior} senior={this.myRef.current} />
                                )
                    }
                </main>

                <Modal show={this.state.editDialog} onHide={this.handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Senior
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form style={{ backgroundColor: "#dd" }} onSubmit={this.handleUpdate}>
                            <div className="form-header">
                                <div className="avartar">
                                    <div className='image-preview text-center' >

                                        {this.state.seniorPicture === null ?
                                            <>
                                                {this.state.sexOption === "male" ?
                                                    <img
                                                        src="..\..\..\assets\img\images\avatarNoimage.jpg"

                                                        alt="seniorPicture"
                                                    />
                                                    :
                                                    <img
                                                        src="..\..\..\assets\img\images\avatarW.jpg"

                                                        alt="seniorPicture"
                                                    />

                                                }

                                            </>
                                            :
                                            <>
                                                <img
                                                    src={this.state.imgChange ? this.state.seniorPicture : `http://localhost:8080/files/${this.state.seniorPicture}`}

                                                    alt="seniorPicture"
                                                />
                                            </>

                                        }
                                    </div>
                                    <div className="avartar-picker text-center">
                                        <input type="file" name="file-1[]" id="file-1" className="inputfile" data-multiple-caption="{count} files selected" accept="image/png, image/jpeg" onChange={this.onChangeImage} />
                                        <label htmlFor="file-1">
                                            <i className="zmdi zmdi-camera"></i>
                                            <span>Choose Picture</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
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

                {
                    this.state.isLoading && (
                        <Dialog
                            onDialog={this.areUSureDelete}
                            message={this.state.message}

                        />
                    )
                }

                {
                    this.state.isLoadingDeleteCheckbox && (
                        <Dialog
                            onDialog={this.deleteSeniorsByIds}
                            message={this.state.message}

                        />
                    )
                }
            </div >
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