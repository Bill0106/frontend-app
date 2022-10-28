import { GameItem } from '@/app/games/models/game'
import { FC } from 'react'
import styled from '@emotion/styled'
import Console from '@/app/games/components/Console'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Rates from '@/app/games/components/Rates'
import Image from '@/components/Image'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import dayjs from 'dayjs'

const Title = styled.h3`
  margin: 0 0 40px;
  font-size: 18px;
  font-weight: normal;
  color: rgba(229, 224, 216, 0.45);
`

const Item = styled.div`
  text-align: center;
`

const List = styled.div<{ count: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.count}, 1fr);
  @media (max-width: 1488px) {
    grid-template-columns: repeat(${p => p.count - 1}, 1fr);
    > ${Item}:last-child {
      display: none;
    }
  }
  @media (max-width: 1112px) {
    grid-template-columns: repeat(3, 1fr);
    > ${Item}:nth-of-type(n+4) {
      display: none;
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    > ${Item}:nth-of-type(n+2) {
      display: none;
    }
  }
`

const Cover = styled.div`
  margin: 0 auto 24px;
  width: 160px;
  height: 160px;
  border-radius: 100%;
  overflow: hidden;
  > img {
    width: 100%;
  }
`

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`

const Name = styled.h2`
  margin: 0 0 0 12px;
  font-size: 18px;
`


const Time = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0 0;
  font-size: 14px;
  > span {
    margin-left: 8px;
  }
`

const Date = styled.p`
  font-size: 16px;
`

const GameList: FC<{ title: string; items: GameItem[]; subtitle?: 'playtime' | 'buy_at' }> = ({ title, items, subtitle = 'playtime' }) => {
  return (
    <>
      <Title>{title}</Title>
      <List count={items.length}>
        {items.map(v => {
          return (
            <Item key={v.id}>
              <Cover>
                <Image url={v.cover} icon={faGamepad} />
              </Cover>
              <Text>
                <Console console={v.gameConsole} />
                <Name>{v.title}</Name>
              </Text>
              <Rates rate={v.rate} align="center" size="lg" />
              {subtitle === 'playtime' && (
                <Time>
                  <FontAwesomeIcon icon={faClock}/>
                  <span>{v.playtime}h</span>
                </Time>
              )}
              {subtitle === 'buy_at' && (
                <Date>{dayjs.unix(v.buyAt).format('YYYY-MM-DD')}</Date>
              )}
            </Item>
          )
        })}
      </List>
    </>
  )
}

export default GameList
