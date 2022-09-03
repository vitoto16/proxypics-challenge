import axios from 'axios';
import baseURL from './url';

const auth = axios.create({
  baseURL,
  proxy: false,
});

export default auth;
