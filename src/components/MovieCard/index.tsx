import * as React from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Movie } from '@/store/model';
import Image from '@/components/Image';
import { Card, Poster, Line, Text, Date, Title, Rate } from './style';

export interface MovieCardData extends Movie {
  isLeft: boolean;
}

interface Props {
  movie: MovieCardData;
  dayDiff: number;
}

const MovieCard: React.SFC<Props> = ({ movie, dayDiff }) => {
  const contentArr = [
    <Poster key="poster">
      <Image imageKey={movie.poster} icon="film" height={148} />
      <Line isLeft={movie.isLeft} />
    </Poster>,
    <Text key="text">
      <Date>{format(movie.watchAt, 'MM-DD')}</Date>
      <Title>{movie.title}</Title>
      <Rate>
        {Array(movie.rate)
          .fill(null)
          .map((_, index) => (
            <FontAwesomeIcon key={index} icon={['fas', 'ticket-alt']} />
          ))}
      </Rate>
    </Text>,
  ];

  return (
    <Card days={dayDiff} isReverse={movie.isLeft}>
      {movie.isLeft ? contentArr.reverse() : contentArr}
    </Card>
  );
};

export default MovieCard;
