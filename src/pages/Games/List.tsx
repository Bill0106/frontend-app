import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Game } from '@/constants/models';
import Type from '@/constants/type';
import useList from '@/hooks/useList';
import InfiniteScroll from '@/components/InfiniteScroll';
import GameCard from '@/components/GameCard';
import { List } from './style';

const Games: React.SFC<RouteComponentProps> = () => {
  const { list, infiniteScrollProps } = useList<Game>(Type.Game);

  return (
    <InfiniteScroll {...infiniteScrollProps}>
      <List>
        {list.map(item => (
          <GameCard key={item.id} game={item} />
        ))}
      </List>
    </InfiniteScroll>
  );
};

export default Games;
