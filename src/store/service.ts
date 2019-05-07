import { stringify } from 'query-string';
import request from '@/utils/request';
import { Game, GameTrophy } from '@/store/model';

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
  async fetchGame(url: string): Promise<Game> {
    try {
      const res = await request.get(`/games/${url}`);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async fetchGameTrophies(url: string): Promise<Array<GameTrophy>> {
    try {
      const res = await request.get(`/games/${url}/trophies`);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new Service();
