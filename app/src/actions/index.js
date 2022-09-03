import auth from '../apis/auth';
import orders from '../apis/orders';
import {
  REGISTER,
  LOGIN,
  LOGOUT,
  CREATE_ORDER,
  FETCH_ORDERS,
  SUBMIT_PHOTOS,
} from './types';

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const register = user => async dispatch => {
  const response = await auth.post('/signup', {user}, config);
  dispatch({
    type: REGISTER,
    payload: response.headers['authorization'],
  });
};

export const login = user => async dispatch => {
  const response = await auth.post('/login', {user}, config);
  dispatch({
    type: LOGIN,
    payload: response.headers['authorization'],
  });
};

export const logout = () => async (dispatch, getState) => {
  const {authToken} = getState().auth;
  await auth.delete('/logout', {
    headers: {...config, Authorization: authToken},
  });
  dispatch({
    type: LOGOUT,
  });
};

export const createOrder = order => async (dispatch, getState) => {
  const {authToken} = getState().auth;
  const response = await orders.post(
    '',
    {order},
    {headers: {...config, Authorization: authToken}},
  );
  dispatch({
    type: CREATE_ORDER,
    payload: response.data,
  });
};

export const fetchOrders = () => async (dispatch, getState) => {
  const {authToken} = getState().auth;
  const response = await orders.get('', {
    headers: {...config, Authorization: authToken},
  });
  dispatch({
    type: FETCH_ORDERS,
    payload: response.data,
  });
};

export const submitPhotos = (id, photos) => async (dispatch, getState) => {
  const {authToken} = getState().auth;
  const response = await orders.patch(`/${id}/submit_photos`, photos, {
    headers: {
      ...config,
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  dispatch({
    type: SUBMIT_PHOTOS,
    payload: response.data,
  });
};
