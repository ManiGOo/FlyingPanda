import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL/api,
  timeout: 10000,
});

export const getAlerts = (params) => api.get('/alerts', { params });
export const createAlert = (data) => api.post('/alerts', data);
export const updateAlert = (id, data) => api.put(`/alerts/${id}`, data);
export const deleteAlert = (id) => api.delete(`/alerts/${id}`);