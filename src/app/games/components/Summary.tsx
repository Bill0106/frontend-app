import { FC } from 'react'
import bem from '@/utils/bem'
import { GameStats } from '@/app/games/models/gameStats'

const Summary: FC<Pick<GameStats, 'totalPlayed' | 'earnedTrophies' | 'totalTrophies'>>  = ({ totalPlayed, totalTrophies, earnedTrophies }) => {
  const summary = bem('games').element('summary')
  const per = `${Math.round(earnedTrophies / totalTrophies * 100)}%`

  return (
    <div {...summary.class}>
      <div>
        <h3 {...summary.sub('title').class}>Total Playtime</h3>
        <p {...summary.sub('caption').class}>{totalPlayed} Hours</p>
      </div>
      <span {...summary.sub('divider').class} />
      <div>
        <div {...summary.sub('bar').class}>
          <span {...summary.sub('progress').class} style={{ width: per }} />
        </div>
        <p {...summary.sub('caption').class}>{per}</p>
        <h3 {...summary.sub('title').modifiers({ bottom: true })}>Trophy Earned</h3>
      </div>
    </div>
  )
}

export default Summary
