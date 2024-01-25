import axios from 'axios';

const baseURL = process.env.REACT_API_URL;

const instance = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default instance;
