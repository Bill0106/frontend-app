import { TrophyRarityColors } from '@/constants/game'
import MEDIA_QUERIES from '@/constants/mediaQueries'
import { GameTrophy } from '@/pages/Games/models'
import styled from '@emotion/styled'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import { FC } from 'react'
import Image from './Image'

const Trophies = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-column-start: 1;
  grid-column-end: span 2;
  @media (max-width: ${MEDIA_QUERIES.TABLET_MAX}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
    margin: 20px 0;
  }
`

const Trophy = styled.div`
  padding: 10px;
  background: #262626;
  box-sizing: border-box;
  &:after {
    display: block;
    content: '';
    clear: both;
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    margin-bottom: 10px;
  }
`

const TrophyImg = styled.div<{ earned: boolean; color: string }>`
  float: left;
  width: 66px;
  border: 5px solid ${props => props.color};
  opacity: ${props => (props.earned ? 1 : 0.5)};
  box-sizing: border-box;
`

const TrophyText = styled.div`
  margin-left: 80px;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    width: 260px;
  }
  @media (min-width: ${MEDIA_QUERIES.LAPTOP}) {
    width: 215px;
  }
  > p {
    margin: 0 0 5px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  > span {
    display: block;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
  }
`

const TrophyEarned = styled.div`
  margin-top: 15px;
  font-weight: bold;
  color: #61bf19;
`

const TrophyItem: FC<{ item: GameTrophy }> = ({ item }) => (
  <Trophy>
    <TrophyImg
      color={TrophyRarityColors.get(item.rarity) || ''}
      earned={Boolean(item.earnedAt)}
    >
      <Image url={item.image} iconSize={24} icon={faTrophy} />
    </TrophyImg>
    <TrophyText>
      <p>{item.title}</p>
      <span>{item.description}</span>
    </TrophyText>
    {item.earnedAt && (
      <TrophyEarned>
        Earned at: {dayjs.unix(item.earnedAt).format('MMMM D, YYYY')}
      </TrophyEarned>
    )}
  </Trophy>
)

const TrophyList: FC<{ trophies: GameTrophy[] }> = ({ trophies }) => (
  <Trophies>{trophies.map(v => <TrophyItem key={v.id} item={v} />)}</Trophies>
)

export default TrophyList
