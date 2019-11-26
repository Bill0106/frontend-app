import * as React from 'react';
import { getMonth, getYear, differenceInDays, parseISO } from 'date-fns';
import { RouteComponentProps } from '@reach/router';
import { Movie } from '@/constants/models';
import Type from '@/constants/type';
import useList from '@/hooks/useList';
import InfiniteScroll from '@/components/InfiniteScroll';
import MovieCard, { MovieCardData } from '@/components/MovieCard';
import { Year, Item, Line, Spacer } from './style';

const Movies: React.SFC<RouteComponentProps> = () => {
  const { list, infiniteScrollProps } = useList<Movie>(Type.Movie);

  const years = list
    .map(item => getYear(parseISO(item.watchAt)))
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
          getMonth(parseISO(item.watchAt)) === getMonth(parseISO(prev.watchAt))
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
              .filter(v => getYear(parseISO(v.watchAt)) === item)
              .map((v, i, a) => {
                const dayDiff =
                  i &&
                  differenceInDays(
                    parseISO(a[i - 1].watchAt),
                    parseISO(v.watchAt)
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
