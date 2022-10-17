import useDocumentTitle from '@/utils/useDocumentTitle'
import { useCallback, useEffect, useState } from 'react'
import { GameStats } from '@/app/games/models/gameStats'
import request from '@/utils/request'
import useMessage from '@/utils/useMessage'
import Loading from '@/components/Loading'
import styled from '@emotion/styled'
import Playtime from '@/app/games/components/Playtime'
import Recent from '@/app/games/components/Recent'

const color = 'rgba(229, 224, 216, 0.85)'

const Container = styled.div`
  max-width: 2240px;
`

const FirstRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 16px;
`

const Card = styled.div`
  padding: 16px;
  color: ${color};
  border-radius: 4px;
  background: #242525;
`

const List = () => {
  const { setTitle } = useDocumentTitle()
  const { setMessage } = useMessage()

  const [stats, setStats] = useState<GameStats | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const fetch = useCallback(async () => {
    setIsFetching(true)
    try {
      const res = await request.get<GameStats>('game-stats')

      setStats(res)
    } catch (e) {
      setMessage((e as Error).message)
    } finally {
      setIsFetching(false)
    }
  }, [setMessage])

  useEffect(() => {
    setTitle('Games')
  }, [setTitle])

  useEffect(() => {
    fetch()
  }, [fetch])

  if (isFetching) {
    return <Loading />
  }

  if (!stats) {
    return null
  }

  return (
    <Container>
      <FirstRow>
        <Card>
          <Playtime totalPlayed={stats.totalPlayed} mostPlayed={stats.mostPlayed} />
        </Card>
        <Card>
          <Recent items={stats.recent} />
        </Card>
      </FirstRow>
    </Container>
  )
}

export default List
