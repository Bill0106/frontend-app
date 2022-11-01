import styled from '@emotion/styled'
import { GameItem } from '../models/game'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import Image from '@/components/Image'
import Rates from '@/app/games/components/Rates'
import Console from './Console'

const Card = styled.div`
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

const Title = styled.p`
  margin: 0;
  line-height: 18px;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Trophy = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`

const GameCard: FC<{ item: GameItem; onTrophyClick: (id: number) => void }> = ({ item, onTrophyClick }) => {
  const handleClick = () => {
    onTrophyClick(item.id)
  }

  return (
    <Card>
      <Cover>
        <Image url={item.cover} icon={faGamepad} />
        {item.playtime !== 0 && (
          <Time>
            <FontAwesomeIcon icon={faClock}/>
            <span>{item.playtime}h</span>
          </Time>
        )}
        {item.hasTrophy && (
          <Trophy onClick={handleClick}>
            <FontAwesomeIcon icon={faTrophy} />
          </Trophy>
        )}
      </Cover>
      <Text>
        <Above>
          <Console console={item.gameConsole} />
          <Title>{item.title}</Title>
        </Above>
        <Rates rate={item.rate} />
      </Text>
    </Card>
  )
}

export default GameCard
