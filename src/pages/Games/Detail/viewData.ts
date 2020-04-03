import { useState, useCallback, useEffect } from 'react';
import { Game, GameTrophy, GamePlatform } from '@/constants/models';
import request from '@/utils/request';
import useMessage from '@/hooks/useMessage';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const useViewData = (id?: string) => {
  const [game, setGame] = useState<Game | null>(null);
  const [trophies, setTrophies] = useState<GameTrophy[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { setError } = useMessage();

  useDocumentTitle([game ? game.name : '', 'Games']);

  const fetch = useCallback(async () => {
    if (!id) {
      return false;
    }

    setIsFetching(true);
    try {
      const res = await request.get<Game>(`/games/${id}`);

      if (res.platform !== GamePlatform.NS) {
        const trophyRes = await request.get<{ gameTrophies: GameTrophy[] }>(
          `/games/${id}/trophies`
        );
        setTrophies(trophyRes.gameTrophies || []);
      }

      setGame(res);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, [setError, id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const earned =
    trophies.length &&
    (trophies.filter(item => item.earnAt).length / trophies.length) * 100;

  return { game, trophies, earned, isFetching };
};

export default useViewData;
