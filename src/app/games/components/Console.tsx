import { CSSProperties, FC } from 'react'
import { GameConsole, GameConsoleColorMap, GameConsoleShortMap } from '@/app/games/constants'

const Console: FC<{ console: GameConsole }> = ({ console }) => {
  const color = GameConsoleColorMap.get(console)

  const styles: CSSProperties = {
    color,
    borderColor: color
  }

  return (
    <span className="game-card__console" style={styles}>
      {GameConsoleShortMap.get(console)}
    </span>
  )
}

export default Console
