import styled from '@emotion/styled'
import MEDIA_QUERIES from '@/constants/mediaQueries'
import { GameItem } from '@/pages/Games/models'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import Image from './Image'
import { useHistory } from 'react-router-dom'

const Card = styled.div`
  position: relative;
  padding-bottom: 75px;
  cursor: pointer;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    padding-bottom: 74px;
  }
`

const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px;
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
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    line-height: 25px;
  }
`

const Rate = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-column-gap: 8px;
  justify-content: left;
  font-size: 16px;
`

const GameCard: FC<{ item: GameItem }> = ({ item }) => {
  const history = useHistory()

  const rates = Array(item.rate)
    .fill(null)
    .map((_, i) => <FontAwesomeIcon key={i} icon={faGamepad} />)

  const handleClick = () => {
    history.push(`/games/${item.id}`)
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
