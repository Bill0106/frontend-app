import dayjs from 'dayjs'
import { FC } from 'react'
import MovieCard, { MovieCardData } from './MovieCard'

const MovieList: FC<{ list: MovieCardData[] }> = ({ list }) => {
  const renderItem = (v: MovieCardData, i: number, a: MovieCardData[]) => {
    const dayDiff = i &&
      dayjs.unix(a[i - 1].watchedAt).diff(dayjs.unix(v.watchedAt), 'day')

    const doms = [
      <MovieCard key="card" data={v} dayDiff={dayDiff} />,
      <div key="spacer" className="movies__spacer" />
    ]

    return (
      <div key={v.id} className="movies__item">
        {v.isLeft ? doms : doms.reverse()}
      </div>
    )
  }

  return <div>{list.map(renderItem)}</div>
}

export default MovieList
