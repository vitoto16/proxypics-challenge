import axios from 'axios';
import baseURL from './url';

const users = axios.create({
  baseURL,
});

export default users;
