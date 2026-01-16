import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('cdc_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If token expired, try to refresh
        if (error.response?.status === 401 && error.response?.data?.code === 'TOKEN_EXPIRED' && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('cdc_refresh_token');
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refreshToken
                });

                const { token, refreshToken: newRefreshToken } = response.data.data;

                localStorage.setItem('cdc_token', token);
                localStorage.setItem('cdc_refresh_token', newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, logout user
                localStorage.removeItem('cdc_token');
                localStorage.removeItem('cdc_refresh_token');
                localStorage.removeItem('cdc_user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getCurrentUser: () => api.get('/auth/me'),
    refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken })
};

// Analytics API
export const analyticsAPI = {
    trackPageView: (data) => api.post('/analytics/pageview', data),
    sessionHeartbeat: () => api.post('/analytics/session/heartbeat'),
    endSession: () => api.post('/analytics/session/end'),
    getDashboard: (params) => api.get('/analytics/dashboard', { params }),
    getInvestorAnalytics: (id) => api.get(`/analytics/investor/${id}`)
};

// OCR API
export const ocrAPI = {
    processOCR: () => api.post('/ocr/process'),
    uploadDocument: (formData) => api.post('/ocr/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getJobStatus: (jobId) => api.get(`/ocr/status/${jobId}`),
    getHistory: (params) => api.get('/ocr/history', { params }),
    getDocuments: (params) => api.get('/ocr/documents', { params })
};

// Data API
export const dataAPI = {
    getAllData: () => api.get('/data/all'),
    updateData: (data) => api.put('/data/update', data),
    getDataHistory: (key) => api.get(`/data/history/${key}`),
    syncFromSheets: () => api.post('/data/sync')
};

export default api;
