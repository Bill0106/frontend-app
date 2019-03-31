import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? '//api.zhuhaolin.com/'
    : 'http://localhost:9999/';

const request = axios.create({ baseURL });
request.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    return Promise.reject(new Error(response.data));
  }
);

export default request;
