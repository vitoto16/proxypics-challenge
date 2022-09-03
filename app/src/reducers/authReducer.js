import {REGISTER, LOGIN, LOGOUT} from '../actions/types';

const INITAL_STATE = {
  authToken: '',
};

const authReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case REGISTER:
      return {...state, authToken: action.payload};
    case LOGIN:
      return {...state, authToken: action.payload};
    case LOGOUT:
      return {...state, authToken: ''};
    default:
      return state;
  }
};

export default authReducer;
