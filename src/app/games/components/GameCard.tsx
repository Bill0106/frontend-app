import { GameItem } from '../models/game'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import Image from '@/components/Image'
import Rates from './Rates'
import Console from './Console'
import classnames from '@/utils/classnames'

const GameCard: FC<{ item: GameItem; onTrophyClick: (id: number) => void }> = ({ item, onTrophyClick }) => {
  const classname = classnames('game-card')

  const handleClick = () => {
    onTrophyClick(item.id)
  }

  return (
    <div {...classname()}>
      <div {...classname('cover')}>
        <Image url={item.cover} icon={faGamepad} />
        {item.playtime !== 0 && (
          <div {...classname('time')}>
            <FontAwesomeIcon icon={faClock}/>
            <span>{item.playtime}h</span>
          </div>
        )}
        {item.hasTrophy && (
          <button {...classname('trophy')} onClick={handleClick}>
            <FontAwesomeIcon icon={faTrophy} />
          </button>
        )}
      </div>
      <div {...classname('text')}>
        <div {...classname('above')}>
          <Console console={item.gameConsole} />
          <p {...classname('title')}>{item.title}</p>
        </div>
        <Rates rate={item.rate} />
      </div>
    </div>
  )
}

export default GameCard
