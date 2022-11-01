import styled from '@emotion/styled'
import { FC } from 'react'
import { GameItem } from '@/app/games/models/game'
import Console from '@/app/games/components/Console'

const Title = styled.h3`
  margin: 0;
  text-align: center;
  font-size: 20px;
  font-weight: normal;
  color: rgba(229, 224, 216, 0.45);
`

const Caption = styled.h1`
  margin: 36px 0;
  padding: 0 24px;
  text-align: center;
  font-size: 48px;
`

const List = styled.ul`
  margin-bottom: -24px;
  padding: 0;
  list-style: none;
`

const Item = styled.li`
  display: grid;
  grid-template-columns: 20px auto 1fr auto;
  column-gap: 8px;
  align-items: center;
  margin-bottom: 24px;
`

const Order = styled.span`
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: #33404b;
  border-radius: 100%;
`

const ItemTitle = styled.p`
  margin: 0;
  line-height: 20px;
  font-size: 16px;
`

const Playtime: FC<{ totalPlayed: number; mostPlayed: GameItem[] }>  = ({ totalPlayed, mostPlayed }) => {
  return (
    <>
      <Title>Total Playtime</Title>
      <Caption>{totalPlayed} Hours</Caption>
      <List>
        {mostPlayed.map((v, i) => (
          <Item key={v.id}>
            <Order>{i + 1}</Order>
            <Console console={v.gameConsole} />
            <ItemTitle>{v.title}</ItemTitle>
            <span>{v.playtime}h</span>
          </Item>
        ))}
      </List>
    </>
  )
}

export default Playtime
