import GourmetCard from '../components/GourmetCard'
import InfiniteScroll from '@/components/InfiniteScroll'
import useDocumentTitle from '@/utils/useDocumentTitle'
import useList from '@/utils/useList'
import { useEffect } from 'react'
import { Gourmet } from '../models/gourmet'
import ListContainer from '@/components/ListContainer'

const Gourmets = () => {
  const { setTitle } = useDocumentTitle()
  const { list, infiniteScrollProps } = useList<Gourmet>('gourmets')

  useEffect(() => {
    setTitle('Gourmets')
  }, [setTitle])

  return (
    <InfiniteScroll {...infiniteScrollProps}>
      <ListContainer>
        {list.map(v => <GourmetCard key={v.id} item={v} />)}
      </ListContainer>
    </InfiniteScroll>
  )
}

export default Gourmets
