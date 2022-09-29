import GameCard from '../components/GameCard'
import InfiniteScroll from '@/components/InfiniteScroll'
import useDocumentTitle from '@/utils/useDocumentTitle'
import useList from '@/utils/useList'
import { useEffect } from 'react'
import { GameItem } from '../models/game'
import ListContainer from '@/components/ListContainer'

const List = () => {
  const { setTitle } = useDocumentTitle()
  const { list, infiniteScrollProps } = useList<GameItem>('games')

  useEffect(() => {
    setTitle('Games')
  }, [setTitle])

  return (
    <InfiniteScroll {...infiniteScrollProps}>
      <ListContainer>
        {list.map(v => <GameCard key={v.id} item={v} />)}
      </ListContainer>
    </InfiniteScroll>
  )
}

export default List
