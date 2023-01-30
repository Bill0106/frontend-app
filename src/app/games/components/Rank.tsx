import { GameItem } from '@/app/games/models/game'
import { FC } from 'react'
import Console from '@/app/games/components/Console'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Rates from '@/app/games/components/Rates'
import Image from '@/components/Image'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import dayjs from 'dayjs'
import bem from '@/utils/bem'

const Rank: FC<{ title: string; items: GameItem[]; subtitle?: 'playtime' | 'buy_at' }> = ({ title, items, subtitle = 'playtime' }) => {
  const { sub } = bem('games').element('rank')

  return (
    <>
      <h3 {...sub('title').class}>{title}</h3>
      <div {...sub('list').class}>
        {items.map(v => {
          return (
            <div key={v.id} {...sub('item').class}>
              <div {...sub('cover').class}>
                <Image url={v.cover} icon={faGamepad} />
              </div>
              <div {...sub('text').class}>
                <Console console={v.gameConsole} />
                <h2 {...sub('name').class}>{v.title}</h2>
              </div>
              <Rates rate={v.rate} align="center" size="lg" />
              {subtitle === 'playtime' && (
                <div {...sub('time').class}>
                  <FontAwesomeIcon icon={faClock}/>
                  <span>{v.playtime}h</span>
                </div>
              )}
              {subtitle === 'buy_at' && (
                <p {...sub('date').class}>{dayjs.unix(v.buyAt).format('YYYY-MM-DD')}</p>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Rank
