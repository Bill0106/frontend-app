import { RouteObject } from 'react-router-dom'
import Layout from '@/layouts/Layout'
import Stats from '@/app/games/pages/Stats'
import List from '@/app/games/pages/List'

const games: RouteObject = {
  path: 'games',
  element: <Layout />,
  children: [
    { index: true, element: <Stats /> },
    { path: 'all', element: <List /> }
  ]
}

export default games
