import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";


export const register = (name,lastName,username, email, password,mobile,gender,adress,picture,roles) => (dispatch) => {
  return AuthService.register(name,lastName,username, email, password,mobile,gender,adress,picture,roles).then(
  
    (response) => {
      
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
   
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  ).then(()=>{
    dispatch({
      type: CLEAR_MESSAGE,
    });
  
  })
}; 

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
     
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

