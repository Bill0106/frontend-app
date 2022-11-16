import Loading from '@/components/Loading'
import Playtime from '@/app/games/components/Playtime'
import Rank from '@/app/games/components/Rank'
import Chart from '@/components/Chart'
import useViewData from '@/app/games/pages/Stats/useViewData'
import { Link } from 'react-router-dom'

const Stats = () => {
  const { stats, pies, yearsOptions, trophyOptions, isFetching, classname: { block, element } } = useViewData()

  if (isFetching) {
    return <Loading />
  }

  if (!stats) {
    return (
      <div {...element('all').class}>
        <Link {...element('link').class} to='/games/all'>All Games</Link>
      </div>
    )
  }

  return (
    <div {...block().class}>
      <div {...element('first-row').class}>
        <div {...element('card').class}>
          <Playtime totalPlayed={stats.totalPlayed} mostPlayed={stats.mostPlayed} />
        </div>
        <div {...element('card').class}>
          <Rank title="Recent Games" items={stats.recent} />
        </div>
      </div>
      <div {...element('second-row').class}>
        {pies.map((v, i) => (
          <div key={i} {...element('card').class}>
            <Chart options={v} />
          </div>
        ))}
        <div {...element('card').class}>
          <Chart options={yearsOptions} />
        </div>
      </div>
      <div {...element('third-row').class}>
        <div {...element('card').class}>
          <Chart options={trophyOptions} />
        </div>
        <div {...element('card').class}>
          <Rank title="Platinum Games" items={stats.platinum} subtitle="buy_at" />
        </div>
      </div>
      <div {...element('all').class}>
        <Link {...element('link').class} to='/games/all'>All {stats.total} Games</Link>
      </div>
    </div>
  )
}

export default Stats
