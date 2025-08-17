import api from './api';

export const callService = {
  getAllCalls: () => api.get('/calls/getcalls'),
  getCallById: (id: string) => api.get(`/calls/${id}`),
  createCall: (data: any) => api.post('/calls/login', data),
  updateCall: (id: string, data: any) => api.put(`/calls/${id}`, data),
  deleteCall: (id: string) => api.delete(`/calls/${id}`),
};

export default callService;