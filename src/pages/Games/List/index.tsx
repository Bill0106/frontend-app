import GameCard from '@/components/GameCard'
import InfiniteScroll from '@/components/InfiniteScroll'
import MEDIA_QUERIES from '@/constants/mediaQueries'
import useList from '@/utils/useList'
import styled from '@emotion/styled'
import { GameItem } from '../game'

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
  const { list, infiniteScrollProps } = useList<GameItem>('games')

  return (
    <InfiniteScroll {...infiniteScrollProps}>
      <Container>
        {list.map(v => <GameCard key={v.id} item={v} />)}
      </Container>
    </InfiniteScroll>
  )
}

export default List
