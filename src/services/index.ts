import { stringify } from 'query-string';
import request from '@/utils/request';
import { GameList } from '@/models';

class Services {
  async fetchGames(page = 1, pageSize = 24): Promise<GameList> {
    try {
      const query = stringify({
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      const res = await request.get(`/games?${query}`);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new Services();
