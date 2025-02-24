import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  
  verifyToken: () =>
    api.get('/auth/verify'),
};

export const coursesAPI = {
  getAllCourses: () =>
    api.get('/courses'),
  
  getCourseById: (id: string) =>
    api.get(`/courses/${id}`),
  
  getCourseProgress: (courseId: string) =>
    api.get(`/courses/${courseId}/progress`),
  
  updateProgress: (courseId: string, moduleId: number) =>
    api.post(`/courses/${courseId}/progress`, { moduleId }),
  
  saveNote: (courseId: string, content: string, moduleId: number) =>
    api.post(`/courses/${courseId}/notes`, { content, moduleId }),
  
  getRecentNotes: () =>
    api.get('/courses/notes/recent'),
  
  getStats: () =>
    api.get('/courses/stats'),
};

export const subscriptionAPI = {
  createSubscription: (paymentMethodId: string, priceId: string) =>
    api.post('/subscriptions/create', { paymentMethodId, priceId }),
  
  cancelSubscription: () =>
    api.post('/subscriptions/cancel'),
  
  getStatus: () =>
    api.get('/subscriptions/status'),
};

export default api;
