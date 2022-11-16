import Image from '@/components/Image'
import bem from '@/utils/bem'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import { FC } from 'react'
import { TrophyRarityColors } from '../constants'
import { GameTrophy } from '../models/gameTrophy'

const TrophyItem: FC<{ item: GameTrophy }> = ({ item }) => {
  const { class: classname, sub } = bem('game-trophy').element('item')

  return (
    <div {...classname}>
      <div
        {...sub('img').modifiers({ earned: Boolean(item.earnedAt) })}
        style={{ borderColor: TrophyRarityColors.get(item.rarity) }}
      >
        <Image url={item.image} iconSize={24} icon={faTrophy} />
      </div>
      <div>
        <p {...sub('title').class}>{item.title}</p>
        <span {...sub('desc').class}>{item.description}</span>
      </div>
      <div {...sub('earned').class}>
        {item.earnedAt &&
            `Earned at: ${dayjs.unix(item.earnedAt).format('MMMM D, YYYY')}`
        }
      </div>
    </div>
  )
}

export default TrophyItem