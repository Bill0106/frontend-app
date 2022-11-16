import GourmetCard from '../components/GourmetCard'
import InfiniteScroll from '@/components/InfiniteScroll'
import useDocumentTitle from '@/utils/useDocumentTitle'
import useList from '@/utils/useList'
import { useEffect } from 'react'
import { Gourmet } from '../models/gourmet'

const Gourmets = () => {
  const { setTitle } = useDocumentTitle()
  const { list, infiniteScrollProps } = useList<Gourmet>('gourmets')

  useEffect(() => {
    setTitle('Gourmets')
  }, [setTitle])

  return (
    <InfiniteScroll {...infiniteScrollProps}>
      <div className="gourmets">
        {list.map(v => <GourmetCard key={v.id} item={v} />)}
      </div>
    </InfiniteScroll>
  )
}

export default Gourmets
