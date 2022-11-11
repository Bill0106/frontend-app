import { Movie } from '../models/movie'
import { faFilm, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { FC } from 'react'
import Image from '@/components/Image'

export interface MovieCardData extends Movie {
  isLeft: boolean
}

export interface MovieCardProps {
  data: MovieCardData
  dayDiff: number
}

const MovieCard: FC<MovieCardProps> = ({ data, dayDiff }) => {
  const baseClass = 'movies__card'
  const cardClass = [baseClass, data.isLeft ? `${baseClass}--left` : ''].join(' ')

  const renderTickets = () => {
    return Array(5).fill(null).map((_, index) => {
      const ticketClass = ['movies__card-ticket', index < data.rate ? 'active' : ''].join(' ')

      return (
        <span key={index} className={ticketClass}>
          <FontAwesomeIcon icon={faTicketAlt} />
        </span>
      )
    })
  }

  return (
    <div className={cardClass} style={{ paddingTop: `${dayDiff * 4 + 16}px` }}>
      <div className="movies__card-poster">
        <Image url={data.poster} icon={faFilm} height={148} />
      </div>
      <div className="movies__card-text">
        <div className="movies__card-date">
          {dayjs.unix(data.watchedAt).format('MM-DD')}
        </div>
        <p className="movies__card-title">{data.title}</p>
        <div className="movies__card-rate">
          {renderTickets()}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
