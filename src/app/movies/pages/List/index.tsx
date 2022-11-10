import MovieCard, { MovieCardData } from '../../components/MovieCard'
import MEDIA_QUERIES from '@/constants/mediaQueries'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import useViewData from './useViewData'

const Container = styled.div`
  position: relative;
  height: calc(100vh - 80px);
`

const Year = styled.p`
  font-size: 24px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: bolder;
  color: #ffe400;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    font-size: 28px;
    text-align: center;
  }
`

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

const Movies = () => {
  const { year } = useViewData()

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

  return (
    <Container>
      <Year>{year}</Year>
    </Container>
  )
}

export default Movies
