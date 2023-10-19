import type { FC } from 'react'
import MovieCard from './MovieCard'
import type { Movie } from '@/app/movies/models/movie'

const MovieList: FC<{ list: Movie[] }> = ({ list }) => {
  return (
    <div>
      {list.map((v: Movie) => (
        <div key={v.id} className="movies__item">
          <MovieCard key="card" data={v} />
        </div>
      ))}
    </div>
  )
}

export default MovieList
