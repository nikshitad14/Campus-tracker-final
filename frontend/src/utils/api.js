import axios from 'axios';

const token = localStorage.getItem('token');
const API = axios.create({ 
  baseURL: '/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
});

export const fetchRoutes            = ()              => API.get('/routes');
export const fetchRoute             = (id)            => API.get(`/routes/${id}`);
export const fetchSchedules         = (routeId)       => API.get(`/routes/${routeId}/schedules`);
export const getETA                 = (scheduleId)    => API.get(`/delays/${scheduleId}/eta`);
export const reportDelay            = (data)          => API.post('/delays', data);
export const subscribeRoute         = (data)          => API.post('/subscriptions', data);
export const fetchRidershipAnalytics= ()              => API.get('/analytics/ridership');

export default API;
