import { RouteObject } from 'react-router-dom'
import Detail from './pages/Detail'
import Layout from '@/layouts/Layout'
import Stats from '@/app/games/pages/Stats'

const games: RouteObject = {
  path: 'games',
  element: <Layout />,
  children: [
    { index: true, element: <Stats /> },
    { path: ':id', element: <Detail /> }
  ]
}

export default games
