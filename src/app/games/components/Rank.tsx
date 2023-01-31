import { FC, useState } from 'react'
import bem from '@/utils/bem'
import RankItem from '@/app/games/components/RankItem'
import { GameStats } from '@/app/games/models/gameStats'

enum ItemType {
  Playing,
  MostPlayed,
  Platinum
}

const itemTypes = new Map([
  [ItemType.Playing, 'Playing'],
  [ItemType.MostPlayed, 'Most Played'],
  [ItemType.Platinum, 'Platinum Games']
])

const Rank: FC<Pick<GameStats, 'platinum' | 'recent' | 'mostPlayed'>> = ({ platinum, recent, mostPlayed }) => {
  const { class: classname, sub } = bem('games').element('rank')
  const [itemType, setItemType] = useState(ItemType.Playing)

  const items = itemType === ItemType.Platinum
    ? platinum
    : itemType === ItemType.MostPlayed
      ? mostPlayed
      : recent

  const handleItemType = (val: ItemType) => {
    setItemType(val)
  }

  return (
    <div {...classname}>
      <div {...sub('list').class}>
        {items.map(v => <RankItem key={v.id} item={v} />)}
      </div>
      <div {...sub('buttons').class}>
        {[...itemTypes.keys()].map(v => (
          <button {...sub('button').modifiers({ active: itemType == v })} key={v} onClick={() => handleItemType(v)}>{itemTypes.get(v)}</button>
        ))}
      </div>
    </div>
  )
}

export default Rank
