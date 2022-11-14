import bem from '@/utils/bem'
import request from '@/utils/request'
import useMessage from '@/utils/useMessage'
import dayjs from 'dayjs'
import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { MovieCardData } from '../../components/MovieCard'
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
  const classname = bem('movies')
  const [years, setYears] = useState<number[]>([])
  const [year, setYear] = useState(0)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const [{ movies, isFetching }, dispatch] = useReducer(reducer, { movies: {}, isFetching: false })

  const { setMessage } = useMessage()

  const yearIndex = years.indexOf(year)
  const prevYear = yearIndex === 0 ? null : years[yearIndex - 1]
  const nextYear = yearIndex === years.length - 1 ? null : years[yearIndex + 1]

  const list = (movies[year] ?? [])
    .reduce<MovieCardData[]>((res, item, index) => {
      if (index === 0) {
        return [...res, { ...item, isLeft: true }]
      }

      const prev = res[res.length - 1]
      const isLeft = dayjs.unix(item.watchedAt).isSame(prev.watchedAt, 'month')
        ? prev.isLeft
        : !prev.isLeft

      return [...res, { ...item, isLeft }]
    }, [])

  const changeYear = (v: number) => {
    if (contentRef.current) {
      contentRef.current.scroll({ top: 0, behavior: 'smooth' })
    }

    setYear(v)
  }

  const handlePrev = () => {
    if (prevYear) {
      changeYear(prevYear)
    }
  }

  const handleNext = () => {
    if (nextYear) {
      changeYear(nextYear)
    }
  }

  const fetchYears = useCallback(async () => {
    try {
      const res = await request.get<{ years: number[] }>('movies/years')

      setYears(res.years)
      setYear(res.years[0])
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
      }
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
    if (year) {
      fetch()
    }
  }, [year, fetch])

  return { classname, list, year, contentRef, prevYear, nextYear, isFetching, handlePrev, handleNext }
}

export default useViewData