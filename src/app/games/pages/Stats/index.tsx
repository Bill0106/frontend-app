import Loading from '@/components/Loading'
import Playtime from '@/app/games/components/Playtime'
import GameList from '@/app/games/components/GameList'
import Chart from '@/components/Chart'
import useViewData from '@/app/games/pages/Stats/useViewData'
import { Link } from 'react-router-dom'

const Stats = () => {
  const { stats, pies, yearsOptions, trophyOptions, isFetching, classname } = useViewData()

  if (isFetching) {
    return <Loading />
  }

  if (!stats) {
    return (
      <div {...classname('all')}>
        <Link {...classname('link')} to='/games/all'>All Games</Link>
      </div>
    )
  }

  return (
    <div {...classname()}>
      <div {...classname('first-row')}>
        <div {...classname('card')}>
          <Playtime totalPlayed={stats.totalPlayed} mostPlayed={stats.mostPlayed} />
        </div>
        <div {...classname('card')}>
          <GameList title="Recent Games" items={stats.recent} />
        </div>
      </div>
      <div {...classname('second-row')}>
        {pies.map((v, i) => (
          <div key={i} {...classname('card')}>
            <Chart options={v} />
          </div>
        ))}
        <div {...classname('card')}>
          <Chart options={yearsOptions} />
        </div>
      </div>
      <div {...classname('third-row')}>
        <div {...classname('card')}>
          <Chart options={trophyOptions} />
        </div>
        <div {...classname('card')}>
          <GameList title="Platinum Games" items={stats.platinum} subtitle="buy_at" />
        </div>
      </div>
      <div {...classname('all')}>
        <Link {...classname('link')} to='/games/all'>All {stats.total} Games</Link>
      </div>
    </div>
  )
}

export default Stats
