import { FC } from 'react'
import { GameItem } from '@/app/games/models/game'
import Image from '@/components/Image'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import Console from '@/app/games/components/Console'
import Rates from '@/app/games/components/Rates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import bem from '@/utils/bem'

const RankItem: FC<{ item: GameItem }> = ({ item }) => {
  const { block, element } = bem('games-rank-item')

  return (
    <div {...block().class}>
      <div {...element('cover').class}>
        <Image url={item.cover} icon={faGamepad} />
      </div>
      <div {...element('text').class}>
        <Console console={item.gameConsole} />
        <h2 {...element('name').class}>{item.title}</h2>
      </div>
      <Rates rate={item.rate} align="center" size="lg" />
      {item.playtime > 0 && (
        <div {...element('time').class}>
          <FontAwesomeIcon icon={faClock}/>
          {<span>{item.playtime}h</span>}
        </div>
      )}
    </div>
  )
}

export default RankItem
