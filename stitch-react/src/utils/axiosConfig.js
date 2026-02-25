import axios from 'axios'

const api = axios.create({
  baseURL: "https://e-commi-v1.onrender.com", // Backend base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor for handling common errors
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - maybe logout user or refresh token
            localStorage.removeItem('token')
        }
        return Promise.reject(error)
    }
)

export default api
