import Loading from '@/components/Loading'
import Summary from '@/app/games/components/Summary'
import Rank from '@/app/games/components/Rank'
import Chart from '@/components/Chart'
import useViewData from '@/app/games/pages/Stats/useViewData'
import IndexCard from '@/app/games/components/IndexCard'
import All from '@/app/games/components/All'

const Stats = () => {
  const { stats, pies, yearsOptions, isFetching, classname: { block, element } } = useViewData()

  if (isFetching) {
    return <Loading />
  }

  if (!stats) {
    return <All />
  }

  return (
    <div {...block().class}>
      <div {...element('header').class}>
        <IndexCard>
          <Summary totalPlayed={stats.totalPlayed} totalTrophies={stats.totalTrophies} earnedTrophies={stats.earnedTrophies} />
        </IndexCard>
        <IndexCard>
          <Rank mostPlayed={stats.mostPlayed} platinum={stats.platinum} recent={stats.recent} />
        </IndexCard>
      </div>
      <section {...element('pies').class}>
        {pies.map((v, i) => (
          <IndexCard key={i}>
            <Chart options={v} />
          </IndexCard>
        ))}
      </section>
      <IndexCard>
        <Chart options={yearsOptions} />
      </IndexCard>
      <All total={stats.total} />
    </div>
  )
}

export default Stats
