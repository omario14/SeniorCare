import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";


export const register = (name,lastName,username, email, password,mobile,gender,adress,picture,roles) => (dispatch) => {
  console.log(roles,"/br  ",username,"azae   ", email,"pass",password,"mobl",mobile,"gender",gender,"address",adress,"pic",picture);
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
  );
}; 

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      console.log(data,"ddd")
      runLogoutTimer(dispatch,data.expiresIn);
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

