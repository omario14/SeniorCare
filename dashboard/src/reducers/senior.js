import {
    CREATE_SENIOR ,
RETRIEVE_SENIORS ,
UPDATE_SENIOR ,
DELETE_SENIOR ,
 DELETE_ALL_SENIORS 
} from '../actions/types';
  const initialState = [];
  function seniorReducer(seniors = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_SENIOR:
        return [...seniors, payload];
      case RETRIEVE_SENIORS:
        return payload;
      case UPDATE_SENIOR:
        return seniors.map((senior) => {
          if (senior.id === payload.id) {
            return {
              ...senior,
              ...payload,
            };
          } else {
            return senior;
          }
        });
      case DELETE_SENIOR:
        return seniors.filter(({ id }) => id !== payload.id);
      case DELETE_ALL_SENIORS:
        return [];
      default:
        return seniors;
    }
  };
  export default seniorReducer;