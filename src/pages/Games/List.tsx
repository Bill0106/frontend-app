import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { GameList } from '@/models';
import services from '@/services';
import GameCard from '@/components/GameCard';
import InfiniteScroll from '@/components/InfiniteScroll';
import { List } from './style';

const { useState, useEffect } = React;

const Games: React.SFC<RouteComponentProps> = () => {
  const [games, setGames] = useState({ list: [], total: 0 } as GameList);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

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
      console.log(error.message);
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
    if (page === 0) {
      fetch(1);
    }
  });

  return (
    <InfiniteScroll
      hasMore={games.list.length < games.total}
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
