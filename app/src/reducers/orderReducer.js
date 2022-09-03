import _ from 'lodash';
import {CREATE_ORDER, FETCH_ORDERS, SUBMIT_PHOTOS} from '../actions/types';

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {...state, [action.payload.id]: action.payload};
    case FETCH_ORDERS:
      return {...state, ..._.mapKeys(action.payload, 'id')};
    case SUBMIT_PHOTOS:
      return {...state, [action.payload.id]: action.payload};
    default:
      return state;
  }
};

export default orderReducer;
