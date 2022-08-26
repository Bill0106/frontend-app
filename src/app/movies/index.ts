import { RouteProps } from 'react-router-dom'
import List from './pages/List'

const movies: RouteProps = {
  path: '/movies',
  component: List,
  exact: true
}

export default movies
