import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restapi.tu.ac.th/api/v1', 
  headers: {
    'Content-Type': 'application/json',
    'Application-Key': import.meta.env.VITE_TU_APP_KEY
  }
});

export default api;