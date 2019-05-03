import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import PAGE_TITLE from '@/constants/pageTitle';
import { GameList } from '@/models';
import services from '@/services';
import MessageContext from '@/contexts/MessageContext';
import InfiniteScroll from '@/components/InfiniteScroll';
import GameCard from '@/components/GameCard';
import { List } from './style';

const { useState, useEffect, useContext } = React;

const Games: React.SFC<RouteComponentProps> = () => {
  const [games, setGames] = useState<GameList>({ list: [], total: 0 });
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const { setError } = useContext(MessageContext);

  const fetch = async (page: number) => {
    setPage(page);
    setIsFetching(true);

    try {
      const res = await services.fetchGames(page);
      setGames({
        list: [...games.list, ...res.list],
        total: res.total,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleLoadMore = () => {
    if (games.list.length >= games.total || isFetching) {
      return false;
    }

    fetch(page + 1);
  };

  useEffect(() => {
    document.title = `Games - ${PAGE_TITLE}`;

    fetch(1);
  }, []);

  return (
    <InfiniteScroll
      hasMore={games.list.length === 0 || games.list.length < games.total}
      isBusy={isFetching}
      onLoadMore={handleLoadMore}
    >
      <List>
        {games.list.map(item => (
          <GameCard key={item._id} game={item} />
        ))}
      </List>
    </InfiniteScroll>
  );
};

export default Games;
