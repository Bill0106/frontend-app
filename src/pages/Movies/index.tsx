import * as React from 'react';
import { getMonth, getYear, differenceInDays } from 'date-fns';
import { RouteComponentProps } from '@reach/router';
import { Movie } from '@/constants/models';
import useList, { ListType } from '@/hooks/useList';
import InfiniteScroll from '@/components/InfiniteScroll';
import MovieCard, { MovieCardData } from '@/components/MovieCard';
import { Year, Item, Line, Spacer } from './style';

const Movies: React.SFC<RouteComponentProps> = () => {
  const { list, infiniteScrollProps } = useList<Movie>(ListType.Movie);

  const years = list
    .map(item => getYear(new Date(item.watchAt)))
    .filter((item, index, arr) => index === arr.indexOf(item));

  const movies = list.reduce((res: MovieCardData[], item, index) => {
    if (index === 0) {
      return [...res, { ...item, isLeft: true }];
    }

    const prev = res[res.length - 1];
    return [
      ...res,
      {
        ...item,
        isLeft:
          getMonth(new Date(item.watchAt)) === getMonth(new Date(prev.watchAt))
            ? prev.isLeft
            : !prev.isLeft,
      },
    ];
  }, []);

  return (
    <InfiniteScroll {...infiniteScrollProps}>
      <div>
        {years.map(item => (
          <div key={item}>
            <Year>{item}</Year>
            {movies
              .filter(v => getYear(new Date(v.watchAt)) === item)
              .map((v, i, a) => {
                const dayDiff =
                  i &&
                  differenceInDays(
                    new Date(a[i - 1].watchAt),
                    new Date(v.watchAt)
                  );
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
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Movies;
