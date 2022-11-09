import { FC, ReactNode, useCallback, useEffect, useRef } from 'react'
import Loading from './Loading'

export interface InfiniteScrollProps {
  isBusy: boolean
  hasMore: boolean
  disabled?: boolean
  children?: ReactNode
  onLoadMore: () => void
}

const InfiniteScroll: FC<InfiniteScrollProps> = ({
  children,
  disabled,
  isBusy,
  hasMore,
  onLoadMore
}) => {
  const container = useRef<HTMLDivElement | null>(null)

  const handleScroll = useCallback(() => {
    if (!container.current || disabled) {
      return false
    }

    const { top } = container.current.getBoundingClientRect()
    if (top - window.innerHeight < 100 && !isBusy) {
      onLoadMore()
    }
  }, [disabled, isBusy, onLoadMore])

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
