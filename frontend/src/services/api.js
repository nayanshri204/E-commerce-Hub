import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getProfile: () => api.get('/api/auth/profile'),
  updateProfile: (data) => api.put('/api/auth/profile', data),
};

// Product Services
export const productService = {
  getAll: (params) => api.get('/api/products', { params }),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (data) => api.post('/api/products', data),
  update: (id, data) => api.put(`/api/products/${id}`, data),
  delete: (id) => api.delete(`/api/products/${id}`),
  addReview: (id, data) => api.post(`/api/products/${id}/reviews`, data),
};

// Cart Services
export const cartService = {
  getCart: () => api.get('/api/cart'),
  addToCart: (data) => api.post('/api/cart/add', data),
  updateItem: (productId, data) => api.put(`/api/cart/${productId}`, data),
  removeItem: (productId) => api.delete(`/api/cart/${productId}`),
  clearCart: () => api.delete('/api/cart'),
};

// Order Services
export const orderService = {
  createPaymentIntent: (data) => api.post('/api/orders/payment-intent', data),
  createOrder: (data) => api.post('/api/orders', data),
  getOrders: () => api.get('/api/orders'),
  getOrderById: (id) => api.get(`/api/orders/${id}`),
  updateOrderStatus: (id, data) => api.put(`/api/orders/${id}/status`, data),
  getAllOrders: () => api.get('/api/orders/admin/all'),
};

export default api;
