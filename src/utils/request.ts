import axios, { AxiosError } from 'axios';
import API_URL from '@/configs/apiUrl';

const request = axios.create({ baseURL: API_URL });
request.interceptors.response.use(
  response => response.data,
  (error: AxiosError) => {
    const { response } = error;
    return Promise.reject(new Error(response && response.data));
  }
);

export default request;
