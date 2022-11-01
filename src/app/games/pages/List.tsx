import GameCard from '../components/GameCard'
import InfiniteScroll from '@/components/InfiniteScroll'
import useDocumentTitle from '@/utils/useDocumentTitle'
import useList from '@/utils/useList'
import { useEffect, useState } from 'react'
import { GameItem } from '../models/game'
import ListContainer from '@/components/ListContainer'
import TrophyList from '../components/TrophyList'

const List = () => {
  const { setTitle } = useDocumentTitle()
  const { list, infiniteScrollProps } = useList<GameItem>('games')

  const [gameId, setGameId] = useState(0)
  const [visible, setVisible] = useState(false)

  const handleTrophy = (id: number) => {
    setGameId(id)
    setVisible(true)

    document.body.style.overflow = 'hidden'
  }

  const handleTrophyHide = () => {
    setVisible(false)

    document.body.style.overflow = ''
  }

  useEffect(() => {
    setTitle('All Games')
  }, [setTitle])

  return (
    <>
      <InfiniteScroll {...infiniteScrollProps}>
        <ListContainer>
          {list.map(v => <GameCard key={v.id} item={v} onTrophyClick={handleTrophy} />)}
        </ListContainer>
      </InfiniteScroll>
      <TrophyList id={gameId} visible={visible} onHide={handleTrophyHide} />
    </>
  )
}

export default List
