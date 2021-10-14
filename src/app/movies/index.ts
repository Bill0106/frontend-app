import { RouteProps } from 'react-router'
import List from './pages/List'

const movies: RouteProps = {
  path: '/movies',
  component: List,
  exact: true
}

export default movies
