import Image from '@/components/Image'
import styled from '@emotion/styled'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import { FC } from 'react'
import { TrophyRarityColors } from '../constants'
import { GameTrophy } from '../models/gameTrophy'

const Trophy = styled.div`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 12px;
  padding: 12px;
  color: #fff;
  background: #31353e;
  box-sizing: border-box;
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

  export default TrophyItem