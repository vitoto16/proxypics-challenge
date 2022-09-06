import {REGISTER, LOGIN, LOGOUT} from '../actions/types';

const INITAL_STATE = {
  authToken: '',
  user: {},
};

const authReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        authToken: action.payload.authToken,
        user: action.payload.user,
      };
    case LOGIN:
      return {
        ...state,
        authToken: action.payload.authToken,
        user: action.payload.user,
      };
    case LOGOUT:
      return {...state, authToken: '', user: {}, orders: {}};
    default:
      return state;
  }
};

export default authReducer;
