import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import PAGE_TITLE from '@/constants/pageTitle';
import { GourmetList } from '@/models';
import services from '@/services';
import MessageContext from '@/contexts/MessageContext';
import InfiniteScroll from '@/components/InfiniteScroll';
import GourmetCard from './GourmetCard';
import { List } from './style';

const { useState, useEffect, useContext } = React;

const Gourmets: React.SFC<RouteComponentProps> = () => {
  const [gourmets, setGourmets] = useState({
    list: [],
    total: 0,
  } as GourmetList);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const { setError } = useContext(MessageContext);

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
      setError(error.message);
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

    fetch(1);
  }, []);

  const hasMore =
    gourmets.list.length === 0 || gourmets.list.length < gourmets.total;

  return (
    <InfiniteScroll
      hasMore={hasMore}
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
