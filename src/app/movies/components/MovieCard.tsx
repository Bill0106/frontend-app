import { Movie, MovieType } from '../models/movie'
import { faFilm, faTicket, faTv } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import Image from '@/components/Image'
import bem from '@/utils/bem'
import dayjs from 'dayjs'

const MovieCard: FC<{ data: Movie }> = ({ data }) => {
  const { class: classname, sub } = bem('movies').element('card')

  const renderTickets = () => {
    return Array(5).fill(null).map((_, index) => (
      <span key={index} {...sub('ticket').modifiers({ active: index < data.rate })}>
        <FontAwesomeIcon icon={data.movieType === MovieType.Cinema ? faTicket : faTv} />
      </span>
    ))
  }

  return (
    <div {...classname}>
      <div {...sub('poster').class}>
        <Image url={data.poster} icon={faFilm} height={148} />
      </div>
      <div {...sub('text').class}>
        <div {...sub('date').class}>
          {dayjs.unix(data.watchedAt).format('MM-DD')}
        </div>
        <p {...sub('title').class}>{data.title}</p>
        <div {...sub('rate').class}>
          {renderTickets()}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
