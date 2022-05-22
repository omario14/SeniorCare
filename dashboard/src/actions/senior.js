import {
    CREATE_SENIOR ,
RETRIEVE_SENIORS ,
UPDATE_SENIOR ,
DELETE_SENIOR ,
 DELETE_ALL_SENIORS,
 SET_MESSAGE,
} from './types';

import SeniorService from "../services/senior.service";



export const createSenior = (firstName, description) => async (dispatch) => {
    try {
      
      const res = await SeniorService.create( {firstName, description });
      localStorage.setItem("senior", JSON.stringify({firstName, description }));
      dispatch({
        type: CREATE_SENIOR,
        payload: res.data,
        
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
 
  export const retrieveSeniors = () => async (dispatch) => {
    try {
      const res = await SeniorService.getAll();
      dispatch({
        type: RETRIEVE_SENIORS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const updateSenior = (id, data) => async (dispatch) => {
    try {
      const res = await SeniorService.update(id, data);
      dispatch({
        type: UPDATE_SENIOR,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteSenior = (id) => async (dispatch) => {
    try {
      await SeniorService.delete(id);
      dispatch({
        type: DELETE_SENIOR,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const deleteAllSeniors = () => async (dispatch) => {
    try {
      const res = await SeniorService.deleteAll();
      dispatch({
        type: DELETE_ALL_SENIORS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const findSeniorsByTitle = (title) => async (dispatch) => {
    try {
      const res = await SeniorService.findByTitle(title);
      dispatch({
        type: RETRIEVE_SENIORS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  


