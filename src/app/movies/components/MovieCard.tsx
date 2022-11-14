import { Movie } from '../models/movie'
import { faFilm, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { FC } from 'react'
import Image from '@/components/Image'
import bem from '@/utils/bem'

export interface MovieCardData extends Movie {
  isLeft: boolean
}

export interface MovieCardProps {
  data: MovieCardData
  dayDiff: number
}

const MovieCard: FC<MovieCardProps> = ({ data, dayDiff }) => {
  const { modifiers, sub } = bem('movies').element('card')

  const renderTickets = () => {
    return Array(5).fill(null).map((_, index) => (
      <span key={index} {...sub('ticket').modifiers({ active: index < data.rate })}>
        <FontAwesomeIcon icon={faTicketAlt} />
      </span>
    ))
  }

  return (
    <div {...modifiers({ left: data.isLeft })} style={{ paddingTop: `${dayDiff * 4 + 16}px` }}>
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
