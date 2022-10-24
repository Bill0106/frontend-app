import Loading from '@/components/Loading'
import styled from '@emotion/styled'
import Playtime from '@/app/games/components/Playtime'
import Recent from '@/app/games/components/Recent'
import Chart from '@/components/Chart'
import useStatsData from '@/app/games/pages/useStatsData'

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
  grid-template-columns: 1fr 3fr;
  column-gap: 16px;
`

const Stats = () => {
  const { stats, pies, yearsOptions, trophyOptions, isFetching } = useStatsData()

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
      </ThirdRow>
    </Container>
  )
}

export default Stats
