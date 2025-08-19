// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  updatePassword: (passwordData) => api.put('/auth/password', passwordData),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  createUser: (userData) => api.post('/admin/users', userData),
  createStore: (storeData) => api.post('/admin/stores', storeData),
  getAllUsers: (params = {}) => api.get('/admin/users', { params }),
  getAllStores: (params = {}) => api.get('/admin/stores', { params }),
};

// Store API (for normal users)
export const storeAPI = {
  getAllStores: (params = {}) => api.get('/stores', { params }),
  submitRating: (ratingData) => api.post('/ratings', ratingData),
};

// Store Owner API
export const storeOwnerAPI = {
  getDashboard: () => api.get('/store-owner/dashboard'),
};

export default api;