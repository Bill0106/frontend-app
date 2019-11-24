import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Gourmet } from '@/constants/models';
import useList, { ListType } from '@/hooks/useList';
import InfiniteScroll from '@/components/InfiniteScroll';
import GourmetCard from '@/components/GourmetCard';
import { List } from './style';

const Gourmets: React.SFC<RouteComponentProps> = () => {
  const { list, infiniteScrollProps } = useList<Gourmet>(ListType.Gourmet);

  return (
    <InfiniteScroll {...infiniteScrollProps}>
      <List>
        {list.map(item => (
          <GourmetCard key={item.id} gourmet={item} />
        ))}
      </List>
    </InfiniteScroll>
  );
};

export default Gourmets;
