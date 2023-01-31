import { FC } from 'react'
import { Link } from 'react-router-dom'

const All: FC<{ total?: number }> = ({ total }) => (
  <div className="games__all">
    <Link className="games__link" to='/games/all'>All { total } Games</Link>
  </div>
)

export default All
