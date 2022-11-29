
import './sign.css'; import React, { Component } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import {
  Link,
  Navigate
} from 'react-router-dom';
import { TabTitle } from '../../utils/GeneralFunctions';
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      let isMounted = true;
      dispatch(login(this.state.username, this.state.password))
        .then(() => {
          if(isMounted ){
          history.push("/");
          window.location.reload();}
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
        return isMounted = false;
    } else {
      this.setState({
        loading: false,
        
      });
      
    }
    
  }
  render() {
    TabTitle('Login');
    const { isLoggedIn, message } = this.props;
    if (isLoggedIn) {
      return <Navigate  to="/profile" />;
    }

    return (
      <div className='sign' >
        <main className="main-content  mt-0" >
          <section >
            <div className="page-header min-vh-75">
              <div className="container" >
                <div className="row">
                  <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto" >
                    <div className="card card-plain mt-8" style={{
                      position: 'absolute', top: ' 50px',
                      left: ' 200px'
                    }}>
                      <div className="card-header pb-0 text-left bg-transparent">
                        <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                        <p className="mb-0">Enter your username and password to sign in</p>
                      </div>
                      <div className="card-body">
                        <Form onSubmit={this.handleLogin}
                          ref={c => {
                            this.form = c;
                          }}>
                          <label htmlFor="username">Username</label>
                          <div className="mb-3">
                            <Input
                              name="username"
                              value={this.state.username}
                              onChange={this.onChangeUsername}
                              validations={[required]}
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <label htmlFor="password" >Password</label>
                          <div className="mb-3">
                            <Input name="password"
                              value={this.state.password}
                              onChange={this.onChangePassword}
                              validations={[required]}
                              type="password"
                              className="form-control"
                            />
                          </div>
                         
                          <div className="text-center">
                            <button disabled={this.state.loading} className="btn bg-gradient-info w-100 mt-4 mb-0">
                              {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                              )}
                              <span>Sign in</span>
                            </button>
                          </div>

                          {message && (
                            <div className="form-group">
                              <div className="alert alert-danger" role="alert">
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
                      <div className="card-footer text-center pt-0 px-lg-2 px-1">
                        <p className="mb-4 text-sm mx-auto">
                          Forget Password or Username ?
                          <Link to="/register" className="text-info text-gradient font-weight-bold">Forget</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="oblique position-fixed top-0 h-100 d-md-block d-none me-n8">
                      <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: 'url("../../../assets/img/curved-images/curved6.jpg")' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);
