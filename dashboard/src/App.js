import './app.css';

import Routing from './Routingg';

import { Component } from 'react';

import { connect } from "react-redux";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';


import { BrowserRouter as Router } from 'react-router-dom';





class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

 




  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

  
  return (
    <Router history={history}>
    <Routing/>
    </Router>
    
  );
}
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { senior } = state.senior;
  return {
    user,
    senior,
  };
}

export default connect(mapStateToProps)(App);
