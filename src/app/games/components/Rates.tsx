import { CSSProperties, FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

const Rates: FC<{ rate: number; align?: 'center' | 'left'; size?: 'sm' | 'lg' }> = ({ rate, align = 'left', size = 'sm' }) => {
  const style: CSSProperties = {
    gridTemplateColumns: `repeat(${rate}, auto)`,
    justifyContent: align
  }
  const rates = Array(rate)
    .fill(null)
    .map((_, i) => <FontAwesomeIcon key={i} size={size} icon={faGamepad} />)

  return <div className="game-card__rates" style={style}>{rates}</div>
}

export default Rates
