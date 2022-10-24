import useDocumentTitle from '@/utils/useDocumentTitle'
import { useCallback, useEffect, useState } from 'react'
import { GameStats } from '@/app/games/models/gameStats'
import request from '@/utils/request'
import useMessage from '@/utils/useMessage'
import Loading from '@/components/Loading'
import styled from '@emotion/styled'
import Playtime from '@/app/games/components/Playtime'
import Recent from '@/app/games/components/Recent'
import Pie from '@/app/games/components/Pie'
import Bar from '@/app/games/components/Bar'

const Container = styled.div`
  display: grid;
  row-gap: 16px;
  max-width: 2240px;
`

const FirstRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 16px;
`

const Card = styled.div`
  padding: 16px;
  color: rgba(229, 224, 216, 0.85);
  border-radius: 4px;
  background: #242525;
`

const SecondRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr) 2fr;
  column-gap: 16px;
`

const ThirdRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  column-gap: 16px;
`

const List = () => {
  const { setTitle } = useDocumentTitle()
  const { setMessage } = useMessage()

  const [stats, setStats] = useState<GameStats | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const pies = [
    { title: 'Consoles', data: stats?.consoles ?? [] },
    { title: 'Genres', data: stats?.genres ?? [] },
    { title: 'Rates', data: stats?.rates ?? [] }
  ]

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
      <SecondRow>
        {pies.map(v => (
          <Card key={v.title}>
            <Pie {...v} />
          </Card>
        ))}
        <Card>
          <Bar years={stats.years} />
        </Card>
      </SecondRow>
      <ThirdRow>
      </ThirdRow>
    </Container>
  )
}

export default List
