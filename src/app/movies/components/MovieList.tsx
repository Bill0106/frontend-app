import MEDIA_QUERIES from '@/constants/mediaQueries'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { FC } from 'react'
import MovieCard, { MovieCardData } from './MovieCard'

const List = styled.div``

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
  position: relative;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
  }
`

const Line = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -6px;
  width: 12px;
  background: #ffe400;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    left: 24px;
  }
`

const Spacer = styled.div`
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: none;
  }
`
const MovieList: FC<{ list: MovieCardData[] }> = ({ list }) => {
  const renderItem = (v: MovieCardData, i: number, a: MovieCardData[]) => {
    const dayDiff = i &&
      dayjs.unix(a[i - 1].watchedAt).diff(dayjs.unix(v.watchedAt), 'day')

    const doms = [
      <MovieCard key="card" data={v} dayDiff={dayDiff} />,
      <Spacer key="spacer" />
    ]

    return (
      <Item key={v.id}>
        {v.isLeft ? doms : doms.reverse()}
        <Line />
      </Item>
    )
  }

  return <List>{list.map(renderItem)}</List>
}

export default MovieList
