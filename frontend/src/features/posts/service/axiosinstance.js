import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/post', // Updated base URL to match backend routes
  withCredentials: true,
});

export default axiosInstance;