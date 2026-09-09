import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired or invalid, clear local auth
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/signup') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  register: (userData) => api.post('/api/auth/register', userData),
  getMe: () => api.get('/api/auth/me'),
};

// Task Services
export const taskService = {
  getAll: () => api.get('/api/tasks'),
  getByMember: (memberName) => api.get(`/api/tasks/member/${encodeURIComponent(memberName)}`),
  create: (taskData) => api.post('/api/tasks', taskData),
  updateDeadline: (id, deadline) => api.put(`/api/tasks/${id}/deadline`, { deadline }),
  updateStatus: (id, status) => api.put(`/api/tasks/${id}/status`, { status }),
  toggleCompleted: (id, completed) => api.put(`/api/tasks/${id}/completed`, { completed }),
  delete: (id) => api.delete(`/api/tasks/${id}`),
};

// User / Team Services
export const userService = {
  getUsers: () => api.get('/api/users'),
  getTeamMembers: () => api.get('/api/users/members'),
};

// Notification Services
export const notificationService = {
  getByUsername: (username) => api.get(`/api/notifications/${encodeURIComponent(username)}`),
  create: (notificationData) => api.post('/api/notifications', notificationData),
  delete: (id) => api.delete(`/api/notifications/${id}`),
};

// File Services
export const fileService = {
  getAll: () => api.get('/api/files'),
  getByRecipient: (recipient) => api.get(`/api/files/recipient/${encodeURIComponent(recipient)}`),
  upload: (formData) =>
    api.post('/api/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  downloadUrl: (filename) => `${API_BASE_URL}/api/files/download/${encodeURIComponent(filename)}`,
};

// Comment Services
export const commentService = {
  getAll: () => api.get('/api/comments'),
  create: (commentData) => api.post('/api/comments', commentData),
};

export default api;
