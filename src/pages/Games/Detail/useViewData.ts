import request from '@/utils/request'
import useDocumentTitle from '@/utils/useDocumentTitle'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Game } from '../models'

const useViewData = () => {
  const { id } = useParams<{ id: string }>()
  const { setTitle } = useDocumentTitle()
  const [game, setGame] = useState<Game | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const fetch = useCallback(async () => {
    setIsFetching(true)
    try {
      const res = await request.get<Game>(`/games/${id}`)

      setGame(res)
    } catch (error) {
      //
    } finally {
      setIsFetching(false)
    }
  }, [id])

  useEffect(() => {
    if (game) {
      setTitle([game.subtitle, 'Games'])
    }
  }, [game, setTitle])

  useEffect(() => {
    const gameId = parseInt(id)
    if (!isNaN(gameId)) {
      fetch()
    }
  }, [id, fetch])

  return { game, isFetching }
}

export default useViewData
