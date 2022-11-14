import { FC } from 'react'
import { GameItem } from '@/app/games/models/game'
import Console from '@/app/games/components/Console'
import bem from '@/utils/bem'

const Playtime: FC<{ totalPlayed: number; mostPlayed: GameItem[] }>  = ({ totalPlayed, mostPlayed }) => {
  const { sub } = bem('games').element('playtime')

  return (
    <>
      <h3 {...sub('title').class}>Total Playtime</h3>
      <h1 {...sub('caption').class}>{totalPlayed} Hours</h1>
      <ul {...sub('list').class}>
        {mostPlayed.map((v, i) => (
          <li key={v.id} {...sub('item').class}>
            <span {...sub('order').class}>{i + 1}</span>
            <Console console={v.gameConsole} />
            <p {...sub('order-title').class}>{v.title}</p>
            <span>{v.playtime}h</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Playtime
