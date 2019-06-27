import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Movie } from '@/store/model';
import useFetchList from '@/store/useFetchList';

const Movies: React.SFC<RouteComponentProps> = () => {
  const [state, fetchList] = useFetchList<Movie>('movies');

  console.log(state);

  return <div>Movies</div>;
};

export default Movies;
