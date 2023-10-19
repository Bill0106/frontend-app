import bem from '@/utils/bem'
import request from '@/utils/request'
import useMessage from '@/utils/useMessage'
import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { Movie } from '../../models/movie'

type ActionType = 'pending' | 'fulfilled' | 'error'

interface State {
  movies: { [key: number]: Movie[] }
  isFetching: boolean
}

interface Action {
  type: ActionType
  payload?: State['movies']
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'pending':
      return { ...state, isFetching: true }
    case 'error':
      return { ...state, isFetching: false }
    case 'fulfilled':
      return { ...state, movies: { ...state.movies, ...(action.payload ?? {}) }, isFetching: false }
    default:
      throw new Error()
  }
}

const useViewData = () => {
  const { setMessage } = useMessage()
  const [{ movies, isFetching }, dispatch] = useReducer(reducer, { movies: {}, isFetching: false })
  const [years, setYears] = useState<number[]>([])
  const [year, setYear] = useState(0)
  const [isFetchingYears, setIsFetchingYears] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const handleYearChange = (v: number) => {
    if (!years.includes(v)) {
      return
    }
    if (contentRef.current) {
      contentRef.current.scroll({ top: 0, behavior: 'smooth' })
    }

    setYear(v)
  }

  const fetchYears = useCallback(async () => {
    setIsFetchingYears(true)
    try {
      const res = await request.get<{ years: number[] }>('movies/years')

      setYears(res.years)
      setYear(res.years[0])
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
      }
    } finally {
      setIsFetchingYears(false)
    }
  }, [setMessage])

  const fetch = useCallback(async () => {
    dispatch({ type: 'pending' })
    try {
      const res = await request.get<{ list: Movie[] }>(`movies?year=${year}`)

      dispatch({ type: 'fulfilled', payload: { [year]: res.list } })
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
      }
      dispatch({ type: 'error' })
    }
  }, [year, setMessage])

  useEffect(() => {
    fetchYears()
  }, [fetchYears])

  useEffect(() => {
    if (year && !movies[year]) {
      fetch()
    }
  }, [movies, year, fetch])

  return { classname: bem('movies'), list: movies[year] ?? [], years, year, contentRef, isFetching, isFetchingYears, handleYearChange }
}

export default useViewData
