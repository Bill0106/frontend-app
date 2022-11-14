import { GameItem } from '../models/game'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import Image from '@/components/Image'
import Rates from './Rates'
import Console from './Console'
import bem from '@/utils/bem'

const GameCard: FC<{ item: GameItem; onTrophyClick: (id: number) => void }> = ({ item, onTrophyClick }) => {
  const { block, element } = bem('game-card')

  const handleClick = () => {
    onTrophyClick(item.id)
  }

  return (
    <div {...block().class}>
      <div {...element('cover').class}>
        <Image url={item.cover} icon={faGamepad} />
        {item.playtime !== 0 && (
          <div {...element('time').class}>
            <FontAwesomeIcon icon={faClock}/>
            <span>{item.playtime}h</span>
          </div>
        )}
        {item.hasTrophy && (
          <button {...element('trophy').class} onClick={handleClick}>
            <FontAwesomeIcon icon={faTrophy} />
          </button>
        )}
      </div>
      <div {...element('text').class}>
        <div {...element('above').class}>
          <Console console={item.gameConsole} />
          <p {...element('title').class}>{item.title}</p>
        </div>
        <Rates rate={item.rate} />
      </div>
    </div>
  )
}

export default GameCard
