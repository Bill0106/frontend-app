import request from '@/utils/request'
import useMessage from '@/utils/useMessage'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { MovieCardData } from '../../components/MovieCard'
import { Movie } from '../../models/movie'

const useViewData = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [years, setYears] = useState<number[]>([])
  const [year, setYear] = useState(0)
  const [isFetching, setIsFetching] = useState(false)

  const { setMessage } = useMessage()

  const list = movies
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
    setYear(v)
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
    setIsFetching(true)
    try {
      const res = await request.get<{ list: Movie[] }>(`movies?year=${year}`)

      setMovies(res.list)
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
      }
    } finally {
      setIsFetching(false)
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

  return { list, year, isFetching, changeYear }
}

export default useViewData