import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { register } from "../../actions/auth";
import roleService from "../../services/role.service";
import seniorService from "../../services/senior.service";

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
    this.onChangeRole= this.onChangeRole.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      name:"",
      lastName:"",
      roleuser: ["ROLE_ADMIN"],
      roles: [],
      userImg: "../../../assets/img/images/avartarU.png",
      selectedFile: null,
      fileId:null,
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
    console.log(JSON.stringify(this.state.roleuser))
    
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
		// Update the formData object
		formData.append(
			"file",
			this.state.selectedFile,
		);	
		
		
		if (this.state.selectedFile){
		seniorService.upload(formData).then(res => {
			
			this.setState({
				fileId: res.data.id,
			})
    }).then(()=>{

      this.setState({
        successful: false,
      });
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        
        this.props
          .dispatch(
            
            register(this.state.name,this.state.lastName,this.state.username, this.state.email,this.state.fileId, this.state.password, this.state.roleuser)
          )
          .then(() => {
            console.log("aaaaaaaaaaaaaa",this.state.roleuser)
            this.setState({
              successful: true,
            });
          })
          .catch(() => {
            this.setState({
              successful: false,
            });
          });
      }

    })
  }else{
    
    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      
      this.props
        .dispatch(
          register(this.state.name,this.state.lastName,this.state.username, this.state.email,this.state.fileId, this.state.password, this.state.roleuser)
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
    }
  }
	


  }

    
    
  render() {
    const { message } = this.props;

  return (
    <div className='sign'>
      
      <section className="min-vh-100 mb-8">
    <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{backgroundImage: "url('../../../assets/img/curved-images/curved14.jpg')"}}>
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 text-center mx-auto">
            <h1 className="text-white mb-2 mt-5">Welcome!</h1>
            <p className="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row mt-lg-n10 mt-md-n11 mt-n10">
        <div className="col-xl-6 col-lg-5 col-md-7 mx-auto">
          <div className="card z-index-0" >
            <div className="card-header text-center pt-4">
              <h5>Register with</h5>
            </div>
            <div className="form-header text-center  pt-4 " >
										<div className="avartar" >
											<div className='image-preview' >
												<img src={this.state.userImg} alt="Userpic" />
											</div>
											<div className="avartar-picker" >
												<input type="file" name="file-1[]" id="file-1" className="inputfile" data-multiple-caption="{count} files selected"  onChange={this.imageHandler} />
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
                    <div style={{display:"flex" ,justifyContent:"space-between"}}>
                      
                <div className="mb-3" style={{width:"45%"}}>
                  <label htmlFor="name">Name</label>
                  <Input 
                    
                    type="text" 
                    className="form-control" 
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required]} 
                    />
                </div>
                <div className="mb-3" style={{width:"45%"}}> 
                  <label htmlFor="lastName">LastName</label>
                  <Input 
                    type="text" 
                    className="form-control" 
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required]} 
                    />
                </div>
                
                </div>
                <div className="mb-3">
                  <label htmlFor="username">Username</label>
                  <Input 
                    type="text" 
                    className="form-control" 
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]} 
                    />
                </div>
                <div className="mb-3" >
                  <label htmlFor="inputState">Role</label>
                 
                  <select id="inputState" className="form-control" value={this.state.roles.name}   onChange={this.onChangeRole}  >
                    {
                      this.state.roles
                      .map(role  =>(
                        <option  key={role.id} >{role.name}</option>))
                    }
                    
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <Input 
                  type="email" 
                  className="form-control"  
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, email]}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <Input 
                  type="password" 
                  className="form-control"  
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, vpassword]}
                  />
                </div>
                <div className="form-check form-check-info text-left">
                  <Input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    I agree the <a href="/" className="text-dark font-weight-bolder">Terms and Conditions</a>
                  </label>
                </div>
                <div className="text-center">
                  <button  className="btn bg-gradient-dark w-100 my-4 mb-2">Sign up</button>
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
                <p className="text-sm mt-3 mb-0">Already have an account? <a href="/" className="text-dark font-weight-bolder">Sign in</a></p>
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
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);