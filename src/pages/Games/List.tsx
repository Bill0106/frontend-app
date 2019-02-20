import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { GameList } from '@/models';
import services from '@/services';
import GameCard from '@/components/GameCard';
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

  useEffect(() => {
    if (page === 0) {
      fetch(1);
    }
  });

  return (
    <List>
      {games.list.map(item => (
        <GameCard key={item._id} game={item} />
      ))}
    </List>
  );
};

export default Games;
