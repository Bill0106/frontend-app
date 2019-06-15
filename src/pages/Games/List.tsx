import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import PAGE_TITLE from '@/constants/pageTitle';
import { Game } from '@/store/model';
import useFetchList from '@/store/useFetchList';
import InfiniteScroll from '@/components/InfiniteScroll';
import GameCard from '@/components/GameCard';
import { List } from './style';

const { useEffect } = React;

const Games: React.SFC<RouteComponentProps> = () => {
  const [state, fetchList] = useFetchList<Game>('games');
  const { list, total, isFetching } = state;

  useEffect(() => {
    document.title = `Games - ${PAGE_TITLE}`;
  }, []);

  return (
    <InfiniteScroll
      hasMore={list.length === 0 || list.length < total}
      isBusy={isFetching}
      onLoadMore={fetchList}
    >
      <List>
        {list.map(item => (
          <GameCard key={item.id} game={item} />
        ))}
      </List>
    </InfiniteScroll>
  );
};

export default Games;
