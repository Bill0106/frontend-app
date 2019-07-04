import * as React from 'react';
import { getMonth, getYear, differenceInDays } from 'date-fns';
import { RouteComponentProps } from '@reach/router';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { Movie } from '@/store/model';
import useFetchList from '@/store/useFetchList';
import InfiniteScroll from '@/components/InfiniteScroll';
import MovieCard, { MovieCardData } from '@/components/MovieCard';
import { Timeline, Content, Year, Item, Line, Spacer } from './style';

const Movies: React.SFC<RouteComponentProps> = () => {
  const [state, fetchList] = useFetchList<Movie>('movies');
  const { list, total, isFetching } = state;
  useDocumentTitle('Movies');

  const years = state.list
    .map(item => getYear(item.watchAt))
    .filter((item, index, arr) => index === arr.indexOf(item));

  const movies = state.list.reduce((res: Array<MovieCardData>, item, index) => {
    if (index === 0) {
      return [...res, { ...item, isLeft: true }];
    }

    const prev = res[res.length - 1];
    return [
      ...res,
      {
        ...item,
        isLeft:
          getMonth(item.watchAt) === getMonth(prev.watchAt)
            ? prev.isLeft
            : !prev.isLeft,
      },
    ];
  }, []);

  const scrollProps = {
    hasMore: list.length === 0 || list.length < total,
    isBusy: isFetching,
    onLoadMore: fetchList,
  };

  return (
    <InfiniteScroll {...scrollProps}>
      <Timeline>
        {years.map(item => (
          <Content key={item}>
            <Year>{item}</Year>
            {movies
              .filter(v => getYear(v.watchAt) === item)
              .map((v, i, a) => {
                const dayDiff =
                  i && differenceInDays(a[i - 1].watchAt, v.watchAt);
                const doms = [
                  <MovieCard key="card" movie={v} dayDiff={dayDiff} />,
                  <Spacer key="spacer" />,
                ];

                return (
                  <Item key={v.id}>
                    {v.isLeft ? doms : doms.reverse()}
                    <Line />
                  </Item>
                );
              })}
          </Content>
        ))}
      </Timeline>
    </InfiniteScroll>
  );
};

export default Movies;
