import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v1/';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default instance;
