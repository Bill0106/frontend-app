import { Movie } from '../models/movie'
import { faFilm, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { FC } from 'react'
import Image from '@/components/Image'
import classnames from '@/utils/classnames'

export interface MovieCardData extends Movie {
  isLeft: boolean
}

export interface MovieCardProps {
  data: MovieCardData
  dayDiff: number
}

const MovieCard: FC<MovieCardProps> = ({ data, dayDiff }) => {
  const classname = classnames('movies__card')

  const renderTickets = () => {
    return Array(5).fill(null).map((_, index) => (
      <span key={index} {...classname('-ticket', { active: index < data.rate })}>
        <FontAwesomeIcon icon={faTicketAlt} />
      </span>
    ))
  }

  return (
    <div {...classname('', { left: data.isLeft })} style={{ paddingTop: `${dayDiff * 4 + 16}px` }}>
      <div {...classname('-poster')}>
        <Image url={data.poster} icon={faFilm} height={148} />
      </div>
      <div {...classname('-text')}>
        <div {...classname('-date')}>
          {dayjs.unix(data.watchedAt).format('MM-DD')}
        </div>
        <p {...classname('-title')}>{data.title}</p>
        <div {...classname('-rate')}>
          {renderTickets()}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
