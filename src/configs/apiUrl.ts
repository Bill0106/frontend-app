import ENV, { Env } from '@/configs/env';

const API_URLS = {
  [Env.develop]: 'http://localhost:9999/',
  [Env.production]: '//api.zhuhaolin.com/',
};

export default API_URLS[ENV];
