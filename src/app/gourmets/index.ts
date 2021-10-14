import { RouteProps } from 'react-router'
import List from './pages/List'

const gourmets: RouteProps = {
  path: '/gourmets',
  component: List,
  exact: true
}

export default gourmets
