import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import PAGE_TITLE from '@/constants/pageTitle';
import message from '@/utils/message';
import { GourmetList } from '@/models';
import services from '@/services';
import InfiniteScroll from '@/components/InfiniteScroll';
import GourmetCard from './GourmetCard';
import { List } from './style';

const { useState, useEffect } = React;

const Gourmets: React.SFC<RouteComponentProps> = () => {
  const [gourmets, setGourmets] = useState({
    list: [],
    total: 0,
  } as GourmetList);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const fetch = async (page: number) => {
    setPage(page);
    setIsFetching(true);

    try {
      const res = await services.fetchGourmets(page);
      setGourmets({
        list: [...gourmets.list, ...res.list],
        total: res.total,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleLoadMore = () => {
    if (gourmets.list.length >= gourmets.total || isFetching) {
      return false;
    }

    fetch(page + 1);
  };

  useEffect(() => {
    document.title = `Gourmets - ${PAGE_TITLE}`;

    if (page === 0) {
      fetch(1);
    }
  }, []);

  return (
    <InfiniteScroll
      hasMore={gourmets.list.length < gourmets.total}
      isBusy={isFetching}
      onLoadMore={handleLoadMore}
    >
      <List>
        {gourmets.list.map(item => (
          <GourmetCard key={item._id} gourmet={item} />
        ))}
      </List>
    </InfiniteScroll>
  );
};

export default Gourmets;
