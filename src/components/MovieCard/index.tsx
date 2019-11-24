import * as React from 'react';
import { format, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Movie } from '@/constants/models';
import Image from '@/components/Image';
import { Card, Poster, Line, Text, Date, Title, Rate, Ticket } from './style';

export interface MovieCardData extends Movie {
  isLeft: boolean;
}

interface Props {
  movie: MovieCardData;
  dayDiff: number;
}

const MovieCard: React.SFC<Props> = ({ movie, dayDiff }) => (
  <Card days={dayDiff} isLeft={movie.isLeft}>
    <Poster>
      <Image imageKey={movie.poster} icon="film" height={148} />
      <Line />
    </Poster>
    <Text>
      <Date>{format(parseISO(movie.watchAt), 'MM-dd')}</Date>
      <Title>{movie.title}</Title>
      <Rate>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <Ticket key={index} active={index < movie.rate}>
              <FontAwesomeIcon icon={['fas', 'ticket-alt']} />
            </Ticket>
          ))}
      </Rate>
    </Text>
  </Card>
);

export default MovieCard;
