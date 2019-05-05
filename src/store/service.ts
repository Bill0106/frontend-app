import { stringify } from 'query-string';
import request from '@/utils/request';

export interface List<T> {
  list: Array<T>;
  total: number;
}

class Service {
  async fetchList<T>(type: string, page = 1, pageSize = 24): Promise<List<T>> {
    const queryString = stringify({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    try {
      const res = await request.get(`/${type}?${queryString}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new Service();
