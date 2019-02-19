import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import CDN_URL from '@/constants/cdn';
import services, { Game } from '@/services';
import { List } from './style';

const { useState, useEffect } = React;

const Games: React.SFC<RouteComponentProps> = () => {
  const [list, setList] = useState([] as Game[]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetch = async () => {
    try {
      const limit = 24;
      const offset = (page - 1) * limit;
      const res = await services.fetchGames(limit, offset);
      setList(res.data.list);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <List>
      {list.map(item => (
        <img key={item.image} src={CDN_URL + item.image} />
      ))}
    </List>
  );
};

export default Games;
