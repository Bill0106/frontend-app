import axios from 'axios';

export interface Game {
  image: string;
}

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://api.zhuhaolin.com/'
      : 'http://localhost:9999/',
});

request.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    return Promise.reject(new Error(response.data));
  }
);

class Services {
  fetchGames(limit: number, offset: number) {
    return request.request<{ list: Game[]; total: number }>({
      url: `/games?limit=${limit}&offset=${offset}`,
    });
  }
}

export default new Services();
