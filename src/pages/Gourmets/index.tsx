import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { Gourmet } from '@/store/model';
import useFetchList from '@/store/useFetchList';
import InfiniteScroll from '@/components/InfiniteScroll';
import GourmetCard from '@/components/GourmetCard';
import { List } from './style';

const Gourmets: React.SFC<RouteComponentProps> = () => {
  const [state, fetchList] = useFetchList<Gourmet>('gourmets');
  const { list, total, isFetching } = state;

  useDocumentTitle('Gourmets');

  const handleLoadMore = () => {
    if (list.length >= total || isFetching) {
      return false;
    }

    fetchList();
  };

  return (
    <InfiniteScroll
      hasMore={list.length === 0 || list.length < total}
      isBusy={isFetching}
      onLoadMore={handleLoadMore}
    >
      <List>
        {list.map(item => (
          <GourmetCard key={item.id} gourmet={item} />
        ))}
      </List>
    </InfiniteScroll>
  );
};

export default Gourmets;
