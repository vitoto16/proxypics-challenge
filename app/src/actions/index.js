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

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const register = user => async dispatch => {
  const response = await auth.post('/signup', {user}, {headers: headers});
  dispatch({
    type: REGISTER,
    payload: {
      authToken: response.headers['authorization'],
      user: response.data.data,
    },
  });
};

export const login = user => async dispatch => {
  const response = await auth.post('/login', {user}, {headers: headers});
  dispatch({
    type: LOGIN,
    payload: {
      authToken: response.headers['authorization'],
      user: response.data.data,
    },
  });
};

export const logout = () => async (dispatch, getState) => {
  const {authToken} = getState().auth;
  await auth.delete('/logout', {
    headers: {...headers, Authorization: authToken},
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
    {headers: {...headers, Authorization: authToken}},
  );
  dispatch({
    type: CREATE_ORDER,
    payload: response.data,
  });
};

export const fetchOrders = () => async (dispatch, getState) => {
  const {authToken} = getState().auth;
  const response = await orders.get('', {
    headers: {...headers, Authorization: authToken},
  });
  dispatch({
    type: FETCH_ORDERS,
    payload: response.data,
  });
};

export const submitPhotos = (id, photos) => async (dispatch, getState) => {
  const {authToken} = getState().auth;
  const formData = new FormData();
  photos.forEach((photo, i) => {
    formData.append('photos[]', {
      uri: photo,
      type: 'image/jpg',
      filename: `Order_${id}_Photo_${i}.jpg`,
      name: `Order_${id}_Photo_${i}.jpg`,
    });
  });
  formData.append('Content-Type', 'image/jpg');
  const response = await orders.patch(`/${id}/submit_photos`, formData, {
    headers: {
      ...headers,
      Authorization: authToken,
      'Content-Type': 'multipart/form-data',
    },
  });
  dispatch({
    type: SUBMIT_PHOTOS,
    payload: response.data,
  });
};
