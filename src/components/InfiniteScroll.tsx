import { FC, useCallback, useEffect, useRef } from 'react'
import Loading from './Loading'

export interface InfiniteScrollProps {
  isBusy: boolean
  hasMore: boolean
  onLoadMore: () => void
}

const InfiniteScroll: FC<InfiniteScrollProps> = ({
  children,
  isBusy,
  hasMore,
  onLoadMore
}) => {
  const container = useRef<HTMLDivElement | null>(null)

  const handleScroll = useCallback(() => {
    if (!container.current) {
      return false
    }

    const { top } = container.current.getBoundingClientRect()
    if (top - window.innerHeight < 100 && !isBusy) {
      onLoadMore()
    }
  }, [isBusy, onLoadMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div>
      {children}
      {hasMore && (
        <div ref={container}>
          <Loading />
        </div>
      )}
    </div>
  )
}

export default InfiniteScroll
