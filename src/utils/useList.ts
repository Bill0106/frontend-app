import { InfiniteScrollProps } from '@/components/InfiniteScroll'
import { useCallback, useEffect, useReducer, useState } from 'react'
import request from './request'
import useMessage from './useMessage'

interface ListResponse<T> {
  list: T[]
  total: number
}

type ListState<T> = ListResponse<T> & { isFetching: boolean }

type ListActionType = 'pending' | 'fulfilled' | 'error'

interface ListAction<T> {
  type: ListActionType
  payload?: ListResponse<T>
}

const PAGE_SIZE = 24

const listReducer = <T>() => (state: ListState<T>, action: ListAction<T>) => {
  const reducers = new Map<ListActionType, () => ListState<T>>([
    ['pending', () => ({ ...state, isFetching: true })],
    [
      'fulfilled',
      () => ({
        ...state,
        ...(action.payload
          ? {
              list: [...state.list, ...action.payload.list],
              total: action.payload.total
            }
          : {}),
        isFetching: false
      })
    ],
    ['error', () => ({ ...state, isFetching: false })]
  ])

  const reduce = reducers.get(action.type)

  return reduce ? reduce() : state
}

const useList = <T>(path: string, pageSize = PAGE_SIZE) => {
  const { setMessage } = useMessage()
  const [{ list, total, isFetching }, dispatch] = useReducer(listReducer<T>(), {
    list: [],
    total: 0,
    isFetching: false
  })
  const [page, setPage] = useState(1)
  const maxPage = Math.ceil(total / pageSize)

  const fetch = useCallback(async () => {
    dispatch({ type: 'pending' })
    try {
      const res = await request.get<ListResponse<T>>(path, { page, pageSize })

      dispatch({ type: 'fulfilled', payload: res })
    } catch (error) {
      setMessage((error as Error).message)
      dispatch({ type: 'error' })
    }
  }, [setMessage, path, page, pageSize])

  const handleLoadMore = useCallback(() => {
    if (maxPage && maxPage === page) {
      return false
    }

    setPage(page + 1)
  }, [maxPage, page])

  useEffect(() => {
    fetch()
  }, [fetch])

  const infiniteScrollProps: InfiniteScrollProps = {
    hasMore: list.length === 0 || list.length < total,
    isBusy: isFetching,
    onLoadMore: handleLoadMore
  }

  return { list, infiniteScrollProps }
}

export default useList
