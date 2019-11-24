import { useState, useCallback, useEffect } from 'react';
import { Game, GameTrophy, GamePlatform } from '@/constants/models';
import request from '@/utils/request';
import useMessage from '@/hooks/useMessage';
import useDocumentTitle from '@/hooks/useDocumentTitle';

interface ViewData {
  game: Game | null;
  trophies: GameTrophy[];
  earned: number;
  isFetching: boolean;
}

const useViewData = (url?: string): ViewData => {
  const [game, setGame] = useState<Game | null>(null);
  const [trophies, setTrophies] = useState<GameTrophy[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  useMessage(error);
  useDocumentTitle([game ? game.name : '', 'Games']);

  const fetch = useCallback(async (param: string) => {
    setIsFetching(true);
    try {
      const res = await request.get<Game>(`/games/${param}`);

      if (res.platform !== GamePlatform.NS) {
        const trophyRes = await request.get<{ gameTrophies: GameTrophy[] }>(
          `/games/${param}/trophies`
        );
        setTrophies(trophyRes.gameTrophies);
      }

      setGame(res);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (url) {
      fetch(url);
    }
  }, [fetch, url]);

  const earned =
    trophies.length &&
    (trophies.filter(item => item.earnAt).length / trophies.length) * 100;

  return { game, trophies, earned, isFetching };
};

export default useViewData;
