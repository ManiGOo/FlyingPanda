import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the request timed out or network failed
    if (error.code === 'ECONNABORTED' || !error.response) {
      // Dispatch a custom event that our Popup can listen for
      window.dispatchEvent(new Event('server-cold-start'));
    }
    return Promise.reject(error);
  }
);

export const getAlerts = (params) => api.get('/alerts', { params });
export const createAlert = (data) => api.post('/alerts', data);
export const updateAlert = (id, data) => api.put(`/alerts/${id}`, data);
export const deleteAlert = (id) => api.delete(`/alerts/${id}`);