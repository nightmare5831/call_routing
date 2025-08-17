import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const api = axios.create({
  baseURL: API_ENDPOINTS.BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;