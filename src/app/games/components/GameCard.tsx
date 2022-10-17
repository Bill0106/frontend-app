import styled from '@emotion/styled'
import { GameItem } from '../models/game'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import Image from '@/components/Image'
import { Link } from 'react-router-dom'
import { GameConsole, GameConsoleColorMap, GameConsoleShortMap } from '@/app/games/constants'

const Card = styled(Link)`
  display: block;
  position: relative;
  padding-bottom: 80px;
`

const Cover = styled.div`
  position: relative;
`

const Time = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 8px;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 4px 8px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
`

const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px 8px;
  width: 100%;
  line-height: 20px;
  color: #fff;
  background: #161616;
  box-sizing: border-box;
  z-index: 1;
`

const Above = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 4px;
  align-items: center;
  margin-bottom: 12px;
`

const Label = styled.span<{ color: string }>`
  padding: 0 4px;
  line-height: 12px;
  font-size: 10px;
  font-weight: bolder;
  color: ${p => p.color};
  border: 1px solid ${p => p.color};
  border-radius: 4px;
`

const Title = styled.p`
  margin: 0;
  line-height: 18px;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Rate = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-column-gap: 8px;
  justify-content: left;
  height: 16px;
  font-size: 16px;
`

const GameCard: FC<{ item: GameItem }> = ({ item }) => {
  const rates = Array(item.rate)
    .fill(null)
    .map((_, i) => <FontAwesomeIcon key={i} size="sm" icon={faGamepad} />)

  const Tag = [GameConsole.XboxSeriesX, GameConsole.NintendoSwitch].includes(item.gameConsole)
    ? Card.withComponent('div')
    : Card

  return (
    <Tag to={`/games/${item.id}`}>
      <Cover>
        <Image url={item.cover} icon={faGamepad} />
        {item.playtime !== 0 && (
          <Time>
            <FontAwesomeIcon icon={faClock}/>
            <span>{item.playtime}h</span>
          </Time>
        )}
      </Cover>
      <Text>
        <Above>
          <Label color={GameConsoleColorMap.get(item.gameConsole) ?? ''}>
            {GameConsoleShortMap.get(item.gameConsole)}
          </Label>
          <Title>{item.title}</Title>
        </Above>
        <Rate>{rates}</Rate>
      </Text>
    </Tag>
  )
}

export default GameCard
