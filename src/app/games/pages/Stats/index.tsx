import Loading from '@/components/Loading'
import styled from '@emotion/styled'
import Playtime from '@/app/games/components/Playtime'
import GameList from '@/app/games/components/GameList'
import Chart from '@/components/Chart'
import useViewData from '@/app/games/pages/Stats/useViewData'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: grid;
  row-gap: 16px;
  max-width: 2240px;
`

const FirstRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 16px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    row-gap: 16px;
  }
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
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 16px;
  }
  @media (min-width: 768px) and (max-width: 1000px) {
    > ${Card}:last-child {
      grid-column-start: 1;
      grid-column-end: 4;
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ThirdRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 16px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    row-gap: 16px;
  }
`

const All = styled.div`
  text-align: center;
`

const To = styled(Link)`
  font-size: 20px;
  color: #fff;
`

const Index = () => {
  const { stats, pies, yearsOptions, trophyOptions, isFetching } = useViewData()

  if (isFetching) {
    return <Loading />
  }

  if (!stats) {
    return (
      <All>
        <To to='/games/all'>All Games</To>
      </All>
    )
  }

  return (
    <Container>
      <FirstRow>
        <Card>
          <Playtime totalPlayed={stats.totalPlayed} mostPlayed={stats.mostPlayed} />
        </Card>
        <Card>
          <GameList title="Recent Games" items={stats.recent} />
        </Card>
      </FirstRow>
      <SecondRow>
        {pies.map((v, i) => (
          <Card key={i}>
            <Chart options={v} />
          </Card>
        ))}
        <Card>
          <Chart options={yearsOptions} />
        </Card>
      </SecondRow>
      <ThirdRow>
        <Card>
          <Chart options={trophyOptions} />
        </Card>
        <Card>
          <GameList title="Platinum Games" items={stats.platinum} subtitle="buy_at" />
        </Card>
      </ThirdRow>
      <All>
        <To to='/games/all'>All {stats.total} Games</To>
      </All>
    </Container>
  )
}

export default Index
