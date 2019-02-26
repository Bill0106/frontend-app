import { stringify } from 'query-string';
import request from '@/utils/request';
import { GameList, Game, GameTrophy } from '@/models';

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
  async fetchGame(url: string): Promise<Game> {
    try {
      const res = await request.get(`/games/${url}`);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async fetchGameTrophies(url: string): Promise<GameTrophy[]> {
    try {
      const res = await request.get(`/games/${url}/trophies`);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new Services();
