import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import "./index.css";

import { history } from './helpers/history';


import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  
    <Provider store={store}>
  
      <Router history={history}>
    <App />
    </Router>
    </Provider>
  ,
  document.getElementById('root')
);
