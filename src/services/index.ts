import { stringify } from 'query-string';
import request from '@/utils/request';
import { GameList, Game, GameTrophy, GourmetList } from '@/models';

const sizeQuery = (page: number, size: number) => {
  return stringify({
    limit: size,
    offset: (page - 1) * size,
  });
};

class Services {
  async fetchGames(page = 1, pageSize = 24): Promise<GameList> {
    try {
      const res = await request.get(`/games?${sizeQuery(page, pageSize)}`);

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
  async fetchGourmets(page = 1, pageSize = 24): Promise<GourmetList> {
    try {
      const res = await request.get(`/gourmets?${sizeQuery(page, pageSize)}`);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new Services();
