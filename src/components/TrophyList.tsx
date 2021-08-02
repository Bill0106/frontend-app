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
  grid-gap: 12px;
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
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 12px;
  padding: 12px;
  background: #262626;
  box-sizing: border-box;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    margin-bottom: 16px;
  }
`

const TrophyImg = styled.div<{ earned: boolean; color: string }>`
  border: 4px solid ${props => props.color};
  opacity: ${p => p.earned ? 1 : 0.5};
  box-sizing: border-box;
`

const TrophyText = styled.div`
  > p {
    margin: 0 0 4px;
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
  grid-column-start: 1;
  grid-column-end: span 2;
  height: 16px;
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
    <TrophyEarned>
      {item.earnedAt &&
        `Earned at: ${dayjs.unix(item.earnedAt).format('MMMM D, YYYY')}`
      }
    </TrophyEarned>
  </Trophy>
)

const TrophyList: FC<{ trophies: GameTrophy[] }> = ({ trophies }) => (
  <Trophies>{trophies.map(v => <TrophyItem key={v.id} item={v} />)}</Trophies>
)

export default TrophyList
