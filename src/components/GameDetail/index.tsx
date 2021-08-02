import { GameConsoleMap, GenreMap } from '@/constants/game'
import { Game } from '@/pages/Games/models'
import dayjs from 'dayjs'
import { FC } from 'react'
import CircleInfo from './CircleInfo'
import InfoList from './InfoList'
import { Earned, Header, Rate, Subtitle, Title } from './style'

const GameDetail: FC<{ game: Game }> = ({ game }) => {
  const { trophies } = game

  const earned = trophies?.length
    ? Math.round(
        trophies.filter(v => v.earnedAt).length / trophies.length * 100
      )
    : 0

  const infos = [
    GameConsoleMap.get(game.gameConsole) || '',
    GenreMap.get(game.genre) || '',
    dayjs.unix(game.buyAt).format('YYYY-MM-DD')
  ]

  const companies = [...new Set([game.developer, game.publisher])]

  return (
    <div>
      <Header>
        <div>
          <Title>{game.title}</Title>
          <Subtitle>{game.subtitle}</Subtitle>
        </div>
        <CircleInfo
          title="Rate"
          percent={game.rate / 5 * 100}
          color="#e03800"
        >
          <Rate>{game.rate}</Rate>
        </CircleInfo>
        <CircleInfo
          title="Trophy"
          percent={earned}
          color="#075fff"
        >
          <Earned>{`${earned}%`}</Earned>
        </CircleInfo>
      </Header>
      <hr />
      <InfoList infos={infos} />
      <InfoList infos={companies} />
    </div>
  )
}

export default GameDetail
