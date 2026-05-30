import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/auth', // Updated base URL to match backend routes
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// register and login functions using the axios instance
export async function register({ username, email, password }) {
    try {
        const response = await axiosInstance.post('/register', { username, email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
}

export async function login({ email, password }) {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
}
