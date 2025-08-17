const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Base endpoints
  BASE: API_BASE_URL,
  
  // Call endpoints
  CALLS: {
    GET_ALL: `${API_BASE_URL}/calls`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/calls/${id}`,
    CREATE: `${API_BASE_URL}/calls`,
    UPDATE: (id: string) => `${API_BASE_URL}/calls/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/calls/${id}`,
  },
  
  // Buyer endpoints
  BUYERS: {
    GET_ALL: `${API_BASE_URL}/buyers`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/buyers/${id}`,
    CREATE: `${API_BASE_URL}/buyers`,
    UPDATE: (id: string) => `${API_BASE_URL}/buyers/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/buyers/${id}`,
  },
  
  // Logs endpoints
  LOGS: {
    GET_ALL: `${API_BASE_URL}/logs`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/logs/${id}`,
    CREATE: `${API_BASE_URL}/logs`,
  },
};

export default API_ENDPOINTS;