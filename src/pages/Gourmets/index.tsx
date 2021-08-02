import GourmetCard from '@/components/GourmetCard'
import InfiniteScroll from '@/components/InfiniteScroll'
import MEDIA_QUERIES from '@/constants/mediaQueries'
import useDocumentTitle from '@/utils/useDocumentTitle'
import useList from '@/utils/useList'
import styled from '@emotion/styled'
import { useEffect } from 'react'
import { Gourmet } from './model'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    grid-template-columns: minmax(0, 360px);
    justify-content: center;
  }
`

const Gourmets = () => {
  const { setTitle } = useDocumentTitle()
  const { list, infiniteScrollProps } = useList<Gourmet>('gourmets')

  useEffect(() => {
    setTitle('Gourmets')
  }, [setTitle])

  console.log(list)

  return (
    <InfiniteScroll {...infiniteScrollProps}>
      <Container>
        {list.map(v => <GourmetCard key={v.id} item={v} />)}
      </Container>
    </InfiniteScroll>
  )
}

export default Gourmets
