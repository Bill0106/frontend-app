import MEDIA_QUERIES from '@/constants/mediaQueries'
import { Movie } from '../models/movie'
import styled from '@emotion/styled'
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

const Poster = styled.div<{ isLeft: boolean }>`
  position: relative;
  width: 100px;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    grid-column-start: ${p => p.isLeft && 2};
    grid-column-end: ${p => p.isLeft && 3};
    grid-row-start: 1;
  }
`

const Text = styled.div<{ isLeft: boolean }>`
  color: #14a76c;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    grid-column-start: ${p => p.isLeft && 1};
    grid-column-end: ${p => p.isLeft && 2};
    grid-row-start: 1;
  }
`

const Date = styled.span`
  font-size: 40px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: #ffe400;
`

const Title = styled.p`
  margin: 8px 0;
  font-size: 24px;
  @media (max-width: ${MEDIA_QUERIES.LAPTOP}) {
    font-size: 20px;
  }
`

const Rate = styled.div<{ isLeft: boolean }>`
  display: flex;
  margin: 0 -4px;
  font-size: 28px;
  @media (max-width: ${MEDIA_QUERIES.LAPTOP}) {
    margin: 0 -4px;
    font-size: 24px;
  }
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    flex-direction: ${p => p.isLeft && 'row-reverse'};
  }
`

const Ticket = styled.span<{ active: boolean }>`
  margin: 0 4px;
  opacity: ${p => p.active ? 1 : 0.3};
  @media (max-width: ${MEDIA_QUERIES.LAPTOP}) {
    margin: 0 4px;
  }
`

const Line = styled.span<{ isLeft: boolean }>`
  position: absolute;
  top: 50%;
  left: -24px;
  right: 0;
  margin-top: -1px;
  width: 24px;
  height: 2px;
  background: #ffe400;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    left: ${p => p.isLeft ? '100px' : '-24px'};
  }
`

const Card = styled.div<{ days: number; isLeft: boolean }>`
  display: grid;
  grid-template-columns: 100px 1fr;
  column-gap: 16px;
  position: relative;
  padding: ${p => p.days * 4 + 16}px 16px 16px;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    grid-template-columns: ${p => p.isLeft && '1fr 100px'};
    text-align: ${p => p.isLeft ? 'right' : 'left'};
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    column-gap: 8px;
    padding-left: 56px;
  }
`

const MovieCard: FC<MovieCardProps> = ({ data, dayDiff }) => (
  <Card days={dayDiff} isLeft={data.isLeft}>
    <Poster isLeft={data.isLeft}>
      <Image url={data.poster} icon={faFilm} height={148} />
      <Line isLeft={data.isLeft} />
    </Poster>
    <Text isLeft={data.isLeft}>
      <Date>{dayjs.unix(data.watchedAt).format('MM-DD')}</Date>
      <Title>{data.title}</Title>
      <Rate isLeft={data.isLeft}>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <Ticket key={index} active={index < data.rate}>
              <FontAwesomeIcon icon={faTicketAlt} />
            </Ticket>
          ))}
      </Rate>
    </Text>
  </Card>
)

export default MovieCard
