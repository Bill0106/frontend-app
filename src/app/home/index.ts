import { RouteProps } from 'react-router-dom'
import Home from './pages/Home'

const home: RouteProps = {
  path: '/',
  component: Home,
  exact: true
}

export default home
