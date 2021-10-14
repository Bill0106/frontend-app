import GameCard from '../components/GameCard'
import InfiniteScroll from '@/components/InfiniteScroll'
import MEDIA_QUERIES from '@/constants/mediaQueries'
import useDocumentTitle from '@/utils/useDocumentTitle'
import useList from '@/utils/useList'
import styled from '@emotion/styled'
import { useEffect } from 'react'
import { GameItem } from '../models/game'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  @media (max-width: ${MEDIA_QUERIES.TABLET_MAX}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    grid-template-columns: 270px;
    justify-content: center;
  }
`

const List = () => {
  const { setTitle } = useDocumentTitle()
  const { list, infiniteScrollProps } = useList<GameItem>('games')

  useEffect(() => {
    setTitle('Games')
  }, [setTitle])

  return (
    <InfiniteScroll {...infiniteScrollProps}>
      <Container>
        {list.map(v => <GameCard key={v.id} item={v} />)}
      </Container>
    </InfiniteScroll>
  )
}

export default List
