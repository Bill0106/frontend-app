import InfiniteScroll from '@/components/InfiniteScroll'
import MovieCard, { MovieCardData } from '@/components/MovieCard'
import MEDIA_QUERIES from '@/constants/mediaQueries'
import useList from '@/utils/useList'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { Movie } from './model'

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
  margin-left: -4px;
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
  const { list, infiniteScrollProps } = useList<Movie>('movies')

  const years = [...new Set(list.map(v => dayjs.unix(v.watchedAt).year()))]

  const movies = list
    .reduce<MovieCardData[]>((res, item, index) => {
      if (index === 0) {
        return [...res, { ...item, isLeft: true }]
      }

      const prev = res[res.length - 1]
      const isLeft = dayjs.unix(item.watchedAt).isSame(prev.watchedAt, 'month')
        ? prev.isLeft
        : !prev.isLeft

      return [...res, { ...item, isLeft }]
    }, [])
    .reduce<{ [k: number]: MovieCardData[] }>((res, item) => {
      const year = dayjs.unix(item.watchedAt).year()
      const items = res[year]

      return { ...res, [year]: items ? [...items, item] : [item] }
    }, {})

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

  const renderYear = (v: number) => (
    <div key={v}>
      <Year>{v}</Year>
      {movies[v].map(renderItem)}
    </div>
  )

  return (
    <InfiniteScroll {...infiniteScrollProps}>
      <div>{years.map(renderYear)}</div>
    </InfiniteScroll>
  )
}

export default Movies
