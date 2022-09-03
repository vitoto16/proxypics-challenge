import axios from 'axios';
import baseURL from './url';

const orders = axios.create({
  baseURL: baseURL + '/orders',
});

export default orders;
