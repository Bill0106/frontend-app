import styled from '@emotion/styled'
import { GameItem } from '../models/game'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import Image from '@/components/Image'
import { useNavigate } from 'react-router-dom'

const Card = styled.div`
  position: relative;
  padding-bottom: 80px;
  cursor: pointer;
`

const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px;
  width: 100%;
  line-height: 20px;
  color: #fff;
  background: #161616;
  box-sizing: border-box;
  z-index: 1;
`

const Title = styled.p`
  margin: 0 0 12px;
  width: 100%;
  font-size: 18px;
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
  const navigate = useNavigate()

  const rates = Array(item.rate)
    .fill(null)
    .map((_, i) => <FontAwesomeIcon key={i} icon={faGamepad} />)

  const handleClick = () => {
    navigate(`/games/${item.id}`)
  }

  return (
    <Card onClick={handleClick}>
      <Image url={item.cover} icon={faGamepad} />
      <Text>
        <Title>{item.title}</Title>
        <Rate>{rates}</Rate>
      </Text>
    </Card>
  )
}

export default GameCard
