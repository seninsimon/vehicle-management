import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api', // or your backend domain
});

// Optional: add auth headers or error handler
// instance.interceptors.request.use(...)

export default instance;
