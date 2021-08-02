import { Gourmet } from '@/pages/Gourmets/model'
import styled from '@emotion/styled'
import { faMapMarkerAlt, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { FC } from 'react'
import Image from './Image'

const Card = styled.div`
  background: #fff;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 8px;
  align-items: center;
  padding: 16px;
  > span {
    font-size: 16px;
  }
`

const Content = styled.div`
  padding: 16px;
`

const Title = styled.p`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: bold;
`

const EatAt = styled.span`
  color: #999;
`

const GourmetCard: FC<{ item: Gourmet }> = ({ item }) => (
  <Card>
    <Header>
      <FontAwesomeIcon icon={faMapMarkerAlt} color="#ccc" />
      <span>{item.restaurant}</span>
    </Header>
    <Image url={item.image} icon={faUtensils} />
    <Content>
      <Title>{item.food}</Title>
      <EatAt>{dayjs.unix(item.eatAt).format('YYYY-MM-DD')}</EatAt>
    </Content>
  </Card>
)

export default GourmetCard
