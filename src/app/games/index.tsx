import { RouteObject } from 'react-router-dom'
import Detail from './pages/Detail'
import List from './pages/List'
import Layout from '@/layouts/Layout'

const games: RouteObject = {
  path: 'games',
  element: <Layout />,
  children: [
    { index: true, element: <List /> },
    { path: ':id', element: <Detail /> }
  ]
}

export default games
