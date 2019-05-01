import axios from 'axios';
import API_URL from '@/configs/apiUrl';

const request = axios.create({ baseURL: API_URL });
request.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    return Promise.reject(new Error(response.data));
  }
);

export default request;
