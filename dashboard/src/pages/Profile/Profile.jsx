import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import TopBar from "../../components/TopBar/TopBar";
import { TabTitle } from "../../utils/GeneralFunctions";
import "./Profile.css";
import userService from "../../services/user.service";
import { GiConfirmed } from "react-icons/gi";
import seniorService from "../../services/senior.service";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.changeEditMode = this.changeEditMode.bind(this);

    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      password: this.props.user.password,
      name: this.props.user.name,
      lastName: this.props.user.lastName,
      gender: this.props.user.gender,
      mobile: this.props.user.mobile,
      roles: this.props.user.roles,
      adress: this.props.user.adress,
      user: this.props.user,
      userImg: "../../../assets/img/images/avartarU.png",
      imgChange: false,
      selectedFile: null,
      fileId: null,
      picture: this.props.user.picture,
      edit: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {


    if (prevState.user !== this.state.user) {
      localStorage.setItem("user", JSON.stringify(this.state.user));
    }
  };



  changeEditMode = (e) => {
    e.preventDefault();
    this.setState({
      edit: !this.state.edit,
    })
  }


  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ userImg: reader.result, selectedFile: e.target.files[0], imgChange: true })
      }
    }
    console.log("this is image " + this.state.userImg)

    reader.readAsDataURL(e.target.files[0])
  }

  onChangeMobile(e) {
    this.setState({
      mobile: e.target.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }


  onChangeRole(e) {
    this.setState({
      roleuser: [e.target.value]
    })
    console.log(JSON.stringify(this.state.roleuser))

  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
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


    if (this.state.selectedFile) {
      seniorService.upload(formData).then(res => {
        if (res) {
          seniorService.removeFileById(this.state.picture.id)
          this.setState({
            picture: res.data,
          })
        }
      })

        .then(() => {
          




          let user = {
            id: this.state.user.id,
            name: this.state.name,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            mobile: this.state.mobile,
            adress: this.state.adress,
            roles: this.state.user.roles,
            password: this.state.user.password,
            gender: this.state.gender,
            picture: this.state.picture,

          };
          const jwt = this.state.user.accessToken


          userService.updateUserProfile(user.id, user, jwt).then((response) => {
            
            if (response.data.accessToken) {
              this.setState({
                edit: false,
                user: response.data,
                username: response.data.username,
                email: response.data.email,
                password: response.data.password,
                name: response.data.name,
                lastName: response.data.lastName,
                gender: response.data.gender,
                mobile: response.data.mobile,
                picture: response.data.picture,
                adress: response.data.adress,
                roles: response.data.roles,
              })

            }


          })
        })
    }else{
      let user = {
        id: this.state.user.id,
        name: this.state.name,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        mobile: this.state.mobile,
        adress: this.state.adress,
        roles: this.state.user.roles,
        password: this.state.user.password,
        gender: this.state.gender,
        picture: this.state.picture,

      };
      const jwt = this.state.user.accessToken


      userService.updateUserProfile(user.id, user, jwt).then((response) => {
        
        if (response.data.accessToken) {
          this.setState({
            edit: false,
            user: response.data,
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
            name: response.data.name,
            lastName: response.data.lastName,
            gender: response.data.gender,
            mobile: response.data.mobile,
            picture: response.data.picture,
            adress: response.data.adress,
            roles: response.data.roles,
          })

        }


      })
    }
  }

  render() {
    TabTitle("Profile");
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="profile ">
        <main className="main-content  position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
          <TopBar title={"Profile"} />
          <div className="container-fluid py-4">
            <div
              className="page-header min-height-300 border-radius-xl mt-4"
              style={{
                backgroundImage:
                  'url("../../../assets/img/curved-images/curved0.jpg")',
                backgroundPositionY: " 10%",
              }}
            ></div>
            <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
              <div className="row gx-4">
                <div className="col-auto">
                  <div className="avatar avatar-xl position-relative">
                    {this.state.edit === false ?
                      <>
                        {this.state.user.picture === null ?
                          <>

                            <img
                              src="..\..\..\assets\img\images\avatarNoimage.jpg"
                              alt="profile_image"
                              className="w-100 border-radius-lg shadow-sm"
                            />


                          </>
                          :
                          
                            <img
                              src={`http://localhost:8080/files/${this.state.picture.id}`}
                              alt="profile_image"
                              className="w-100 border-radius-lg shadow-sm"

                            />
                         


                        }
                      </>

                      :
                      <>
                       
                        <img
                          src={this.state.imgChange ? this.state.userImg : `http://localhost:8080/files/${this.state.picture.id}`}
                          alt="profile_image"
                          className="w-100 border-radius-lg shadow-sm"
                        />
                        
                        <div className="avartar-picker" style={{ position: "absolute", bottom: "-7px", right: "-4px" }}>
                          <input type="file" name="file-1[]" id="file-1" className="inputfile" data-multiple-caption="{count} files selected" onChange={this.imageHandler} />
                          <label htmlFor="file-1" >
                            <i className="zmdi zmdi-camera" style={{ width: "20px", heigth: "20px", color: "#ffaa" }}></i>

                          </label>
                        </div>
                      </>
                    }

                  </div>
                </div>
                <div className="col-auto my-auto">
                  <div className="h-100">
                    <h5 className="mb-1 text-capitalize" >{this.state.username}</h5>

                    {this.state.roles &&
                      this.state.roles.map((role, index) => (
                        <p className="mb-0 font-weight-bold text-sm" key={index}>{role.name.substring(5, role.name.length)}</p>
                      ))}

                  </div>
                </div>
                <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                  <div className="nav-wrapper position-relative end-0">
                    <ul
                      className="nav nav-pills nav-fill p-1 bg-transparent"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link mb-0 px-0 py-1 active "
                          data-bs-toggle="tab"
                          href="/"
                          role="tab"
                          aria-selected="true"
                        >
                          <svg
                            className="text-dark"
                            width="16px"
                            height="16px"
                            viewBox="0 0 42 42"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                transform="translate(-2319.000000, -291.000000)"
                                fill="/FFFFFF"
                                fillRule="nonzero"
                              >
                                <g transform="translate(1716.000000, 291.000000)">
                                  <g transform="translate(603.000000, 0.000000)">
                                    <path
                                      className="color-background"
                                      d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z"
                                    ></path>
                                    <path
                                      className="color-background"
                                      d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                                      opacity="0.7"
                                    ></path>
                                    <path
                                      className="color-background"
                                      d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                                      opacity="0.7"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <span className="ms-1">App</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link mb-0 px-0 py-1 "
                          data-bs-toggle="tab"
                          href="/"
                          role="tab"
                          aria-selected="false"
                        >
                          <svg
                            className="text-dark"
                            width="16px"
                            height="16px"
                            viewBox="0 0 40 44"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>document</title>
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                transform="translate(-1870.000000, -591.000000)"
                                fill="/FFFFFF"
                                fillRule="nonzero"
                              >
                                <g transform="translate(1716.000000, 291.000000)">
                                  <g transform="translate(154.000000, 300.000000)">
                                    <path
                                      className="color-background"
                                      d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                                      opacity="0.603585379"
                                    ></path>
                                    <path
                                      className="color-background"
                                      d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <span className="ms-1">Messages</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link mb-0 px-0 py-1 "
                          data-bs-toggle="tab"
                          href="/"
                          role="tab"
                          aria-selected="false"
                        >
                          <svg
                            className="text-dark"
                            width="16px"
                            height="16px"
                            viewBox="0 0 40 40"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>settings</title>
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                transform="translate(-2020.000000, -442.000000)"
                                fill="/FFFFFF"
                                fillRule="nonzero"
                              >
                                <g transform="translate(1716.000000, 291.000000)">
                                  <g transform="translate(304.000000, 151.000000)">
                                    <polygon
                                      className="color-background"
                                      opacity="0.596981957"
                                      points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667"
                                    ></polygon>
                                    <path
                                      className="color-background"
                                      d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                                      opacity="0.596981957"
                                    ></path>
                                    <path
                                      className="color-background"
                                      d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <span className="ms-1">Settings</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid py-4">
            <div className="row mx-1">

              <div className="col-12 col-xl-12">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-md-8 d-flex align-items-center">
                        <h6 className="mb-0">Profile Information</h6>
                      </div>
                      <div className="col-md-4 text-end">
                        <a href="#">
                          {this.state.edit === false ?
                            <i
                              className="fas fa-user-edit text-secondary text-sm"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              onClick={this.changeEditMode}
                              title="Edit Profile"
                            ></i>
                            :
                            <GiConfirmed
                              onClick={this.handleUpdate} className="text-secondary text-sm" data-bs-toggle="tooltip"
                              data-bs-placement="top" />
                          }

                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-3">

                    <hr className="horizontal gray-light my-4" />
                    {this.state.edit ?

                      <div style={{ display: "flex", alignContent: "space-evenly", alignItems: "center", justifyItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ width: "45%" }}>


                          <ul className="list-group">
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                              <strong className="text-dark">Username :</strong> &nbsp;{" "}
                              <input
                                disabled={true}
                                style={{ width: "60%" }}
                                className="input--style-4"
                                type="text"
                                name="lastName"
                                defaultValue={this.props.user.username}
                              />

                            </li>
                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">Email :</strong> &nbsp;{" "}
                              <input
                                style={{ width: "60%" }}
                                className="input--style-4"
                                type="text"
                                name="lastName"
                                defaultValue={this.props.user.email}
                                onChange={this.onChangeEmail} />

                            </li>
                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">Mobile :</strong> &nbsp;
                              <input
                                style={{ width: "60%" }}
                                className="input--style-4"
                                type="text"
                                name="lastName"
                                defaultValue={this.props.user.mobile}
                                onChange={this.onChangeMobile} />

                            </li>

                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">Roles :</strong> &nbsp;{" "}
                              <ul>
                                {this.state.roles &&
                                  this.state.roles.map((role, index) => (
                                    <li key={index}>{role.name.substring(5, role.name.length)}</li>
                                  ))}
                              </ul>
                            </li>

                          </ul>
                        </div>
                        <div style={{ width: "45%" }}>


                          <ul className="list-group">
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                              <strong className="text-dark">Name :</strong> &nbsp;{" "}
                              <input
                                style={{ width: "60%" }}
                                className="input--style-4"
                                type="text"
                                name="lastName"
                                defaultValue={this.props.user.name}
                                onChange={this.onChangeName} />

                            </li>
                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">LastName :</strong> &nbsp; {" "}
                              <input
                                style={{ width: "60%" }}
                                className="input--style-4"
                                type="text"
                                name="lastName"
                                defaultValue={this.props.user.lastName}
                                onChange={this.onChangeLastName} />

                            </li>
                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">Adress :</strong> &nbsp;{" "}
                              <input
                                style={{ width: "60%" }}
                                className="input--style-4"
                                type="text"
                                name="lastName"
                                defaultValue={this.props.user.adress}
                                onChange={this.onChangeAdress} />

                            </li>
                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">Gender :</strong> &nbsp;{" "}
                              <div className="genderBox">

                                <input type="radio" value="male" id="option-1" onChange={this.onChangeGender} checked={this.state.gender === "male"} />
                                <input type="radio" value="female" id="option-2" onChange={this.onChangeGender} checked={this.state.gender === "female"} />
                                <label htmlFor="option-1" className="option option-1">
                                  <div className="dot"></div>
                                  <span>Male</span>
                                </label>
                                <label htmlFor="option-2" className="option option-2">
                                  <div className="dot"></div>
                                  <span>Female</span>
                                </label>
                              </div>


                            </li>

                          </ul>
                        </div>

                      </div>

                      :
                      <div style={{ display: "flex", alignContent: "space-evenly", alignItems: "center", justifyItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ width: "45%" }}>


                          <ul className="list-group">
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                              <strong className="text-dark">Username :</strong> &nbsp;{" "}
                              {this.state.user.username}
                            </li>
                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">Email :</strong> &nbsp;{" "}
                              {this.state.email}
                            </li>
                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">Mobile :</strong> &nbsp;
                              {this.state.mobile}
                            </li>

                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">Roles :</strong> &nbsp;{" "}
                              <ul>
                                {this.state.roles &&
                                  this.state.roles.map((role, index) => (
                                    <li key={index}>{role.name.substring(5, role.name.length)}</li>
                                  ))}
                              </ul>
                            </li>

                          </ul>
                        </div>
                        <div style={{ width: "45%" }}>


                          <ul className="list-group">
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                              <strong className="text-dark">Name :</strong> &nbsp;{" "}
                              {this.state.name}
                            </li>
                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">LastName :</strong> &nbsp; {" "}
                              {this.state.lastName}
                            </li>
                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">Adress :</strong> &nbsp;{" "}
                              {this.state.adress}
                            </li>
                            <li className="list-group-item border-0 ps-0 text-sm">
                              <strong className="text-dark">Gender :</strong> &nbsp;{" "}
                              {this.state.gender}
                            </li>

                          </ul>
                        </div>

                      </div>
                    }

                  </div>
                </div>
              </div>


            </div>
            <footer className="footer pt-3  ">
              <div className="container-fluid">
               
              </div>
            </footer>
          </div>

        </main>
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
export default connect(mapStateToProps)(Profile);
