import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { register } from "../../actions/auth";
import roleService from "../../services/role.service";
import seniorService from "../../services/senior.service";
import { Navigate } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import { GiReturnArrow } from "react-icons/gi";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vmobile = (value) => {
  if (value.length < 8 || value.length > 8) {
    return (
      <div className="alert alert-danger" role="alert">
        The mobile number must be 8 digits.
      </div>
    );
  }
};


const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};


class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      name: "",
      lastName: "",
      gender: "male",
      mobile: null,
      adress: "eeeeeee",
      roleuser: ["ROLE_ADMIN"],
      roles: [],
      userImg: "../../../assets/img/images/avartarU.png",
      selectedFile: null,
      picture: null,
      successful: false,
    };
  }



  componentDidMount() {
    roleService.getAll()
      .then(res => {
        const roles = res.data;
        this.setState({ roles });
        console.log(roles)
      })
  }

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ userImg: reader.result, selectedFile: e.target.files[0] })
      }
    }
    console.log("this is image " + this.state.userImg)
    reader.readAsDataURL(e.target.files[0])
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
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
    console.log(JSON.stringify(this.state.gender))
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


  onChangeRole(e) {
    this.setState({
      roleuser: [e.target.value]
    })

  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();
    // Create an object of formData
    const formData = new FormData();
    const { isAddStaff,toastAddShow } = this.props;
    // Update the formData object
    formData.append(
      "file",
      this.state.selectedFile,
    );


    if (this.state.selectedFile) {
      seniorService.upload(formData).then(res => {

        this.setState({
          picture: res.data,
        })
      }).then(() => {

        this.setState({
          successful: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
         
          this.props
            .dispatch(

              register(this.state.name, this.state.lastName, this.state.username, this.state.email, this.state.password, this.state.mobile, this.state.gender, this.state.adress, this.state.picture, this.state.roleuser)
            )
            .then(() => {
              this.setState({
                successful: true,
              });
              
            })
            .catch(() => {
              this.setState({
                successful: false,
              });
            });
           isAddStaff();
          toastAddShow();
        }


      })
    } else {

      this.setState({
        successful: false,
      });

      this.form.validateAll();

      if (this.checkBtn.context._errors.length === 0) {
        
        this.props
          .dispatch(
            register(this.state.name, this.state.lastName, this.state.username, this.state.email, this.state.password, this.state.mobile, this.state.gender, this.state.adress, this.state.picture, this.state.roleuser)
          )
          .then(() => {
            this.setState({
              successful: true,
            });
          
          })
          .catch(() => {
            this.setState({
              successful: false,
            });
          });
          isAddStaff();
          toastAddShow();
      }
    }

   

  }



  render() {
    const { message } = this.props;
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Navigate to="/notFound" />;

    }
    return (
      <div className='sign'>
        

        <section className="min-vh-100 mb-8 mt-4">
      
          <div className="page-header mt-5  bg-gradient-dark opacity-9 align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{ backgroundImage: "url('../../../assets/img/curved-images/curved14.jpg')" }}>

            <div className="container ">

              <div className="row justify-content-center ">
                <div className="col-lg-5 text-center mx-auto">
                  <h1 className="text-white mb-2 mt-5 text-uppercase">Add new Member</h1>

                </div>
              </div>
            </div>
          </div>
          <div
					style={{
						position: "absolute",
						top: "0px",
						left: "28px",
					}}
				>
					<ButtonGroup variant="text" aria-label="text button group">
						<Button onClick={()=>this.props.isAddStaff()} >
							<GiReturnArrow  /> &nbsp;&nbsp; Return
						</Button>

					</ButtonGroup>
				</div>
          <div className="container">
            <div className="row mt-lg-n10 mt-md-n11 mt-n10">
              <div className="col-xl-6 col-lg-5 col-md-7 mx-auto">
                <div className="card z-index-0" >

                  <div className="form-header text-center  pt-4 " >
                    <div className="avartar" >
                      <div className='image-preview' >
                        <img src={this.state.userImg} alt="Userpic" />
                      </div>
                      <div className="avartar-picker" >
                        <input type="file" name="file-1[]" id="file-1" className="inputfile" data-multiple-caption="{count} files selected" accept="image/png, image/jpeg" onChange={this.imageHandler} />
                        <label htmlFor="file-1">
                          <i className="zmdi zmdi-camera"></i>
                          <span>Choose Picture</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <Form
                      onSubmit={this.handleRegister}
                      ref={c => {
                        this.form = c;
                      }} >
                      {!this.state.successful && (
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>

                            <div className="mb-3" style={{ width: "45%" }}>
                              <label htmlFor="name">Name<span className="text-primary">*</span></label>
                              <Input

                                type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                validations={[required]}
                              />
                            </div>
                            <div className="mb-3" style={{ width: "45%" }}>
                              <label htmlFor="lastName">LastName<span className="text-primary">*</span></label>
                              <Input
                                type="text"
                                className="form-control"
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}
                                validations={[required]}
                              />
                            </div>

                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>

                            <div className="mb-3" style={{ width: "45%" }}>
                              <label htmlFor="username">Username<span className="text-primary">*</span></label>
                              <Input
                                type="text"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required, vusername]}
                              />
                            </div>
                            <div className="mb-3 " style={{ width: "45%" }}>
                             
                                <label htmlFor="gender">Gender</label>
                                <div className="p-t-10">
                                  <label className="radio-container m-r-45">Male
                                    <input checked={this.state.gender === "male"}
                                      onChange={this.onChangeGender}
                                      type="radio"
                                      value="male"
                                      name='male' />
                                    <span className="checkmark"></span>
                                  </label>
                                  <label className="radio-container">Female
                                    <input
                                      checked={this.state.gender === "female"}
                                      onChange={this.onChangeGender}
                                      type="radio"
                                      value="female"
                                      name="female" />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>
                              
                            </div>
                          </div>
                          <div className="mb-3" >
                            <label htmlFor="username">Mobile<span className="text-primary">*</span></label>
                            <Input
                              type="number"
                              className="form-control"
                              value={this.state.mobile}
                              onChange={this.onChangeMobile}
                              validations={[required, vmobile]}
                            />
                          </div>

                          <div className="mb-3" >
                            <label htmlFor="inputState">Role</label>

                            <select id="inputState" className="form-control" value={this.state.roles.name} onChange={this.onChangeRole}  >
                              {
                                this.state.roles
                                  .map(role => (
                                    <option key={role.id} >{role.name}</option>))
                              }

                            </select>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>

                            <div className="mb-3" style={{ width: "45%" }}>
                              <label htmlFor="email">Email<span className="text-primary">*</span></label>
                              <Input
                                type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[required, email]}
                              />
                            </div>
                            <div className="mb-3" style={{ width: "45%" }}>
                              <label htmlFor="password">Password</label>
                              <Input
                                type="text"
                                className="form-control passwordStyle"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required, vpassword]}
                              />
                            </div>
                          </div>

                          <div className="text-center">
                            <button className="btn bg-gradient-dark w-100 my-4 mb-2">Add</button>
                          </div>
                        </div>
                      )}
                      {message && (
                        <div className="form-group">
                          <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                            {message}
                          </div>
                        </div>
                      )}
                      <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                          this.checkBtn = c;
                        }}
                      />

                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { message } = state.message;
  const { user } = state.auth;
  return {
    message,
    user,
  };
}



export default connect(mapStateToProps)(Register);